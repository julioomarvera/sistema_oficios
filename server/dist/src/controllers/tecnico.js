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
exports.get_oficio_tecnico_by_id_gestion_oficio_id_oficios = exports.actualizarEstatusSeguimiento = exports.actualizarEstadoActivoseguimiento_tecnico = exports.DelMasterHistorialtecnico = exports.actualizarHistorialMasterseguimiento_tecnico = exports.NewHistorialMasterseguimiento_tecnico = exports.actualizarseguimiento_tecnico = exports.DelHistorialtecnico = exports.UpdHistorialtecnico = exports.NewHistorialtecnico = exports.HistorialgetRegByIdtecnico = exports.HistorialgetAlltecnico = exports.deltecnico = exports.updtecnico = exports.newtecnico = exports.getRegByIdtecnico = exports.getAlltecnico = exports.timeNow = void 0;
const tecnico_1 = require("../models/tecnico");
const seguimiento_tecnico_1 = require("../models/seguimiento_tecnico");
const historialtecnico_1 = require("../models/historialtecnico");
const historialMasterseguimiento_tecnico_1 = require("../models/historialMasterseguimiento_tecnico");
const asignacion_1 = require("../models/asignacion");
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
const getAlltecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listtecnico = '';
    if (id_rol == "1") {
        listtecnico = yield tecnico_1.dbtecnico.findAll({ where: { activo: 1 } });
    }
    else {
        listtecnico = yield tecnico_1.dbtecnico.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listtecnico);
    if (id_usuario != null) {
        (0, exports.HistorialgetAlltecnico)(id_usuario);
    }
});
exports.getAlltecnico = getAlltecnico;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdtecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findtecnico = yield tecnico_1.dbtecnico.findOne({ where: { id_tecnico: id } });
    try {
        if (findtecnico) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdtecnico)(id_usuario, id);
            }
            return res.json(findtecnico);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los tecnico. ',
            error
        });
    }
    console.log(findtecnico);
});
exports.getRegByIdtecnico = getRegByIdtecnico;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newtecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_asignacion, id_seguimiento_tecnico, id_usuario, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio, id_estatusseguimiento_tecnico, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield tecnico_1.dbtecnico.findOne({ where: { id_gestion_oficio: id_gestion_oficio } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : tecnico  ya almacenado',
        });
    }
    try {
        const resultado = yield tecnico_1.dbtecnico.create({
            id_usuario: id_usuario,
            id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio,
            id_estatusseguimiento_tecnico: id_estatusseguimiento_tecnico,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_tecnico);
        res.json({
            msg: `tecnico registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialtecnico)(id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
        (0, exports.actualizarseguimiento_tecnico)(id_seguimiento_tecnico, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivoseguimiento_tecnico)(id_seguimiento_tecnico);
        (0, exports.NewHistorialMasterseguimiento_tecnico)(id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
        (0, exports.actualizarEstatusSeguimiento)(id_asignacion, estatus_seguimiento);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newtecnico = newtecnico;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updtecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_asignacion, id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio, id_estatusseguimiento_tecnico } = req.body;
    console.log(req.body);
    //Validamos si existe el parametro en la base de datos 
    const params = yield tecnico_1.dbtecnico.findOne({ where: { id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio } });
    if (params) {
        try {
            const resultado = yield tecnico_1.dbtecnico.update({
                id_usuario: id_usuario,
                id_tecnico: id_tecnico,
                id_gestion_oficio: id_gestion_oficio,
                id_oficio: id_oficio,
                numero_oficio: numero_oficio,
                id_direcion_firmante: id_direcion_firmante,
                text_direccion_firmante: text_direccion_firmante,
                id_area_firmante: id_area_firmante,
                text_area_firmante: text_area_firmante,
                numero_empleado_firmante: numero_empleado_firmante,
                id_direccion_asignacion: id_direccion_asignacion,
                text_direccion_asignacion: text_direccion_asignacion,
                id_area_asignacion: id_area_asignacion,
                text_area_asignacion: text_area_asignacion,
                numero_empleado_asignacion: numero_empleado_asignacion,
                fecha_asignacion: fecha_asignacion,
                estatus_seguimiento: estatus_seguimiento,
                observaciones: observaciones,
                porcentaje_seguimiento: porcentaje_seguimiento,
                fecha_contestacion: fecha_contestacion,
                evidencia: evidencia,
                documento_oficio: documento_oficio,
                id_estatusseguimiento_tecnico: id_estatusseguimiento_tecnico,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialtecnico)(id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
            (0, exports.actualizarHistorialMasterseguimiento_tecnico)(id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
            (0, exports.actualizarEstatusSeguimiento)(id_asignacion, estatus_seguimiento);
        }
        catch (error) {
            res.status(404).json({
                msg: 'Ocurrio un inconveniente al tratar de actualizar el registro' + error,
                error
            });
        }
    }
    else {
        return res.status(404).json({
            msg: 'Registro de la tabla : tecnico  ya almacenado',
        });
    }
});
exports.updtecnico = updtecnico;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const deltecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield tecnico_1.dbtecnico.findOne({ where: { id_tecnico: id } });
    const id_tecnico = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_tecnico;
    const id_gestion_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_gestion_oficio;
    const id_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_oficio;
    const numero_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_oficio;
    const id_direcion_firmante = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direcion_firmante;
    const text_direccion_firmante = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion_firmante;
    const id_area_firmante = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area_firmante;
    const text_area_firmante = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_area_firmante;
    const numero_empleado_firmante = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado_firmante;
    const id_direccion_asignacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion_asignacion;
    const text_direccion_asignacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion_asignacion;
    const id_area_asignacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area_asignacion;
    const text_area_asignacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_area_asignacion;
    const numero_empleado_asignacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado_asignacion;
    const fecha_asignacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.fecha_asignacion;
    const estatus_seguimiento = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.estatus_seguimiento;
    const observaciones = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.observaciones;
    const porcentaje_seguimiento = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.porcentaje_seguimiento;
    const fecha_contestacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.fecha_contestacion;
    const evidencia = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.evidencia;
    const documento_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.documento_oficio;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield tecnico_1.dbtecnico.destroy({
            where: {
                id_tecnico: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialtecnico)(id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
        (0, exports.DelMasterHistorialtecnico)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.deltecnico = deltecnico;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAlltecnico = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialtecnico_1.dbhistorialtecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : tecnico',
            id_tecnico: '', id_gestion_oficio: '', id_oficio: '', numero_oficio: '', id_direcion_firmante: '', text_direccion_firmante: '', id_area_firmante: '', text_area_firmante: '', numero_empleado_firmante: '', id_direccion_asignacion: '', text_direccion_asignacion: '', id_area_asignacion: '', text_area_asignacion: '', numero_empleado_asignacion: '', fecha_asignacion: '', estatus_seguimiento: '', observaciones: '', porcentaje_seguimiento: '', fecha_contestacion: '', evidencia: '', documento_oficio: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAlltecnico = HistorialgetAlltecnico;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdtecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialtecnico_1.dbhistorialtecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: tecnico',
            id_tecnico: id, id_gestion_oficio: '', id_oficio: '', numero_oficio: '', id_direcion_firmante: '', text_direccion_firmante: '', id_area_firmante: '', text_area_firmante: '', numero_empleado_firmante: '', id_direccion_asignacion: '', text_direccion_asignacion: '', id_area_asignacion: '', text_area_asignacion: '', numero_empleado_asignacion: '', fecha_asignacion: '', estatus_seguimiento: '', observaciones: '', porcentaje_seguimiento: '', fecha_contestacion: '', evidencia: '', documento_oficio: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdtecnico = HistorialgetRegByIdtecnico;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialtecnico = (id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialtecnico_1.dbhistorialtecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: tecnico',
            id_tecnico: id, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialtecnico = NewHistorialtecnico;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialtecnico = (id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialtecnico_1.dbhistorialtecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: tecnico',
            id_tecnico: id, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialtecnico = UpdHistorialtecnico;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialtecnico = (id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialtecnico_1.dbhistorialtecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: tecnico',
            id_tecnico: id, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialtecnico = DelHistorialtecnico;
//actualizar en la tabla seguimiento_tecnico ----------------------------------------------------------------------> 
const actualizarseguimiento_tecnico = (id_seguimiento_tecnico, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield seguimiento_tecnico_1.dbseguimiento_tecnico.update({
            id_tecnico: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_seguimiento_tecnico: id_seguimiento_tecnico
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarseguimiento_tecnico = actualizarseguimiento_tecnico;
//almacenar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
const NewHistorialMasterseguimiento_tecnico = (id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
            id_usuario: id_usuario,
            id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasterseguimiento_tecnico = NewHistorialMasterseguimiento_tecnico;
//Actualizar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
const actualizarHistorialMasterseguimiento_tecnico = (id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
            id_usuario: id_usuario,
            id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterseguimiento_tecnico = actualizarHistorialMasterseguimiento_tecnico;
//Desactivar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
const DelMasterHistorialtecnico = (id_usuario, id_tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
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
exports.DelMasterHistorialtecnico = DelMasterHistorialtecnico;
//actualizar Estado Activo en la tabla seguimiento_tecnico ----------------------------------------------------------------------> 
const actualizarEstadoActivoseguimiento_tecnico = (id_seguimiento_tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield seguimiento_tecnico_1.dbseguimiento_tecnico.update({
            activo: 1,
        }, {
            where: {
                id_seguimiento_tecnico: id_seguimiento_tecnico
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivoseguimiento_tecnico = actualizarEstadoActivoseguimiento_tecnico;
//actualizar Estado Activo en la tabla seguimiento_tecnico ----------------------------------------------------------------------> 
const actualizarEstatusSeguimiento = (id_asignacion, estatus_seguimiento) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    //mapa de estatus :
    // 1 =  nuevo
    // 2 =  En preoceso
    // 3 =  En pausa
    // 4 =  Concluido
    try {
        const resultado = yield asignacion_1.dbasignacion.update({
            estatus_oficio: estatus_seguimiento,
        }, {
            where: {
                id_asignacion: id_asignacion
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstatusSeguimiento = actualizarEstatusSeguimiento;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const get_oficio_tecnico_by_id_gestion_oficio_id_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficio, id_oficios } = req.params;
    let findtecnico = "";
    try {
        let findtecnico = yield tecnico_1.dbtecnico.findOne({ where: { id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficios } });
        return res.json(findtecnico);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los tecnico. ',
            error
        });
    }
});
exports.get_oficio_tecnico_by_id_gestion_oficio_id_oficios = get_oficio_tecnico_by_id_gestion_oficio_id_oficios;
