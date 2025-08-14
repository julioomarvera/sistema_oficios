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
exports.ActualDesactivadoMasterHistorialregistro_quien_firma = exports.ActualDesactivadoHistorialregistro_quien_firma = exports.actualizarDesactivadoregistro_quien_firma = exports.actualizarEstatusDescripcionregistro_quien_firma = exports.DelMasterHistorialregistro_quien_firma = exports.actualizarHistorialMasterregistro_quien_firma = exports.NewHistorialMasterregistro_quien_firma = exports.DelHistorialregistro_quien_firma = exports.UpdHistorialregistro_quien_firmaid_cat_firmante = exports.NewHistorialregistro_quien_firma = exports.HistorialgetRegByIdregistro_quien_firma = exports.HistorialgetAllregistro_quien_firma = exports.delregistro_quien_firma = exports.updregistro_quien_firma_id_cat_firmante = exports.newregistro_quien_firma = exports.getRegByIdregistro_quien_firma = exports.getAllregistro_quien_firma = exports.timeNow = void 0;
const registro_quien_firma_1 = require("../models/registro_quien_firma");
const historialregistro_quien_firma_1 = require("../models/historialregistro_quien_firma");
const historialMasterregistro_quien_firma_1 = require("../models/historialMasterregistro_quien_firma");
const { Sequelize, DataTypes } = require('sequelize');
const cat_firmante_1 = require("../models/cat_firmante");
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
const getAllregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listregistro_quien_firma = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_firmante_1.dbcat_firmante,
                    }],
                attributes: [
                    'id_registro_quien_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_firmante.id_cat_firmante'), 'id_cat_firmante'],
                    [Sequelize.col('ws_cat_firmante.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_firmante.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_firmante.id_area'), 'id_area'],
                    [Sequelize.col('ws_cat_firmante.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_firmante.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_firmante.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_firmante.foto'), 'foto'],
                    [Sequelize.col('ws_cat_firmante.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_firmante.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listregistro_quien_firma);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllregistro_quien_firma)(id_usuario);
    }
});
exports.getAllregistro_quien_firma = getAllregistro_quien_firma;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findregistro_quien_firma = yield registro_quien_firma_1.dbregistro_quien_firma.findOne({ where: { id_registro_quien_firma: id } });
    try {
        if (findregistro_quien_firma) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdregistro_quien_firma)(id_usuario, id);
            }
            return res.json(findregistro_quien_firma);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los registro_quien_firma. ',
            error
        });
    }
    console.log(findregistro_quien_firma);
});
exports.getRegByIdregistro_quien_firma = getRegByIdregistro_quien_firma;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield registro_quien_firma_1.dbregistro_quien_firma.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevocat_firmante',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_registro_quien_firma);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialregistro_quien_firma)(id_usuario, id);
        (0, exports.NewHistorialMasterregistro_quien_firma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newregistro_quien_firma = newregistro_quien_firma;
//Actualizar el parametro con Id de : id_cat_firmante--------------------------------------------------------------------------> 
const updregistro_quien_firma_id_cat_firmante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_registro_quien_firma, id_cat_firmante, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield registro_quien_firma_1.dbregistro_quien_firma.findOne({ where: { id_registro_quien_firma: id_registro_quien_firma } });
    if (params) {
        try {
            const resultado = yield registro_quien_firma_1.dbregistro_quien_firma.update({
                id_usuario: id_usuario,
                id_cat_firmante: id_cat_firmante,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_registro_quien_firma: id_registro_quien_firma
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialregistro_quien_firmaid_cat_firmante)(id_usuario, id_cat_firmante);
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
            msg: 'Registro de la tabla : registro_quien_firma  ya almacenado',
        });
    }
});
exports.updregistro_quien_firma_id_cat_firmante = updregistro_quien_firma_id_cat_firmante;
//Eliminar un Parametro registro_quien_firma--------------------------------------------------------------------------> 
const delregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield registro_quien_firma_1.dbregistro_quien_firma.findOne({ where: { id_registro_quien_firma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield registro_quien_firma_1.dbregistro_quien_firma.update({
            activo: 0,
        }, {
            where: {
                id_registro_quien_firma: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialregistro_quien_firma)(id_usuario, id);
        (0, exports.DelMasterHistorialregistro_quien_firma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delregistro_quien_firma = delregistro_quien_firma;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllregistro_quien_firma = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_quien_firma_1.dbhistorialregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : registro_quien_firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllregistro_quien_firma = HistorialgetAllregistro_quien_firma;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdregistro_quien_firma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_quien_firma_1.dbhistorialregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: registro_quien_firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdregistro_quien_firma = HistorialgetRegByIdregistro_quien_firma;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialregistro_quien_firma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_quien_firma_1.dbhistorialregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: registro_quien_firma',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialregistro_quien_firma = NewHistorialregistro_quien_firma;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialregistro_quien_firmaid_cat_firmante = (id_usuario, id_cat_firmante) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_quien_firma_1.dbhistorialregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: registro_quien_firma',
            id_cat_firmante,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialregistro_quien_firmaid_cat_firmante = UpdHistorialregistro_quien_firmaid_cat_firmante;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialregistro_quien_firma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_quien_firma_1.dbhistorialregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: registro_quien_firma',
            id_cat_firmante: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialregistro_quien_firma = DelHistorialregistro_quien_firma;
//almacenar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMasterregistro_quien_firma = (id_registro_quien_firma, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
            id_usuario: id_usuario,
            id_registro_quien_firma: id_registro_quien_firma,
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
exports.NewHistorialMasterregistro_quien_firma = NewHistorialMasterregistro_quien_firma;
//Actualizar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
const actualizarHistorialMasterregistro_quien_firma = (id_usuario, id_registro_quien_firma, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
            id_usuario: id_usuario,
            id_registro_quien_firma,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterregistro_quien_firma = actualizarHistorialMasterregistro_quien_firma;
//Desactivar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
const DelMasterHistorialregistro_quien_firma = (id_usuario, id_registro_quien_firma) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
            id_usuario: id_usuario,
            id_registro_quien_firma: id_registro_quien_firma,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialregistro_quien_firma = DelMasterHistorialregistro_quien_firma;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcionregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_registro_quien_firma, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield registro_quien_firma_1.dbregistro_quien_firma.findOne({ where: { id_registro_quien_firma: id_registro_quien_firma } });
    if (params) {
        try {
            const resultado = yield registro_quien_firma_1.dbregistro_quien_firma.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_registro_quien_firma: id_registro_quien_firma
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMasterregistro_quien_firma)(id_usuario, id_registro_quien_firma, estatus, descripcion);
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
            msg: 'Registro de la tabla : registro_quien_firma  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcionregistro_quien_firma = actualizarEstatusDescripcionregistro_quien_firma;
const actualizarDesactivadoregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield registro_quien_firma_1.dbregistro_quien_firma.findOne({ where: { id_registro_quien_firma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield registro_quien_firma_1.dbregistro_quien_firma.update({
            activo: 1,
        }, {
            where: {
                id_registro_quien_firma: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialregistro_quien_firma)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialregistro_quien_firma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadoregistro_quien_firma = actualizarDesactivadoregistro_quien_firma;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialregistro_quien_firma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_quien_firma_1.dbhistorialregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_cat_firmante: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialregistro_quien_firma = ActualDesactivadoHistorialregistro_quien_firma;
//Desactivar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialregistro_quien_firma = (id_usuario, id_registro_quien_firma) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
            id_usuario: id_usuario,
            id_registro_quien_firma: id_registro_quien_firma,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_registro_quien_firma,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialregistro_quien_firma = ActualDesactivadoMasterHistorialregistro_quien_firma;
