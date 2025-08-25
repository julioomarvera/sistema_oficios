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
exports.actualizar_id_oficio_destinatariosActaulizar = exports.actualizar_id_oficio_destinatarios = exports.actualizarEstadoActivogestion_oficios = exports.DelMasterHistorialoficios = exports.actualizarHistorialMastergestion_oficios = exports.NewHistorialMastergestion_oficios = exports.actualizargestion_oficios = exports.DelHistorialoficios = exports.UpdHistorialoficios = exports.NewHistorialoficios = exports.HistorialgetRegByIdoficios = exports.HistorialgetAlloficios = exports.deloficios = exports.updoficios = exports.newoficios = exports.getRegByIdoficios = exports.getOficio_by_id_oficio = exports.getAlloficios = exports.timeNow = void 0;
const oficios_1 = require("../models/oficios");
const gestion_oficios_1 = require("../models/gestion_oficios");
const historialoficios_1 = require("../models/historialoficios");
const historialMastergestion_oficios_1 = require("../models/historialMastergestion_oficios");
const cat_destinatario_1 = require("../models/cat_destinatario");
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
const getAlloficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listoficios = '';
    if (id_rol == "1") {
        listoficios = yield oficios_1.dboficios.findAll({ where: { activo: 1 } });
    }
    else {
        listoficios = yield oficios_1.dboficios.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listoficios);
    if (id_usuario != null) {
        (0, exports.HistorialgetAlloficios)(id_usuario);
    }
});
exports.getAlloficios = getAlloficios;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getOficio_by_id_oficio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_oficios } = req.params;
    let listoficios = '';
    listoficios = yield oficios_1.dboficios.findOne({ where: { activo: 1, id_oficios: id_oficios } });
    res.json(listoficios);
});
exports.getOficio_by_id_oficio = getOficio_by_id_oficio;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdoficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findoficios = yield oficios_1.dboficios.findOne({ where: { id_oficios: id } });
    try {
        if (findoficios) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdoficios)(id_usuario, id);
            }
            return res.json(findoficios);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los oficios. ',
            error
        });
    }
    console.log(findoficios);
});
exports.getRegByIdoficios = getRegByIdoficios;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newoficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_gestion_oficios, id_usuario, oficio, text_oficio, tipo_oficio, text_tipo, folio, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro, id_estatusgestion_oficios, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield oficios_1.dboficios.findOne({ where: { numero_oficio: numero_oficio } });
    if (params) {
        return res.status(404).json({
            msg: 'Número de oficio ya almacenado anteriormente',
        });
    }
    try {
        const resultado = yield oficios_1.dboficios.create({
            id_usuario: id_usuario,
            oficio, text_oficio, tipo_oficio, text_tipo, folio, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro,
            id_estatusgestion_oficios: id_estatusgestion_oficios,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_oficios);
        res.json({
            msg: `oficios registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialoficios)(id_usuario, id, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
        (0, exports.actualizargestion_oficios)(id_gestion_oficios, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivogestion_oficios)(id_gestion_oficios);
        (0, exports.NewHistorialMastergestion_oficios)(id_usuario, id, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
        (0, exports.actualizar_id_oficio_destinatarios)(id_gestion_oficios, id, fecha_hora, numero_oficio, asunto);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newoficios = newoficios;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updoficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, folio, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro, id_estatusgestion_oficios } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield oficios_1.dboficios.findOne({ where: { id_oficios: id_oficios } });
    if (params) {
        try {
            const resultado = yield oficios_1.dboficios.update({
                id_usuario: id_usuario,
                id_oficios: id_oficios,
                oficio: oficio,
                text_oficio: text_oficio,
                tipo_oficio: tipo_oficio,
                text_tipo: text_tipo,
                folio: folio,
                numero_oficio: numero_oficio,
                fecha_hora: fecha_hora,
                caso_cop: caso_cop,
                asunto: asunto,
                contenido: contenido,
                archivo_oficio: archivo_oficio,
                otro: otro,
                id_estatusgestion_oficios: id_estatusgestion_oficios,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_oficios: id_oficios
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialoficios)(id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
            (0, exports.actualizarHistorialMastergestion_oficios)(id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
            (0, exports.actualizar_id_oficio_destinatariosActaulizar)(id_oficios, fecha_hora, numero_oficio, asunto);
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
            msg: 'Registro de la tabla : oficios  ya almacenado',
        });
    }
});
exports.updoficios = updoficios;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const deloficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield oficios_1.dboficios.findOne({ where: { id_oficios: id } });
    const id_oficios = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_oficios;
    const oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.oficio;
    const text_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_oficio;
    const tipo_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.tipo_oficio;
    const text_tipo = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_tipo;
    const numero_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_oficio;
    const fecha_hora = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.fecha_hora;
    const caso_cop = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.caso_cop;
    const asunto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.asunto;
    const contenido = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.contenido;
    const archivo_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.archivo_oficio;
    const otro = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.otro;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield oficios_1.dboficios.destroy({
            where: {
                id_oficios: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialoficios)(id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
        (0, exports.DelMasterHistorialoficios)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.deloficios = deloficios;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAlloficios = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialoficios_1.dbhistorialoficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : oficios',
            id_oficios: '', oficio: '', text_oficio: '', tipo_oficio: '', text_tipo: '', numero_oficio: '', fecha_hora: '', caso_cop: '', asunto: '', contenido: '', archivo_oficio: '', otro: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAlloficios = HistorialgetAlloficios;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdoficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialoficios_1.dbhistorialoficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: oficios',
            id_oficios: id, oficio: '', text_oficio: '', tipo_oficio: '', text_tipo: '', numero_oficio: '', fecha_hora: '', caso_cop: '', asunto: '', contenido: '', archivo_oficio: '', otro: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdoficios = HistorialgetRegByIdoficios;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialoficios = (id_usuario, id, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialoficios_1.dbhistorialoficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: oficios',
            id_oficios: id, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialoficios = NewHistorialoficios;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialoficios = (id_usuario, id, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialoficios_1.dbhistorialoficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: oficios',
            id_oficios: id, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialoficios = UpdHistorialoficios;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialoficios = (id_usuario, id, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialoficios_1.dbhistorialoficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: oficios',
            id_oficios: id, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialoficios = DelHistorialoficios;
//actualizar en la tabla gestion_oficios ----------------------------------------------------------------------> 
const actualizargestion_oficios = (id_gestion_oficios, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield gestion_oficios_1.dbgestion_oficios.update({
            id_oficios: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_gestion_oficios: id_gestion_oficios
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizargestion_oficios = actualizargestion_oficios;
//almacenar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
const NewHistorialMastergestion_oficios = (id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
            id_usuario: id_usuario,
            id_oficios: id_oficios, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMastergestion_oficios = NewHistorialMastergestion_oficios;
//Actualizar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
const actualizarHistorialMastergestion_oficios = (id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
            id_usuario: id_usuario,
            id_oficios: id_oficios, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMastergestion_oficios = actualizarHistorialMastergestion_oficios;
//Desactivar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
const DelMasterHistorialoficios = (id_usuario, id_oficios) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
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
exports.DelMasterHistorialoficios = DelMasterHistorialoficios;
//actualizar Estado Activo en la tabla gestion_oficios ----------------------------------------------------------------------> 
const actualizarEstadoActivogestion_oficios = (id_gestion_oficios) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield gestion_oficios_1.dbgestion_oficios.update({
            activo: 1,
        }, {
            where: {
                id_gestion_oficios: id_gestion_oficios
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivogestion_oficios = actualizarEstadoActivogestion_oficios;
//actualizar en la tabla gestion_oficios ----------------------------------------------------------------------> 
const actualizar_id_oficio_destinatarios = (id_gestion_oficios, id_oficio, fecha_hora, numero_oficio, asunto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield cat_destinatario_1.dbcat_destinatario.update({
            estatus: 0,
            id_oficio: id_oficio,
            fecha_terminacion: fecha_hora,
            numero_oficio: numero_oficio,
            asunto: asunto,
        }, {
            where: {
                id_gestion_oficios: id_gestion_oficios
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizar_id_oficio_destinatarios = actualizar_id_oficio_destinatarios;
//actualizar en la tabla gestion_oficios ----------------------------------------------------------------------> 
const actualizar_id_oficio_destinatariosActaulizar = (id_oficio, fecha_hora, numero_oficio, asunto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield cat_destinatario_1.dbcat_destinatario.update({
            estatus: 0,
            fecha_terminacion: fecha_hora,
            numero_oficio: numero_oficio,
            asunto: asunto,
        }, {
            where: {
                id_oficio: id_oficio,
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizar_id_oficio_destinatariosActaulizar = actualizar_id_oficio_destinatariosActaulizar;
