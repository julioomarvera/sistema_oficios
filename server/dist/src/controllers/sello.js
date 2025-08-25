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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformacionSello = exports.actualizarEstadoActivoevidencia_sello = exports.DelMasterHistorialsello = exports.actualizarHistorialMasterevidencia_sello = exports.NewHistorialMasterevidencia_sello = exports.actualizarevidencia_sello = exports.DelHistorialsello = exports.UpdHistorialsello = exports.NewHistorialsello = exports.HistorialgetRegByIdsello = exports.HistorialgetAllsello = exports.delsello = exports.Actualizarsello = exports.updsello = exports.newsello = exports.getRegByIdsello = exports.getselloByIdgestonOficios = exports.getAllsello = exports.timeNow = void 0;
const sello_1 = require("../models/sello");
const evidencia_sello_1 = require("../models/evidencia_sello");
const historialsello_1 = require("../models/historialsello");
const historialMasterevidencia_sello_1 = require("../models/historialMasterevidencia_sello");
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
const getAllsello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listsello = '';
    if (id_rol == "1") {
        listsello = yield sello_1.dbsello.findAll({ where: { activo: 1 } });
    }
    else {
        listsello = yield sello_1.dbsello.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listsello);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllsello)(id_usuario);
    }
});
exports.getAllsello = getAllsello;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getselloByIdgestonOficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios, id_usuario } = req.params;
    console.log(req.params);
    let listsello = '';
    listsello = yield sello_1.dbsello.findOne({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios, id_usuario: id_usuario } });
    res.json(listsello);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllsello)(id_usuario);
    }
});
exports.getselloByIdgestonOficios = getselloByIdgestonOficios;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdsello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findsello = yield sello_1.dbsello.findOne({ where: { id_sello: id } });
    try {
        if (findsello) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdsello)(id_usuario, id);
            }
            return res.json(findsello);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los sello. ',
            error
        });
    }
    console.log(findsello);
});
exports.getRegByIdsello = getRegByIdsello;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newsello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_evidencia_sello, id_usuario, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello, id_estatusevidencia_sello, PaginaActual, finalizado, numero_empleado_secretaria, foto_secretaria } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield sello_1.dbsello.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
    if (params) {
        const id_sello = params.dataValues.id_sello;
        const actualizar = yield (0, exports.Actualizarsello)(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello, id_estatusevidencia_sello);
        if (actualizar == 1) {
            return res.status(404).json({
                msg: 'Registro de la tabla : sello  actualizado correctamente',
            });
        }
        else {
            return res.status(404).json({
                msg: 'Registro de la tabla : sello  ya almacenado',
            });
        }
    }
    try {
        const resultado = yield sello_1.dbsello.create({
            id_usuario: id_usuario,
            id_gestion_oficios, id_direccion, text_direccion, id_area, text_area,
            numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital,
            nombre_documento_sello,
            id_estatusevidencia_sello: id_estatusevidencia_sello,
            numero_empleado_secretaria,
            foto_secretaria,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_sello);
        res.json({
            msg: `sello registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialsello)(id_usuario, id, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
        (0, exports.actualizarevidencia_sello)(id_evidencia_sello, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivoevidencia_sello)(id_evidencia_sello);
        (0, exports.NewHistorialMasterevidencia_sello)(id_usuario, id, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newsello = newsello;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updsello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello, id_estatusevidencia_sello } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield sello_1.dbsello.findOne({ where: { id_sello: id_sello } });
    if (params) {
        try {
            const resultado = yield sello_1.dbsello.update({
                id_usuario: id_usuario,
                id_sello: id_sello,
                id_gestion_oficios: id_gestion_oficios,
                id_direccion: id_direccion,
                text_direccion: text_direccion,
                id_area: id_area,
                text_area: text_area,
                numero_oficio: numero_oficio,
                fecha_creacion: fecha_creacion,
                nombre_documento_oficio: nombre_documento_oficio,
                nombre_documento_sello_digital: nombre_documento_sello_digital,
                nombre_documento_sello: nombre_documento_sello,
                id_estatusevidencia_sello: id_estatusevidencia_sello,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_sello: id_sello
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialsello)(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
            (0, exports.actualizarHistorialMasterevidencia_sello)(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
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
            msg: 'Registro de la tabla : sello  ya almacenado',
        });
    }
});
exports.updsello = updsello;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const Actualizarsello = (id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello, id_estatusevidencia_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    //Validamos si existe el parametro en la base de datos 
    const params = yield sello_1.dbsello.findOne({ where: { id_sello: id_sello, id_gestion_oficios: id_gestion_oficios } });
    if (params) {
        try {
            const resultado = yield sello_1.dbsello.update({
                id_usuario: id_usuario,
                id_sello: id_sello,
                id_gestion_oficios: id_gestion_oficios,
                id_direccion: id_direccion,
                text_direccion: text_direccion,
                id_area: id_area,
                text_area: text_area,
                numero_oficio: numero_oficio,
                fecha_creacion: fecha_creacion,
                nombre_documento_oficio: nombre_documento_oficio,
                nombre_documento_sello_digital: nombre_documento_sello_digital,
                nombre_documento_sello: nombre_documento_sello,
                id_estatusevidencia_sello: id_estatusevidencia_sello,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_sello: id_sello, id_gestion_oficios: id_gestion_oficios
                },
            });
            (0, exports.UpdHistorialsello)(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
            (0, exports.actualizarHistorialMasterevidencia_sello)(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
            return 1;
        }
        catch (error) {
            return 0;
        }
    }
    else {
        return 0;
    }
});
exports.Actualizarsello = Actualizarsello;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delsello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield sello_1.dbsello.findOne({ where: { id_sello: id } });
    const id_sello = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_sello;
    const id_gestion_oficios = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_gestion_oficios;
    const id_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion;
    const text_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion;
    const id_area = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area;
    const text_area = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_area;
    const numero_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_oficio;
    const fecha_creacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.fecha_creacion;
    const nombre_documento_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_documento_oficio;
    const nombre_documento_sello_digital = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_documento_sello_digital;
    const nombre_documento_sello = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_documento_sello;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield sello_1.dbsello.destroy({
            where: {
                id_sello: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialsello)(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
        (0, exports.DelMasterHistorialsello)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delsello = delsello;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllsello = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialsello_1.dbhistorialsello.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : sello',
            id_sello: '', id_gestion_oficios: '', id_direccion: '', text_direccion: '', id_area: '', text_area: '', numero_oficio: '', fecha_creacion: '', nombre_documento_oficio: '', nombre_documento_sello_digital: '', nombre_documento_sello: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllsello = HistorialgetAllsello;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdsello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialsello_1.dbhistorialsello.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: sello',
            id_sello: id, id_gestion_oficios: '', id_direccion: '', text_direccion: '', id_area: '', text_area: '', numero_oficio: '', fecha_creacion: '', nombre_documento_oficio: '', nombre_documento_sello_digital: '', nombre_documento_sello: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdsello = HistorialgetRegByIdsello;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialsello = (id_usuario, id, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialsello_1.dbhistorialsello.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: sello',
            id_sello: id, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialsello = NewHistorialsello;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialsello = (id_usuario, id, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialsello_1.dbhistorialsello.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: sello',
            id_sello: id, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialsello = UpdHistorialsello;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialsello = (id_usuario, id, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialsello_1.dbhistorialsello.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: sello',
            id_sello: id, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialsello = DelHistorialsello;
//actualizar en la tabla evidencia_sello ----------------------------------------------------------------------> 
const actualizarevidencia_sello = (id_evidencia_sello, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield evidencia_sello_1.dbevidencia_sello.update({
            id_sello: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_evidencia_sello: id_evidencia_sello
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarevidencia_sello = actualizarevidencia_sello;
//almacenar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
const NewHistorialMasterevidencia_sello = (id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
            id_usuario: id_usuario,
            id_sello: id_sello, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasterevidencia_sello = NewHistorialMasterevidencia_sello;
//Actualizar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
const actualizarHistorialMasterevidencia_sello = (id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
            id_usuario: id_usuario,
            id_sello: id_sello, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterevidencia_sello = actualizarHistorialMasterevidencia_sello;
//Desactivar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
const DelMasterHistorialsello = (id_usuario, id_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
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
exports.DelMasterHistorialsello = DelMasterHistorialsello;
//actualizar Estado Activo en la tabla evidencia_sello ----------------------------------------------------------------------> 
const actualizarEstadoActivoevidencia_sello = (id_evidencia_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield evidencia_sello_1.dbevidencia_sello.update({
            activo: 1,
        }, {
            where: {
                id_evidencia_sello: id_evidencia_sello
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivoevidencia_sello = actualizarEstadoActivoevidencia_sello;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getInformacionSello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficio, id_direccion, id_area, numero_empleado } = req.params;
    console.log(req.params);
    let listsello = '';
    listsello = yield sello_1.dbsello.findOne({ where: { activo: 1, id_gestion_oficios: id_gestion_oficio, id_direccion: id_direccion, id_area: id_area, numero_empleado_secretaria: numero_empleado }
    });
    res.json(listsello);
});
exports.getInformacionSello = getInformacionSello;
