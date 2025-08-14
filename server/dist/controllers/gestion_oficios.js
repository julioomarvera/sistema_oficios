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
exports.getId_gestion_oficio = exports.getOficiosByDireccion = exports.ActualDesactivadoMasterHistorialgestion_oficios = exports.ActualDesactivadoHistorialgestion_oficios = exports.actualizarDesactivadogestion_oficios = exports.actualizarEstatusDescripciongestion_oficios = exports.DelMasterHistorialgestion_oficios = exports.actualizarHistorialMastergestion_oficios = exports.NewHistorialMastergestion_oficios = exports.DelHistorialgestion_oficios = exports.UpdHistorialgestion_oficiosid_oficios = exports.NewHistorialgestion_oficios = exports.HistorialgetRegByIdgestion_oficios = exports.HistorialgetAllgestion_oficios = exports.delgestion_oficios = exports.updgestion_oficios_id_oficios = exports.newgestion_oficios = exports.getRegByIdgestion_oficios = exports.getAllgestion_oficios = exports.timeNow = void 0;
const gestion_oficios_1 = require("../models/gestion_oficios");
const historialgestion_oficios_1 = require("../models/historialgestion_oficios");
const historialMastergestion_oficios_1 = require("../models/historialMastergestion_oficios");
const { Sequelize, DataTypes } = require('sequelize');
const oficios_1 = require("../models/oficios");
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
const getAllgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listgestion_oficios = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo },
                include: [{ model: oficios_1.dboficios },
                ],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro'],
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo },
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { id_usuario: id_usuario },
                include: [{ model: oficios_1.dboficios },
                    { model: cat_destinatario_1.dbcat_destinatario },
                ],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro'],
                    [Sequelize.col('ws_cat_destinatario'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: oficios_1.dboficios,
                    }],
                attributes: [
                    'id_gestion_oficios',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                    [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                    [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                    [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                    [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                    [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                    [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                    [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                    [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_oficio.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listgestion_oficios);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllgestion_oficios)(id_usuario);
    }
});
exports.getAllgestion_oficios = getAllgestion_oficios;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findOne({ where: { id_gestion_oficios: id } });
    try {
        if (findgestion_oficios) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdgestion_oficios)(id_usuario, id);
            }
            return res.json(findgestion_oficios);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los gestion_oficios. ',
            error
        });
    }
    console.log(findgestion_oficios);
});
exports.getRegByIdgestion_oficios = getRegByIdgestion_oficios;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    console.log("11111111111111111111111111111111111111111111111111111111111");
    try {
        const resultado = yield gestion_oficios_1.dbgestion_oficios.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevooficios',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_gestion_oficios);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialgestion_oficios)(id_usuario, id);
        (0, exports.NewHistorialMastergestion_oficios)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newgestion_oficios = newgestion_oficios;
//Actualizar el parametro con Id de : id_oficios--------------------------------------------------------------------------> 
const updgestion_oficios_id_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_gestion_oficios, id_oficios, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield gestion_oficios_1.dbgestion_oficios.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
    if (params) {
        try {
            const resultado = yield gestion_oficios_1.dbgestion_oficios.update({
                id_usuario: id_usuario,
                id_oficios: id_oficios,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_gestion_oficios: id_gestion_oficios
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialgestion_oficiosid_oficios)(id_usuario, id_oficios);
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
            msg: 'Registro de la tabla : gestion_oficios  ya almacenado',
        });
    }
});
exports.updgestion_oficios_id_oficios = updgestion_oficios_id_oficios;
//Eliminar un Parametro gestion_oficios--------------------------------------------------------------------------> 
const delgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield gestion_oficios_1.dbgestion_oficios.findOne({ where: { id_gestion_oficios: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield gestion_oficios_1.dbgestion_oficios.update({
            activo: 0,
        }, {
            where: {
                id_gestion_oficios: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialgestion_oficios)(id_usuario, id);
        (0, exports.DelMasterHistorialgestion_oficios)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delgestion_oficios = delgestion_oficios;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllgestion_oficios = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialgestion_oficios_1.dbhistorialgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : gestion_oficios',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllgestion_oficios = HistorialgetAllgestion_oficios;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdgestion_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialgestion_oficios_1.dbhistorialgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: gestion_oficios',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdgestion_oficios = HistorialgetRegByIdgestion_oficios;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialgestion_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialgestion_oficios_1.dbhistorialgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: gestion_oficios',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialgestion_oficios = NewHistorialgestion_oficios;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialgestion_oficiosid_oficios = (id_usuario, id_oficios) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialgestion_oficios_1.dbhistorialgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: gestion_oficios',
            id_oficios,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialgestion_oficiosid_oficios = UpdHistorialgestion_oficiosid_oficios;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialgestion_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialgestion_oficios_1.dbhistorialgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: gestion_oficios',
            id_oficios: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialgestion_oficios = DelHistorialgestion_oficios;
//almacenar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMastergestion_oficios = (id_gestion_oficios, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
            id_usuario: id_usuario,
            id_gestion_oficios: id_gestion_oficios,
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
exports.NewHistorialMastergestion_oficios = NewHistorialMastergestion_oficios;
//Actualizar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
const actualizarHistorialMastergestion_oficios = (id_usuario, id_gestion_oficios, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
            id_usuario: id_usuario,
            id_gestion_oficios,
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
const DelMasterHistorialgestion_oficios = (id_usuario, id_gestion_oficios) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
            id_usuario: id_usuario,
            id_gestion_oficios: id_gestion_oficios,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialgestion_oficios = DelMasterHistorialgestion_oficios;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripciongestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_gestion_oficios, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield gestion_oficios_1.dbgestion_oficios.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
    if (params) {
        try {
            const resultado = yield gestion_oficios_1.dbgestion_oficios.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_gestion_oficios: id_gestion_oficios
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMastergestion_oficios)(id_usuario, id_gestion_oficios, estatus, descripcion);
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
            msg: 'Registro de la tabla : gestion_oficios  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripciongestion_oficios = actualizarEstatusDescripciongestion_oficios;
const actualizarDesactivadogestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield gestion_oficios_1.dbgestion_oficios.findOne({ where: { id_gestion_oficios: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield gestion_oficios_1.dbgestion_oficios.update({
            activo: 1,
        }, {
            where: {
                id_gestion_oficios: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialgestion_oficios)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialgestion_oficios)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadogestion_oficios = actualizarDesactivadogestion_oficios;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialgestion_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialgestion_oficios_1.dbhistorialgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_oficios: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialgestion_oficios = ActualDesactivadoHistorialgestion_oficios;
//Desactivar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialgestion_oficios = (id_usuario, id_gestion_oficios) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
            id_usuario: id_usuario,
            id_gestion_oficios: id_gestion_oficios,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_gestion_oficios,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialgestion_oficios = ActualDesactivadoMasterHistorialgestion_oficios;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getOficiosByDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list_id_gestion_oficios = req.body.ids;
    console.log(list_id_gestion_oficios);
    let listgestion_oficios = '';
    listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findAll({
        where: {
            id_gestion_oficios: list_id_gestion_oficios // Sequelize lo interpreta como IN
        },
        include: [{
                model: oficios_1.dboficios,
            }],
        attributes: [
            'id_gestion_oficios',
            'id_usuario',
            'finalizado',
            'estatus',
            'descripcion',
            'activo',
            'createdAt',
            [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
            [Sequelize.col('ws_oficio.oficio'), 'oficio'],
            [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
            [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
            [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
            [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
            [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
            [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
            [Sequelize.col('ws_oficio.asunto'), 'asunto'],
            [Sequelize.col('ws_oficio.contenido'), 'contenido'],
            [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
            [Sequelize.col('ws_oficio.otro'), 'otro']
        ],
        raw: true,
        nest: false,
    });
    return res.json(listgestion_oficios);
});
exports.getOficiosByDireccion = getOficiosByDireccion;
const getId_gestion_oficio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_oficios } = req.params;
    let listgestion_oficios = '';
    listgestion_oficios = yield gestion_oficios_1.dbgestion_oficios.findOne({
        where: {
            id_oficios: id_oficios, activo: 1
        },
    });
    return res.json(listgestion_oficios);
});
exports.getId_gestion_oficio = getId_gestion_oficio;
