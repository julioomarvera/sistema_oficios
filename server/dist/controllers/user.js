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
exports.ActualDesactivadoMasterHistorialuser = exports.ActualDesactivadoHistorialuser = exports.actualizarDesactivadouser = exports.actualizarEstatusDescripcionuser = exports.DelMasterHistorialuser = exports.actualizarHistorialMasteruser = exports.NewHistorialMasteruser = exports.DelHistorialuser = exports.UpdHistorialuserid_users = exports.NewHistorialuser = exports.HistorialgetRegByIduser = exports.HistorialgetAlluser = exports.deluser = exports.upduser_id_users = exports.newuser = exports.getRegByIduser = exports.getAlluser = exports.timeNow = void 0;
const user_1 = require("../models/user");
const historialuser_1 = require("../models/historialuser");
const historialMasteruser_1 = require("../models/historialMasteruser");
const { Sequelize, DataTypes } = require('sequelize');
const users_1 = require("../models/users");
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
const getAlluser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listuser = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listuser = yield user_1.dbuser.findAll({
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listuser = yield user_1.dbuser.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listuser = yield user_1.dbuser.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: users_1.dbusers,
                    }],
                attributes: [
                    'id_user',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users.id_users'), 'id_users'],
                    [Sequelize.col('ws_users.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users.usuario'), 'usuario'],
                    [Sequelize.col('ws_users.clave'), 'clave'],
                    [Sequelize.col('ws_users.nombre'), 'nombre'],
                    [Sequelize.col('ws_users.apepa'), 'apepa'],
                    [Sequelize.col('ws_users.apema'), 'apema'],
                    [Sequelize.col('ws_users.genero'), 'genero'],
                    [Sequelize.col('ws_users.correo'), 'correo'],
                    [Sequelize.col('ws_users.telefono'), 'telefono'],
                    [Sequelize.col('ws_users.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users.imp'), 'imp'],
                    [Sequelize.col('ws_users.edit'), 'edit'],
                    [Sequelize.col('ws_users.elim'), 'elim'],
                    [Sequelize.col('ws_users.nuev'), 'nuev'],
                    [Sequelize.col('ws_users.img'), 'img'],
                    [Sequelize.col('ws_users.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users.id_area'), 'id_area'],
                    [Sequelize.col('ws_users.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listuser);
    if (id_usuario != null) {
        (0, exports.HistorialgetAlluser)(id_usuario);
    }
});
exports.getAlluser = getAlluser;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIduser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const finduser = yield user_1.dbuser.findOne({ where: { id_user: id } });
    try {
        if (finduser) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIduser)(id_usuario, id);
            }
            return res.json(finduser);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los user. ',
            error
        });
    }
    console.log(finduser);
});
exports.getRegByIduser = getRegByIduser;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield user_1.dbuser.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevousers',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_user);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialuser)(id_usuario, id);
        (0, exports.NewHistorialMasteruser)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newuser = newuser;
//Actualizar el parametro con Id de : id_users--------------------------------------------------------------------------> 
const upduser_id_users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_user, id_users, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield user_1.dbuser.findOne({ where: { id_user: id_user } });
    if (params) {
        try {
            const resultado = yield user_1.dbuser.update({
                id_usuario: id_usuario,
                id_users: id_users,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_user: id_user
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialuserid_users)(id_usuario, id_users);
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
            msg: 'Registro de la tabla : user  ya almacenado',
        });
    }
});
exports.upduser_id_users = upduser_id_users;
//Eliminar un Parametro user--------------------------------------------------------------------------> 
const deluser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield user_1.dbuser.findOne({ where: { id_user: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield user_1.dbuser.update({
            activo: 0,
        }, {
            where: {
                id_user: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialuser)(id_usuario, id);
        (0, exports.DelMasterHistorialuser)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.deluser = deluser;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAlluser = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialuser_1.dbhistorialuser.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : user',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAlluser = HistorialgetAlluser;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIduser = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialuser_1.dbhistorialuser.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: user',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIduser = HistorialgetRegByIduser;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialuser = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialuser_1.dbhistorialuser.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: user',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialuser = NewHistorialuser;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialuserid_users = (id_usuario, id_users) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialuser_1.dbhistorialuser.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: user',
            id_users,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialuserid_users = UpdHistorialuserid_users;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialuser = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialuser_1.dbhistorialuser.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: user',
            id_users: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialuser = DelHistorialuser;
//almacenar en la tabla Historial Master user ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMasteruser = (id_user, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            id_user: id_user,
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
exports.NewHistorialMasteruser = NewHistorialMasteruser;
//Actualizar en la tabla Historial Master user ----------------------------------------------------------------------> 
const actualizarHistorialMasteruser = (id_usuario, id_user, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            id_user,
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
const DelMasterHistorialuser = (id_usuario, id_user) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            id_user: id_user,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialuser = DelMasterHistorialuser;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcionuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_user, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield user_1.dbuser.findOne({ where: { id_user: id_user } });
    if (params) {
        try {
            const resultado = yield user_1.dbuser.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_user: id_user
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMasteruser)(id_usuario, id_user, estatus, descripcion);
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
            msg: 'Registro de la tabla : user  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcionuser = actualizarEstatusDescripcionuser;
const actualizarDesactivadouser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield user_1.dbuser.findOne({ where: { id_user: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield user_1.dbuser.update({
            activo: 1,
        }, {
            where: {
                id_user: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialuser)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialuser)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadouser = actualizarDesactivadouser;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialuser = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialuser_1.dbhistorialuser.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_users: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialuser = ActualDesactivadoHistorialuser;
//Desactivar en la tabla Historial Master user ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialuser = (id_usuario, id_user) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            id_user: id_user,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_user,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialuser = ActualDesactivadoMasterHistorialuser;
