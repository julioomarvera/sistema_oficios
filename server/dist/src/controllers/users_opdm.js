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
exports.actualizarPass = exports.validatPass = exports.loginUser = exports.actualizarEstadoActivousuarios_opdm = exports.DelMasterHistorialusers_opdm = exports.actualizarHistorialMasterusuarios_opdm = exports.NewHistorialMasterusuarios_opdm = exports.actualizarusuarios_opdm = exports.DelHistorialusers_opdm = exports.UpdHistorialusers_opdm = exports.NewHistorialusers_opdm = exports.HistorialgetRegByIdusers_opdm = exports.HistorialgetAllusers_opdm = exports.delusers_opdm = exports.updusers_opdm = exports.newusers_opdm = exports.getRegByIdusers_opdm = exports.getAllusers_opdm = exports.timeNow = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_opdm_1 = require("../models/users_opdm");
const usuarios_opdm_1 = require("../models/usuarios_opdm");
const historialusers_opdm_1 = require("../models/historialusers_opdm");
const historialMasterusuarios_opdm_1 = require("../models/historialMasterusuarios_opdm");
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
const getAllusers_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listusers_opdm = '';
    if (id_rol == "1") {
        listusers_opdm = yield users_opdm_1.dbusers_opdm.findAll({ where: { activo: 1 } });
    }
    else {
        listusers_opdm = yield users_opdm_1.dbusers_opdm.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listusers_opdm);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllusers_opdm)(id_usuario);
    }
});
exports.getAllusers_opdm = getAllusers_opdm;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdusers_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findusers_opdm = yield users_opdm_1.dbusers_opdm.findOne({ where: { id_users_opdm: id } });
    try {
        if (findusers_opdm) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdusers_opdm)(id_usuario, id);
            }
            return res.json(findusers_opdm);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los users_opdm. ',
            error
        });
    }
    console.log(findusers_opdm);
});
exports.getRegByIdusers_opdm = getRegByIdusers_opdm;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newusers_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuarios_opdm, id_usuario, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, id_estatususuarios_opdm, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield users_opdm_1.dbusers_opdm.findOne({ where: { numero_empleado: numero_empleado } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : empleado  ya almacenado',
        });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(clave, 10);
        const resultado = yield users_opdm_1.dbusers_opdm.create({
            id_usuario: id_usuario,
            id_roll, usuario, clave: hashedPassword, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, cambioContrasenia: 0,
            id_estatususuarios_opdm: id_estatususuarios_opdm,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_users_opdm);
        res.json({
            msg: `users_opdm registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialusers_opdm)(id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
        (0, exports.actualizarusuarios_opdm)(id_usuarios_opdm, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivousuarios_opdm)(id_usuarios_opdm);
        (0, exports.NewHistorialMasterusuarios_opdm)(id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newusers_opdm = newusers_opdm;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updusers_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, id_estatususuarios_opdm, banderaCambioContrasenia } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield users_opdm_1.dbusers_opdm.findOne({ where: { id_users_opdm: id_users_opdm } });
    if (params) {
        if (banderaCambioContrasenia == true) { //significa que no hay cambio de contraseña
            try {
                const resultado = yield users_opdm_1.dbusers_opdm.update({
                    id_usuario: id_usuario,
                    id_users_opdm: id_users_opdm,
                    id_roll: id_roll,
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
                    id_estatususuarios_opdm: id_estatususuarios_opdm,
                    activo: 1,
                    createdAt: time,
                    updatedAt: time,
                }, {
                    where: {
                        id_users_opdm: id_users_opdm
                    },
                });
                res.json({
                    msg: `Registro actualizado exitosamente.`
                });
                (0, exports.UpdHistorialusers_opdm)(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
                (0, exports.actualizarHistorialMasterusuarios_opdm)(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
            }
            catch (error) {
                res.status(404).json({
                    msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
                    error
                });
            }
        }
        else { // es por que el usuario si quiere cambiar la contraseña
            try {
                const hashedPassword = yield bcrypt_1.default.hash(clave, 10);
                const resultado = yield users_opdm_1.dbusers_opdm.update({
                    id_usuario: id_usuario,
                    id_users_opdm: id_users_opdm,
                    id_roll: id_roll,
                    usuario: usuario,
                    clave: hashedPassword,
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
                    id_estatususuarios_opdm: id_estatususuarios_opdm,
                    activo: 1,
                    createdAt: time,
                    updatedAt: time,
                    cambioContrasenia: 0
                }, {
                    where: {
                        id_users_opdm: id_users_opdm
                    },
                });
                res.json({
                    msg: `Registro actualizado exitosamente.`
                });
                (0, exports.UpdHistorialusers_opdm)(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
                (0, exports.actualizarHistorialMasterusuarios_opdm)(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
            }
            catch (error) {
                res.status(404).json({
                    msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
                    error
                });
            }
        }
    }
    else {
        return res.status(404).json({
            msg: 'Registro de la tabla : users_opdm  ya almacenado',
        });
    }
});
exports.updusers_opdm = updusers_opdm;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delusers_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield users_opdm_1.dbusers_opdm.findOne({ where: { id_users_opdm: id } });
    const id_users_opdm = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_users_opdm;
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
        const resultado = yield users_opdm_1.dbusers_opdm.destroy({
            where: {
                id_users_opdm: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialusers_opdm)(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
        (0, exports.DelMasterHistorialusers_opdm)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delusers_opdm = delusers_opdm;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllusers_opdm = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_opdm_1.dbhistorialusers_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : users_opdm',
            id_users_opdm: '', id_roll: '', usuario: '', clave: '', nombre: '', apepa: '', apema: '', genero: '', correo: '', telefono: '', fec_ingreso: '', imp: '', edit: '', elim: '', nuev: '', img: '', id_direccion: '', texto_direccion: '', id_area: '', texto_area: '', numero_empleado: '', foto: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllusers_opdm = HistorialgetAllusers_opdm;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdusers_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_opdm_1.dbhistorialusers_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: users_opdm',
            id_users_opdm: id, id_roll: '', usuario: '', clave: '', nombre: '', apepa: '', apema: '', genero: '', correo: '', telefono: '', fec_ingreso: '', imp: '', edit: '', elim: '', nuev: '', img: '', id_direccion: '', texto_direccion: '', id_area: '', texto_area: '', numero_empleado: '', foto: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdusers_opdm = HistorialgetRegByIdusers_opdm;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialusers_opdm = (id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_opdm_1.dbhistorialusers_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: users_opdm',
            id_users_opdm: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialusers_opdm = NewHistorialusers_opdm;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialusers_opdm = (id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_opdm_1.dbhistorialusers_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: users_opdm',
            id_users_opdm: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialusers_opdm = UpdHistorialusers_opdm;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialusers_opdm = (id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusers_opdm_1.dbhistorialusers_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: users_opdm',
            id_users_opdm: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialusers_opdm = DelHistorialusers_opdm;
//actualizar en la tabla usuarios_opdm ----------------------------------------------------------------------> 
const actualizarusuarios_opdm = (id_usuarios_opdm, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield usuarios_opdm_1.dbusuarios_opdm.update({
            id_users_opdm: id,
            PaginaActual: PaginaActual,
            finalizado: 1,
            activo: 1,
        }, {
            where: {
                id_usuarios_opdm: id_usuarios_opdm
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarusuarios_opdm = actualizarusuarios_opdm;
//almacenar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
const NewHistorialMasterusuarios_opdm = (id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
            id_usuario: id_usuario,
            id_users_opdm: id_users_opdm, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasterusuarios_opdm = NewHistorialMasterusuarios_opdm;
//Actualizar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
const actualizarHistorialMasterusuarios_opdm = (id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
            id_usuario: id_usuario,
            id_users_opdm: id_users_opdm, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterusuarios_opdm = actualizarHistorialMasterusuarios_opdm;
//Desactivar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
const DelMasterHistorialusers_opdm = (id_usuario, id_users_opdm) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
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
exports.DelMasterHistorialusers_opdm = DelMasterHistorialusers_opdm;
//actualizar Estado Activo en la tabla usuarios_opdm ----------------------------------------------------------------------> 
const actualizarEstadoActivousuarios_opdm = (id_usuarios_opdm) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield usuarios_opdm_1.dbusuarios_opdm.update({
            activo: 1,
        }, {
            where: {
                id_usuarios_opdm: id_usuarios_opdm
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivousuarios_opdm = actualizarEstadoActivousuarios_opdm;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, clave } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield users_opdm_1.dbusers_opdm.findOne({ where: { usuario: usuario } });
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
        id_usuario: user.id_users_opdm,
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
        id_direcion: user.id_direccion,
        text_direccion: user.texto_direccion,
        id_area: user.id_area,
        text_area: user.texto_area,
        numero_empleado: user.numero_empleado,
        foto: user.foto,
        cambioContrasenia: user.cambioContrasenia,
    });
    console.log(userInfo);
    res.json(userInfo);
});
exports.loginUser = loginUser;
const validatPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero_empleado, clave } = req.body;
    //Validamos si el usuario existe en la base de datos
    const user = yield users_opdm_1.dbusers_opdm.findOne({ where: { numero_empleado: numero_empleado } });
    if (!user) {
        res.json(`El Usuario con número de empledo ${numero_empleado}no existe en la base de datos`);
    }
    //validamos el password
    const passwordValid = yield bcrypt_1.default.compare(clave, user.clave);
    if (!passwordValid) {
        res.json(`El  password es incorrecto`);
    }
    else {
        res.json(1);
    }
});
exports.validatPass = validatPass;
const actualizarPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero_empleado, clave } = req.body;
    const user = yield users_opdm_1.dbusers_opdm.findOne({ where: { numero_empleado: numero_empleado } });
    if (!user) {
        res.json(`El Usuario con número de empledo ${numero_empleado}no existe en la base de datos`);
    }
    else {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(clave, 10);
            const resultado = yield users_opdm_1.dbusers_opdm.update({
                cambioContrasenia: 1,
                clave: hashedPassword,
            }, {
                where: {
                    numero_empleado: numero_empleado,
                },
            }).then();
            res.json(1);
        }
        catch (error) {
        }
    }
});
exports.actualizarPass = actualizarPass;
