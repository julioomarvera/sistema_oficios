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
exports.ActualDesactivadoMasterHistorialusuarios_opdm = exports.ActualDesactivadoHistorialusuarios_opdm = exports.actualizarDesactivadousuarios_opdm = exports.actualizarEstatusDescripcionusuarios_opdm = exports.DelMasterHistorialusuarios_opdm = exports.actualizarHistorialMasterusuarios_opdm = exports.NewHistorialMasterusuarios_opdm = exports.DelHistorialusuarios_opdm = exports.UpdHistorialusuarios_opdmid_users_opdm = exports.NewHistorialusuarios_opdm = exports.HistorialgetRegByIdusuarios_opdm = exports.HistorialgetAllusuarios_opdm = exports.delusuarios_opdm = exports.updusuarios_opdm_id_users_opdm = exports.newusuarios_opdm = exports.getRegByIdusuarios_opdm = exports.getAllusuarios_opdm = exports.timeNow = void 0;
const usuarios_opdm_1 = require("../models/usuarios_opdm");
const historialusuarios_opdm_1 = require("../models/historialusuarios_opdm");
const historialMasterusuarios_opdm_1 = require("../models/historialMasterusuarios_opdm");
const { Sequelize, DataTypes } = require('sequelize');
const users_opdm_1 = require("../models/users_opdm");
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
const getAllusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listusuarios_opdm = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: users_opdm_1.dbusers_opdm,
                    }],
                attributes: [
                    'id_usuarios_opdm',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_users_opdm.id_users_opdm'), 'id_users_opdm'],
                    [Sequelize.col('ws_users_opdm.id_roll'), 'id_roll'],
                    [Sequelize.col('ws_users_opdm.usuario'), 'usuario'],
                    [Sequelize.col('ws_users_opdm.clave'), 'clave'],
                    [Sequelize.col('ws_users_opdm.nombre'), 'nombre'],
                    [Sequelize.col('ws_users_opdm.apepa'), 'apepa'],
                    [Sequelize.col('ws_users_opdm.apema'), 'apema'],
                    [Sequelize.col('ws_users_opdm.genero'), 'genero'],
                    [Sequelize.col('ws_users_opdm.correo'), 'correo'],
                    [Sequelize.col('ws_users_opdm.telefono'), 'telefono'],
                    [Sequelize.col('ws_users_opdm.fec_ingreso'), 'fec_ingreso'],
                    [Sequelize.col('ws_users_opdm.imp'), 'imp'],
                    [Sequelize.col('ws_users_opdm.edit'), 'edit'],
                    [Sequelize.col('ws_users_opdm.elim'), 'elim'],
                    [Sequelize.col('ws_users_opdm.nuev'), 'nuev'],
                    [Sequelize.col('ws_users_opdm.img'), 'img'],
                    [Sequelize.col('ws_users_opdm.id_direccion'), 'id_direccion'],
                    [Sequelize.col('ws_users_opdm.texto_direccion'), 'texto_direccion'],
                    [Sequelize.col('ws_users_opdm.id_area'), 'id_area'],
                    [Sequelize.col('ws_users_opdm.texto_area'), 'texto_area'],
                    [Sequelize.col('ws_users_opdm.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_users_opdm.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listusuarios_opdm);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllusuarios_opdm)(id_usuario);
    }
});
exports.getAllusuarios_opdm = getAllusuarios_opdm;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findusuarios_opdm = yield usuarios_opdm_1.dbusuarios_opdm.findOne({ where: { id_usuarios_opdm: id } });
    try {
        if (findusuarios_opdm) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdusuarios_opdm)(id_usuario, id);
            }
            return res.json(findusuarios_opdm);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los usuarios_opdm. ',
            error
        });
    }
    console.log(findusuarios_opdm);
});
exports.getRegByIdusuarios_opdm = getRegByIdusuarios_opdm;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield usuarios_opdm_1.dbusuarios_opdm.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevousers_opdm',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_usuarios_opdm);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialusuarios_opdm)(id_usuario, id);
        (0, exports.NewHistorialMasterusuarios_opdm)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newusuarios_opdm = newusuarios_opdm;
