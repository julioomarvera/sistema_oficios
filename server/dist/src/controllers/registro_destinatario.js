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
exports.ActualDesactivadoMasterHistorialregistro_destinatario = exports.ActualDesactivadoHistorialregistro_destinatario = exports.actualizarDesactivadoregistro_destinatario = exports.actualizarEstatusDescripcionregistro_destinatario = exports.DelMasterHistorialregistro_destinatario = exports.actualizarHistorialMasterregistro_destinatario = exports.NewHistorialMasterregistro_destinatario = exports.DelHistorialregistro_destinatario = exports.UpdHistorialregistro_destinatarioid_cat_destinatario = exports.NewHistorialregistro_destinatario = exports.HistorialgetRegByIdregistro_destinatario = exports.HistorialgetAllregistro_destinatario = exports.delregistro_destinatario = exports.updregistro_destinatario_id_cat_destinatario = exports.newregistro_destinatario = exports.getRegByIdregistro_destinatario = exports.getAllregistro_destinatario = exports.timeNow = void 0;
const registro_destinatario_1 = require("../models/registro_destinatario");
const historialregistro_destinatario_1 = require("../models/historialregistro_destinatario");
const historialMasterregistro_destinatario_1 = require("../models/historialMasterregistro_destinatario");
const { Sequelize, DataTypes } = require('sequelize');
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
const getAllregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listregistro_destinatario = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_destinatario_1.dbcat_destinatario,
                    }],
                attributes: [
                    'id_registro_destinatario',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'), 'id_cat_destinatario'],
                    [Sequelize.col('ws_cat_destinatario.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_cat_destinatario.text_direccion'), 'text_direccion'],
                    [Sequelize.col('ws_cat_destinatario.id_area'), ' id_area'],
                    [Sequelize.col('ws_cat_destinatario.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_destinatario.numero_empledo'), 'numero_empledo'],
                    [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'), 'text_nombre_empleado'],
                    [Sequelize.col('ws_cat_destinatario.foto'), 'foto'],
                    [Sequelize.col('ws_cat_destinatario.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_cat_destinatario.estatus'), 'estatus']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listregistro_destinatario);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllregistro_destinatario)(id_usuario);
    }
});
exports.getAllregistro_destinatario = getAllregistro_destinatario;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findregistro_destinatario = yield registro_destinatario_1.dbregistro_destinatario.findOne({ where: { id_registro_destinatario: id } });
    try {
        if (findregistro_destinatario) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdregistro_destinatario)(id_usuario, id);
            }
            return res.json(findregistro_destinatario);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los registro_destinatario. ',
            error
        });
    }
    console.log(findregistro_destinatario);
});
exports.getRegByIdregistro_destinatario = getRegByIdregistro_destinatario;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield registro_destinatario_1.dbregistro_destinatario.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevocat_destinatario',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_registro_destinatario);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialregistro_destinatario)(id_usuario, id);
        (0, exports.NewHistorialMasterregistro_destinatario)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newregistro_destinatario = newregistro_destinatario;
//Actualizar el parametro con Id de : id_cat_destinatario--------------------------------------------------------------------------> 
const updregistro_destinatario_id_cat_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_registro_destinatario, id_cat_destinatario, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield registro_destinatario_1.dbregistro_destinatario.findOne({ where: { id_registro_destinatario: id_registro_destinatario } });
    if (params) {
        try {
            const resultado = yield registro_destinatario_1.dbregistro_destinatario.update({
                id_usuario: id_usuario,
                id_cat_destinatario: id_cat_destinatario,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_registro_destinatario: id_registro_destinatario
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialregistro_destinatarioid_cat_destinatario)(id_usuario, id_cat_destinatario);
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
            msg: 'Registro de la tabla : registro_destinatario  ya almacenado',
        });
    }
});
exports.updregistro_destinatario_id_cat_destinatario = updregistro_destinatario_id_cat_destinatario;
//Eliminar un Parametro registro_destinatario--------------------------------------------------------------------------> 
const delregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield registro_destinatario_1.dbregistro_destinatario.findOne({ where: { id_registro_destinatario: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield registro_destinatario_1.dbregistro_destinatario.update({
            activo: 0,
        }, {
            where: {
                id_registro_destinatario: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialregistro_destinatario)(id_usuario, id);
        (0, exports.DelMasterHistorialregistro_destinatario)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delregistro_destinatario = delregistro_destinatario;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllregistro_destinatario = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_destinatario_1.dbhistorialregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : registro_destinatario',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllregistro_destinatario = HistorialgetAllregistro_destinatario;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdregistro_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_destinatario_1.dbhistorialregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: registro_destinatario',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdregistro_destinatario = HistorialgetRegByIdregistro_destinatario;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialregistro_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_destinatario_1.dbhistorialregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: registro_destinatario',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialregistro_destinatario = NewHistorialregistro_destinatario;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialregistro_destinatarioid_cat_destinatario = (id_usuario, id_cat_destinatario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_destinatario_1.dbhistorialregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: registro_destinatario',
            id_cat_destinatario,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialregistro_destinatarioid_cat_destinatario = UpdHistorialregistro_destinatarioid_cat_destinatario;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialregistro_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_destinatario_1.dbhistorialregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: registro_destinatario',
            id_cat_destinatario: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialregistro_destinatario = DelHistorialregistro_destinatario;
//almacenar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMasterregistro_destinatario = (id_registro_destinatario, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            id_registro_destinatario: id_registro_destinatario,
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
exports.NewHistorialMasterregistro_destinatario = NewHistorialMasterregistro_destinatario;
//Actualizar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
const actualizarHistorialMasterregistro_destinatario = (id_usuario, id_registro_destinatario, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            id_registro_destinatario,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterregistro_destinatario = actualizarHistorialMasterregistro_destinatario;
//Desactivar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
const DelMasterHistorialregistro_destinatario = (id_usuario, id_registro_destinatario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            id_registro_destinatario: id_registro_destinatario,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialregistro_destinatario = DelMasterHistorialregistro_destinatario;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcionregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_registro_destinatario, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield registro_destinatario_1.dbregistro_destinatario.findOne({ where: { id_registro_destinatario: id_registro_destinatario } });
    if (params) {
        try {
            const resultado = yield registro_destinatario_1.dbregistro_destinatario.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_registro_destinatario: id_registro_destinatario
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMasterregistro_destinatario)(id_usuario, id_registro_destinatario, estatus, descripcion);
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
            msg: 'Registro de la tabla : registro_destinatario  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcionregistro_destinatario = actualizarEstatusDescripcionregistro_destinatario;
const actualizarDesactivadoregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield registro_destinatario_1.dbregistro_destinatario.findOne({ where: { id_registro_destinatario: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield registro_destinatario_1.dbregistro_destinatario.update({
            activo: 1,
        }, {
            where: {
                id_registro_destinatario: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialregistro_destinatario)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialregistro_destinatario)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadoregistro_destinatario = actualizarDesactivadoregistro_destinatario;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialregistro_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialregistro_destinatario_1.dbhistorialregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_cat_destinatario: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialregistro_destinatario = ActualDesactivadoHistorialregistro_destinatario;
//Desactivar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialregistro_destinatario = (id_usuario, id_registro_destinatario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            id_registro_destinatario: id_registro_destinatario,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_registro_destinatario,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialregistro_destinatario = ActualDesactivadoMasterHistorialregistro_destinatario;
