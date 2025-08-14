"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarEstadoActivouser = exports.DelMasterHistorialusers = exports.actualizarHistorialMasteruser = exports.NewHistorialMasteruser = exports.actualizaruser = exports.DelHistorialusers = exports.UpdHistorialusers = exports.NewHistorialusers = exports.HistorialgetRegByIdusers = exports.HistorialgetAllusers = exports.delusers = exports.updusers = exports.newusers = exports.getRegByIdusers = exports.getAllusers = exports.timeNow = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const user_1 = require("../models/user");
const historialusers_1 = require("../models/historialusers");
const historialMasteruser_1 = require("../models/historialMasteruser");
//extraer la hora para el sistema //-------------------------------------------------------------> 
const timeNow = () => {
    const now = new Date(); // Jul 2021 Friday 
    const fecha = (now.toLocaleString('en-US', { timeZone: 'America/Mexico_City', dateStyle: 'short', timeStyle: 'short' }));
    let d = new Date();
    let add30Minutes = new Date(
    // add 30 minutes  
    d.getFullYear(), d.getMonth(), d.getDate(), d.getUTCHours(), (d.getMinutes()), // add 30 minutes, 
    d.getSeconds(), d.getMilliseconds());
    // ISO formatted UTC timestamp 
    // timezone is always zero UTC offset, as denoted by the suffix 'Z' 
    let isoString = add30Minutes.toISOString();
    // MySQL formatted UTC timestamp: YYYY-MM-DD HH:MM:SS 
    let mySqlTimestamp = isoString.slice(0, 19).replace('T', ' ');
    return isoString;
};
exports.timeNow = timeNow;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listusers = '';
    if (id_rol == "1") {
        listusers = yield users_1.dbusers.findAll({ where: { activo: 1 } });
    }
    else {
        listusers = yield users_1.dbusers.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listusers);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllusers)(id_usuario);
    }
});
exports.getAllusers = getAllusers;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, clave } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield users_1.dbusers.findOne({ where: { usuario: usuario } });
    if (!user) {
        return res.status(400).json({
            msq: `El Usuario no existe ${usuario} en la base de datos`
        });
    }
    //validamos el password
    const passwordValid = yield bcrypt_1.default.compare(clave, user.clave);
    if (!passwordValid) {
        return res.status(400).json({
            msq: `El  password es incorrecto`
        });
    }
    const token = jsonwebtoken_1.default.sign({
        usuario: user.usuario,
        imp: user.imp,
        edit: user.edit,
        elim: user.elim,
        nuev: user.nuev,
        img: user.img,
        activo: user.activo,
    }, process.env.SECRET_KEY || 'julio', {});
    //expiresIn:'60000'
    // })
    //generamos el token
    const userInfo = ({
        id_usuario: user.id_usuario,
        id_roll: user.id_roll,
        usuario: user.nombre + " " + user.apepa + " " + user.apema,
        imp: user.imp,
        edit: user.edit,
        elim: user.elim,
        nuev: user.nuev,
        img: user.img,
        activo: user.activo,
        telefono: user.telefono,
        token: token,
        id_direccion: user.id_direccion,
        text_direccion: user.text_direccion,
        id_area: user.id_area,
        text_area: user.text_area,
        numero_empleado: user.numero_empleado,
        foto: user.foto,
    });
    res.json(userInfo);
});
exports.getRegByIdusers = getRegByIdusers;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_user, id_usuario, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, id_estatususer, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield users_1.dbusers.findOne({ where: { id_roll: id_roll } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : users  ya almacenado',
        });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(clave, 10);
        const resultado = yield users_1.dbusers.create({
            id_usuario: id_usuario,
            id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto,
            id_estatususer: id_estatususer,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_users);
        res.json({
            msg: `users registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialusers)(id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
        (0, exports.actualizaruser)(id_user, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivouser)(id_user);
        (0, exports.NewHistorialMasteruser)(id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newusers = newusers;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_users, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, id_estatususer } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield users_1.dbusers.findOne({ where: { id_users: id_users } });
    if (params) {
        try {
            const resultado = yield users_1.dbusers.update({
                id_usuario: id_usuario,
                id_users: id_users,
                id_roll: id_roll,
                usuario: usuario,
                clave: clave,
                nombre: nombre,
                apepa: apepa,
                apema: apema,
                genero: genero,
                correo: correo,
                telefono: telefono,
                fec_ingreso: fec_ingreso,
                imp: imp,
                edit: edit,
                elim: elim,
                nuev: nuev,
                img: img,
                id_direccion: id_direccion,
                texto_direccion: texto_direccion,
                id_area: id_area,
                texto_area: texto_area,
                numero_empleado: numero_empleado,
                foto: foto,
                id_estatususer: id_estatususer,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_users: id_users
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialusers)(id_usuario, id_users, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
            (0, exports.actualizarHistorialMasteruser)(id_usuario, id_users, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
        }
        catch (error) {
            res.status(404).json({
                msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
                error
            });
        }
    }
    else {
        return res.status(404).json({
            msg: 'Registro de la tabla : users  ya almacenado',
        });
    }
});
exports.updusers = updusers;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield users_1.dbusers.findOne({ where: { id_users: id } });
    const id_users = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_users;
    const id_roll = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_roll;
    const usuario = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.usuario;
    const clave = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.clave;
    const nombre = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre;
    const apepa = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.apepa;
    const apema = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.apema;
    const genero = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.genero;
    const correo = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.correo;
    const telefono = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.telefono;
    const fec_ingreso = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.fec_ingreso;
    const imp = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.imp;
    const edit = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.edit;
    const elim = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.elim;
    const nuev = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nuev;
    const img = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.img;
    const id_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion;
    const texto_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.texto_direccion;
    const id_area = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area;
    const texto_area = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.texto_area;
    const numero_empleado = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado;
    const foto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield users_1.dbusers.destroy({
            where: {
                id_users: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialusers)(id_usuario, id_users, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
        (0, exports.DelMasterHistorialusers)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delusers = delusers;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllusers = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_1.dbhistorialusers.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : users',
            id_users: '', id_roll: '', usuario: '', clave: '', nombre: '', apepa: '', apema: '', genero: '', correo: '', telefono: '', fec_ingreso: '', imp: '', edit: '', elim: '', nuev: '', img: '', id_direccion: '', texto_direccion: '', id_area: '', texto_area: '', numero_empleado: '', foto: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllusers = HistorialgetAllusers;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdusers = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_1.dbhistorialusers.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: users',
            id_users: id, id_roll: '', usuario: '', clave: '', nombre: '', apepa: '', apema: '', genero: '', correo: '', telefono: '', fec_ingreso: '', imp: '', edit: '', elim: '', nuev: '', img: '', id_direccion: '', texto_direccion: '', id_area: '', texto_area: '', numero_empleado: '', foto: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdusers = HistorialgetRegByIdusers;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialusers = (id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_1.dbhistorialusers.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: users',
            id_users: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialusers = NewHistorialusers;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialusers = (id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_1.dbhistorialusers.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: users',
            id_users: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialusers = UpdHistorialusers;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialusers = (id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_1.dbhistorialusers.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: users',
            id_users: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialusers = DelHistorialusers;
//actualizar en la tabla user ----------------------------------------------------------------------> 
const actualizaruser = (id_user, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield user_1.dbuser.update({
            id_users: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_user: id_user
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizaruser = actualizaruser;
//almacenar en la tabla Historial Master user ----------------------------------------------------------------------> 
const NewHistorialMasteruser = (id_usuario, id_users, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            id_users: id_users, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasteruser = NewHistorialMasteruser;
//Actualizar en la tabla Historial Master user ----------------------------------------------------------------------> 
const actualizarHistorialMasteruser = (id_usuario, id_users, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            id_users: id_users, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasteruser = actualizarHistorialMasteruser;
//Desactivar en la tabla Historial Master user ----------------------------------------------------------------------> 
const DelMasterHistorialusers = (id_usuario, id_users) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialusers = DelMasterHistorialusers;
//actualizar Estado Activo en la tabla user ----------------------------------------------------------------------> 
const actualizarEstadoActivouser = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield user_1.dbuser.update({
            activo: 1,
        }, {
            where: {
                id_user: id_user
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivouser = actualizarEstadoActivouser;