//Actualizar el parametro con Id de : id_users_opdm--------------------------------------------------------------------------> 
const updusuarios_opdm_id_users_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_usuarios_opdm, id_users_opdm, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield usuarios_opdm_1.dbusuarios_opdm.findOne({ where: { id_usuarios_opdm: id_usuarios_opdm } });
    if (params) {
        try {
            const resultado = yield usuarios_opdm_1.dbusuarios_opdm.update({
                id_usuario: id_usuario,
                id_users_opdm: id_users_opdm,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_usuarios_opdm: id_usuarios_opdm
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialusuarios_opdmid_users_opdm)(id_usuario, id_users_opdm);
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
            msg: 'Registro de la tabla : usuarios_opdm  ya almacenado',
        });
    }
});
exports.updusuarios_opdm_id_users_opdm = updusuarios_opdm_id_users_opdm;
//Eliminar un Parametro usuarios_opdm--------------------------------------------------------------------------> 
const delusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield usuarios_opdm_1.dbusuarios_opdm.findOne({ where: { id_usuarios_opdm: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield usuarios_opdm_1.dbusuarios_opdm.update({
            activo: 0,
        }, {
            where: {
                id_usuarios_opdm: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialusuarios_opdm)(id_usuario, id);
        (0, exports.DelMasterHistorialusuarios_opdm)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delusuarios_opdm = delusuarios_opdm;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllusuarios_opdm = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusuarios_opdm_1.dbhistorialusuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : usuarios_opdm',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllusuarios_opdm = HistorialgetAllusuarios_opdm;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdusuarios_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusuarios_opdm_1.dbhistorialusuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: usuarios_opdm',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdusuarios_opdm = HistorialgetRegByIdusuarios_opdm;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialusuarios_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusuarios_opdm_1.dbhistorialusuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: usuarios_opdm',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialusuarios_opdm = NewHistorialusuarios_opdm;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialusuarios_opdmid_users_opdm = (id_usuario, id_users_opdm) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusuarios_opdm_1.dbhistorialusuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: usuarios_opdm',
            id_users_opdm,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialusuarios_opdmid_users_opdm = UpdHistorialusuarios_opdmid_users_opdm;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialusuarios_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusuarios_opdm_1.dbhistorialusuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: usuarios_opdm',
            id_users_opdm: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialusuarios_opdm = DelHistorialusuarios_opdm;
//almacenar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMasterusuarios_opdm = (id_usuarios_opdm, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
            id_usuario: id_usuario,
            id_usuarios_opdm: id_usuarios_opdm,
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
exports.NewHistorialMasterusuarios_opdm = NewHistorialMasterusuarios_opdm;
//Actualizar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
const actualizarHistorialMasterusuarios_opdm = (id_usuario, id_usuarios_opdm, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
            id_usuario: id_usuario,
            id_usuarios_opdm,
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
const DelMasterHistorialusuarios_opdm = (id_usuario, id_usuarios_opdm) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
            id_usuario: id_usuario,
            id_usuarios_opdm: id_usuarios_opdm,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialusuarios_opdm = DelMasterHistorialusuarios_opdm;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcionusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuarios_opdm, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield usuarios_opdm_1.dbusuarios_opdm.findOne({ where: { id_usuarios_opdm: id_usuarios_opdm } });
    if (params) {
        try {
            const resultado = yield usuarios_opdm_1.dbusuarios_opdm.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_usuarios_opdm: id_usuarios_opdm
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMasterusuarios_opdm)(id_usuario, id_usuarios_opdm, estatus, descripcion);
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
            msg: 'Registro de la tabla : usuarios_opdm  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcionusuarios_opdm = actualizarEstatusDescripcionusuarios_opdm;
const actualizarDesactivadousuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield usuarios_opdm_1.dbusuarios_opdm.findOne({ where: { id_usuarios_opdm: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield usuarios_opdm_1.dbusuarios_opdm.update({
            activo: 1,
        }, {
            where: {
                id_usuarios_opdm: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialusuarios_opdm)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialusuarios_opdm)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadousuarios_opdm = actualizarDesactivadousuarios_opdm;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialusuarios_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialusuarios_opdm_1.dbhistorialusuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_users_opdm: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialusuarios_opdm = ActualDesactivadoHistorialusuarios_opdm;
//Desactivar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialusuarios_opdm = (id_usuario, id_usuarios_opdm) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
            id_usuario: id_usuario,
            id_usuarios_opdm: id_usuarios_opdm,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_usuarios_opdm,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialusuarios_opdm = ActualDesactivadoMasterHistorialusuarios_opdm;
