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
exports.ActualDesactivadoMasterHistorialevidencia_sello = exports.ActualDesactivadoHistorialevidencia_sello = exports.actualizarDesactivadoevidencia_sello = exports.actualizarEstatusDescripcionevidencia_sello = exports.DelMasterHistorialevidencia_sello = exports.actualizarHistorialMasterevidencia_sello = exports.NewHistorialMasterevidencia_sello = exports.DelHistorialevidencia_sello = exports.UpdHistorialevidencia_selloid_sello = exports.NewHistorialevidencia_sello = exports.HistorialgetRegByIdevidencia_sello = exports.HistorialgetAllevidencia_sello = exports.delevidencia_sello = exports.updevidencia_sello_id_sello = exports.newevidencia_sello = exports.getRegByIdevidencia_sello = exports.getAllevidencia_sello = exports.timeNow = void 0;
const evidencia_sello_1 = require("../models/evidencia_sello");
const historialevidencia_sello_1 = require("../models/historialevidencia_sello");
const historialMasterevidencia_sello_1 = require("../models/historialMasterevidencia_sello");
const { Sequelize, DataTypes } = require('sequelize');
const sello_1 = require("../models/sello");
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
const getAllevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listevidencia_sello = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: sello_1.dbsello,
                    }],
                attributes: [
                    'id_evidencia_sello',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_sello.id_sello'), 'id_sello'],
                    [Sequelize.col('ws_sello.id_gestion_oficios'), 'id_gestion_oficios'],
                    [Sequelize.col('ws_sello.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_sello.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_sello.id_area'), 'id_area'],
                    [Sequelize.col('ws_sello.text_area'), 'text_area'],
                    [Sequelize.col('ws_sello.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_sello.fecha_creacion'), 'fecha_creacion'],
                    [Sequelize.col('ws_sello.nombre_documento_oficio'), 'nombre_documento_oficio'],
                    [Sequelize.col('ws_sello.nombre_documento_sello_digital'), 'nombre_documento_sello_digital'],
                    [Sequelize.col('ws_sello.nombre_documento_sello'), 'nombre_documento_sello']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listevidencia_sello);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllevidencia_sello)(id_usuario);
    }
});
exports.getAllevidencia_sello = getAllevidencia_sello;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findevidencia_sello = yield evidencia_sello_1.dbevidencia_sello.findOne({ where: { id_evidencia_sello: id } });
    try {
        if (findevidencia_sello) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdevidencia_sello)(id_usuario, id);
            }
            return res.json(findevidencia_sello);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los evidencia_sello. ',
            error
        });
    }
    console.log(findevidencia_sello);
});
exports.getRegByIdevidencia_sello = getRegByIdevidencia_sello;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield evidencia_sello_1.dbevidencia_sello.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevosello',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_evidencia_sello);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialevidencia_sello)(id_usuario, id);
        (0, exports.NewHistorialMasterevidencia_sello)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newevidencia_sello = newevidencia_sello;
//Actualizar el parametro con Id de : id_sello--------------------------------------------------------------------------> 
const updevidencia_sello_id_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_evidencia_sello, id_sello, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield evidencia_sello_1.dbevidencia_sello.findOne({ where: { id_evidencia_sello: id_evidencia_sello } });
    if (params) {
        try {
            const resultado = yield evidencia_sello_1.dbevidencia_sello.update({
                id_usuario: id_usuario,
                id_sello: id_sello,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_evidencia_sello: id_evidencia_sello
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialevidencia_selloid_sello)(id_usuario, id_sello);
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
            msg: 'Registro de la tabla : evidencia_sello  ya almacenado',
        });
    }
});
exports.updevidencia_sello_id_sello = updevidencia_sello_id_sello;
//Eliminar un Parametro evidencia_sello--------------------------------------------------------------------------> 
const delevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield evidencia_sello_1.dbevidencia_sello.findOne({ where: { id_evidencia_sello: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield evidencia_sello_1.dbevidencia_sello.update({
            activo: 0,
        }, {
            where: {
                id_evidencia_sello: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialevidencia_sello)(id_usuario, id);
        (0, exports.DelMasterHistorialevidencia_sello)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delevidencia_sello = delevidencia_sello;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllevidencia_sello = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialevidencia_sello_1.dbhistorialevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : evidencia_sello',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllevidencia_sello = HistorialgetAllevidencia_sello;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdevidencia_sello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialevidencia_sello_1.dbhistorialevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: evidencia_sello',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdevidencia_sello = HistorialgetRegByIdevidencia_sello;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialevidencia_sello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialevidencia_sello_1.dbhistorialevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: evidencia_sello',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialevidencia_sello = NewHistorialevidencia_sello;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialevidencia_selloid_sello = (id_usuario, id_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialevidencia_sello_1.dbhistorialevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: evidencia_sello',
            id_sello,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialevidencia_selloid_sello = UpdHistorialevidencia_selloid_sello;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialevidencia_sello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialevidencia_sello_1.dbhistorialevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: evidencia_sello',
            id_sello: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialevidencia_sello = DelHistorialevidencia_sello;
//almacenar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMasterevidencia_sello = (id_evidencia_sello, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
            id_usuario: id_usuario,
            id_evidencia_sello: id_evidencia_sello,
            estatus: 1,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasterevidencia_sello = NewHistorialMasterevidencia_sello;
//Actualizar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
const actualizarHistorialMasterevidencia_sello = (id_usuario, id_evidencia_sello, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
            id_usuario: id_usuario,
            id_evidencia_sello,
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
const DelMasterHistorialevidencia_sello = (id_usuario, id_evidencia_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
            id_usuario: id_usuario,
            id_evidencia_sello: id_evidencia_sello,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialevidencia_sello = DelMasterHistorialevidencia_sello;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcionevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_evidencia_sello, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield evidencia_sello_1.dbevidencia_sello.findOne({ where: { id_evidencia_sello: id_evidencia_sello } });
    if (params) {
        try {
            const resultado = yield evidencia_sello_1.dbevidencia_sello.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_evidencia_sello: id_evidencia_sello
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMasterevidencia_sello)(id_usuario, id_evidencia_sello, estatus, descripcion);
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
            msg: 'Registro de la tabla : evidencia_sello  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcionevidencia_sello = actualizarEstatusDescripcionevidencia_sello;
const actualizarDesactivadoevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield evidencia_sello_1.dbevidencia_sello.findOne({ where: { id_evidencia_sello: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield evidencia_sello_1.dbevidencia_sello.update({
            activo: 1,
        }, {
            where: {
                id_evidencia_sello: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialevidencia_sello)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialevidencia_sello)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadoevidencia_sello = actualizarDesactivadoevidencia_sello;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialevidencia_sello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialevidencia_sello_1.dbhistorialevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_sello: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialevidencia_sello = ActualDesactivadoHistorialevidencia_sello;
//Desactivar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialevidencia_sello = (id_usuario, id_evidencia_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
            id_usuario: id_usuario,
            id_evidencia_sello: id_evidencia_sello,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_evidencia_sello,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialevidencia_sello = ActualDesactivadoMasterHistorialevidencia_sello;
