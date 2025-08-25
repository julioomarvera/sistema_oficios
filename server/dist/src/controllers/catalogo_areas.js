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
exports.ActualDesactivadoMasterHistorialcatalogo_areas = exports.ActualDesactivadoHistorialcatalogo_areas = exports.actualizarDesactivadocatalogo_areas = exports.actualizarEstatusDescripcioncatalogo_areas = exports.DelMasterHistorialcatalogo_areas = exports.actualizarHistorialMastercatalogo_areas = exports.NewHistorialMastercatalogo_areas = exports.DelHistorialcatalogo_areas = exports.UpdHistorialcatalogo_areasid_cat_areas = exports.NewHistorialcatalogo_areas = exports.HistorialgetRegByIdcatalogo_areas = exports.HistorialgetAllcatalogo_areas = exports.delcatalogo_areas = exports.updcatalogo_areas_id_cat_areas = exports.newcatalogo_areas = exports.getRegByIdcatalogo_areas = exports.getAllcatalogo_areas = exports.timeNow = void 0;
const catalogo_areas_1 = require("../models/catalogo_areas");
const historialcatalogo_areas_1 = require("../models/historialcatalogo_areas");
const historialMastercatalogo_areas_1 = require("../models/historialMastercatalogo_areas");
const { Sequelize, DataTypes } = require('sequelize');
const cat_areas_1 = require("../models/cat_areas");
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
const getAllcatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listcatalogo_areas = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_areas_1.dbcat_areas,
                    }],
                attributes: [
                    'id_catalogo_areas',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_areas.id_cat_areas'), 'id_cat_areas'],
                    [Sequelize.col('ws_cat_areas.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_areas.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_areas.descripcion'), 'descripcion']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listcatalogo_areas);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcatalogo_areas)(id_usuario);
    }
});
exports.getAllcatalogo_areas = getAllcatalogo_areas;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcatalogo_areas = yield catalogo_areas_1.dbcatalogo_areas.findOne({ where: { id_catalogo_areas: id } });
    try {
        if (findcatalogo_areas) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcatalogo_areas)(id_usuario, id);
            }
            return res.json(findcatalogo_areas);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_areas. ',
            error
        });
    }
    console.log(findcatalogo_areas);
});
exports.getRegByIdcatalogo_areas = getRegByIdcatalogo_areas;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield catalogo_areas_1.dbcatalogo_areas.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevocat_areas',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_catalogo_areas);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialcatalogo_areas)(id_usuario, id);
        (0, exports.NewHistorialMastercatalogo_areas)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcatalogo_areas = newcatalogo_areas;
//Actualizar el parametro con Id de : id_cat_areas--------------------------------------------------------------------------> 
const updcatalogo_areas_id_cat_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_catalogo_areas, id_cat_areas, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield catalogo_areas_1.dbcatalogo_areas.findOne({ where: { id_catalogo_areas: id_catalogo_areas } });
    if (params) {
        try {
            const resultado = yield catalogo_areas_1.dbcatalogo_areas.update({
                id_usuario: id_usuario,
                id_cat_areas: id_cat_areas,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_catalogo_areas: id_catalogo_areas
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcatalogo_areasid_cat_areas)(id_usuario, id_cat_areas);
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
            msg: 'Registro de la tabla : catalogo_areas  ya almacenado',
        });
    }
});
exports.updcatalogo_areas_id_cat_areas = updcatalogo_areas_id_cat_areas;
//Eliminar un Parametro catalogo_areas--------------------------------------------------------------------------> 
const delcatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield catalogo_areas_1.dbcatalogo_areas.findOne({ where: { id_catalogo_areas: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield catalogo_areas_1.dbcatalogo_areas.update({
            activo: 0,
        }, {
            where: {
                id_catalogo_areas: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcatalogo_areas)(id_usuario, id);
        (0, exports.DelMasterHistorialcatalogo_areas)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcatalogo_areas = delcatalogo_areas;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcatalogo_areas = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_areas_1.dbhistorialcatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : catalogo_areas',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcatalogo_areas = HistorialgetAllcatalogo_areas;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcatalogo_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_areas_1.dbhistorialcatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: catalogo_areas',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcatalogo_areas = HistorialgetRegByIdcatalogo_areas;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcatalogo_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_areas_1.dbhistorialcatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_areas',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcatalogo_areas = NewHistorialcatalogo_areas;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcatalogo_areasid_cat_areas = (id_usuario, id_cat_areas) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_areas_1.dbhistorialcatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: catalogo_areas',
            id_cat_areas,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcatalogo_areasid_cat_areas = UpdHistorialcatalogo_areasid_cat_areas;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcatalogo_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_areas_1.dbhistorialcatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: catalogo_areas',
            id_cat_areas: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcatalogo_areas = DelHistorialcatalogo_areas;
//almacenar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMastercatalogo_areas = (id_catalogo_areas, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            id_catalogo_areas: id_catalogo_areas,
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
exports.NewHistorialMastercatalogo_areas = NewHistorialMastercatalogo_areas;
//Actualizar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
const actualizarHistorialMastercatalogo_areas = (id_usuario, id_catalogo_areas, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            id_catalogo_areas,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMastercatalogo_areas = actualizarHistorialMastercatalogo_areas;
//Desactivar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
const DelMasterHistorialcatalogo_areas = (id_usuario, id_catalogo_areas) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            id_catalogo_areas: id_catalogo_areas,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialcatalogo_areas = DelMasterHistorialcatalogo_areas;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcioncatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo_areas, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield catalogo_areas_1.dbcatalogo_areas.findOne({ where: { id_catalogo_areas: id_catalogo_areas } });
    if (params) {
        try {
            const resultado = yield catalogo_areas_1.dbcatalogo_areas.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_catalogo_areas: id_catalogo_areas
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMastercatalogo_areas)(id_usuario, id_catalogo_areas, estatus, descripcion);
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
            msg: 'Registro de la tabla : catalogo_areas  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcioncatalogo_areas = actualizarEstatusDescripcioncatalogo_areas;
const actualizarDesactivadocatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield catalogo_areas_1.dbcatalogo_areas.findOne({ where: { id_catalogo_areas: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield catalogo_areas_1.dbcatalogo_areas.update({
            activo: 1,
        }, {
            where: {
                id_catalogo_areas: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialcatalogo_areas)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialcatalogo_areas)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadocatalogo_areas = actualizarDesactivadocatalogo_areas;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialcatalogo_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_areas_1.dbhistorialcatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_cat_areas: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialcatalogo_areas = ActualDesactivadoHistorialcatalogo_areas;
//Desactivar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialcatalogo_areas = (id_usuario, id_catalogo_areas) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            id_catalogo_areas: id_catalogo_areas,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_catalogo_areas,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialcatalogo_areas = ActualDesactivadoMasterHistorialcatalogo_areas;
