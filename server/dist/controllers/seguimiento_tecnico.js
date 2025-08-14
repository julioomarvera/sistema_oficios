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
exports.ActualDesactivadoMasterHistorialseguimiento_tecnico = exports.ActualDesactivadoHistorialseguimiento_tecnico = exports.actualizarDesactivadoseguimiento_tecnico = exports.actualizarEstatusDescripcionseguimiento_tecnico = exports.DelMasterHistorialseguimiento_tecnico = exports.actualizarHistorialMasterseguimiento_tecnico = exports.NewHistorialMasterseguimiento_tecnico = exports.DelHistorialseguimiento_tecnico = exports.UpdHistorialseguimiento_tecnicoid_tecnico = exports.NewHistorialseguimiento_tecnico = exports.HistorialgetRegByIdseguimiento_tecnico = exports.HistorialgetAllseguimiento_tecnico = exports.delseguimiento_tecnico = exports.updseguimiento_tecnico_id_tecnico = exports.newseguimiento_tecnico = exports.getRegByIdseguimiento_tecnico = exports.getAllseguimiento_tecnico = exports.timeNow = void 0;
const seguimiento_tecnico_1 = require("../models/seguimiento_tecnico");
const historialseguimiento_tecnico_1 = require("../models/historialseguimiento_tecnico");
const historialMasterseguimiento_tecnico_1 = require("../models/historialMasterseguimiento_tecnico");
const { Sequelize, DataTypes } = require('sequelize');
const tecnico_1 = require("../models/tecnico");
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
const getAllseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listseguimiento_tecnico = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: tecnico_1.dbtecnico,
                    }],
                attributes: [
                    'id_seguimiento_tecnico',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_tecnico.id_tecnico'), 'id_tecnico'],
                    [Sequelize.col('ws_tecnico.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_tecnico.id_oficio'), 'id_oficio'],
                    [Sequelize.col('ws_tecnico.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_tecnico.id_direcion_firmante'), 'id_direcion_firmante'],
                    [Sequelize.col('ws_tecnico.text_direccion_firmante'), 'text_direccion_firmante'],
                    [Sequelize.col('ws_tecnico.id_area_firmante'), 'id_area_firmante'],
                    [Sequelize.col('ws_tecnico.text_area_firmante'), 'text_area_firmante'],
                    [Sequelize.col('ws_tecnico.numero_empleado_firmante'), 'numero_empleado_firmante'],
                    [Sequelize.col('ws_tecnico.id_direccion_asignacion'), 'id_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.text_direccion_asignacion'), 'text_direccion_asignacion'],
                    [Sequelize.col('ws_tecnico.id_area_asignacion'), 'id_area_asignacion'],
                    [Sequelize.col('ws_tecnico.text_area_asignacion'), 'text_area_asignacion'],
                    [Sequelize.col('ws_tecnico.numero_empleado_asignacion'), 'numero_empleado_asignacion'],
                    [Sequelize.col('ws_tecnico.fecha_asignacion'), 'fecha_asignacion'],
                    [Sequelize.col('ws_tecnico.estatus_seguimiento'), 'estatus_seguimiento'],
                    [Sequelize.col('ws_tecnico.observaciones'), 'observaciones'],
                    [Sequelize.col('ws_tecnico.porcentaje_seguimiento'), 'porcentaje_seguimiento'],
                    [Sequelize.col('ws_tecnico.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_tecnico.evidencia'), 'evidencia'],
                    [Sequelize.col('ws_tecnico.documento_oficio'), 'documento_oficio']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listseguimiento_tecnico);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllseguimiento_tecnico)(id_usuario);
    }
});
exports.getAllseguimiento_tecnico = getAllseguimiento_tecnico;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findseguimiento_tecnico = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findOne({ where: { id_seguimiento_tecnico: id } });
    try {
        if (findseguimiento_tecnico) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdseguimiento_tecnico)(id_usuario, id);
            }
            return res.json(findseguimiento_tecnico);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los seguimiento_tecnico. ',
            error
        });
    }
    console.log(findseguimiento_tecnico);
});
exports.getRegByIdseguimiento_tecnico = getRegByIdseguimiento_tecnico;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield seguimiento_tecnico_1.dbseguimiento_tecnico.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevotecnico',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_seguimiento_tecnico);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialseguimiento_tecnico)(id_usuario, id);
        (0, exports.NewHistorialMasterseguimiento_tecnico)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newseguimiento_tecnico = newseguimiento_tecnico;
//Actualizar el parametro con Id de : id_tecnico--------------------------------------------------------------------------> 
const updseguimiento_tecnico_id_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_seguimiento_tecnico, id_tecnico, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findOne({ where: { id_seguimiento_tecnico: id_seguimiento_tecnico } });
    if (params) {
        try {
            const resultado = yield seguimiento_tecnico_1.dbseguimiento_tecnico.update({
                id_usuario: id_usuario,
                id_tecnico: id_tecnico,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_seguimiento_tecnico: id_seguimiento_tecnico
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialseguimiento_tecnicoid_tecnico)(id_usuario, id_tecnico);
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
            msg: 'Registro de la tabla : seguimiento_tecnico  ya almacenado',
        });
    }
});
exports.updseguimiento_tecnico_id_tecnico = updseguimiento_tecnico_id_tecnico;
//Eliminar un Parametro seguimiento_tecnico--------------------------------------------------------------------------> 
const delseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findOne({ where: { id_seguimiento_tecnico: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield seguimiento_tecnico_1.dbseguimiento_tecnico.update({
            activo: 0,
        }, {
            where: {
                id_seguimiento_tecnico: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialseguimiento_tecnico)(id_usuario, id);
        (0, exports.DelMasterHistorialseguimiento_tecnico)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delseguimiento_tecnico = delseguimiento_tecnico;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllseguimiento_tecnico = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialseguimiento_tecnico_1.dbhistorialseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : seguimiento_tecnico',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllseguimiento_tecnico = HistorialgetAllseguimiento_tecnico;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdseguimiento_tecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialseguimiento_tecnico_1.dbhistorialseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: seguimiento_tecnico',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdseguimiento_tecnico = HistorialgetRegByIdseguimiento_tecnico;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialseguimiento_tecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialseguimiento_tecnico_1.dbhistorialseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: seguimiento_tecnico',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialseguimiento_tecnico = NewHistorialseguimiento_tecnico;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialseguimiento_tecnicoid_tecnico = (id_usuario, id_tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialseguimiento_tecnico_1.dbhistorialseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: seguimiento_tecnico',
            id_tecnico,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialseguimiento_tecnicoid_tecnico = UpdHistorialseguimiento_tecnicoid_tecnico;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialseguimiento_tecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialseguimiento_tecnico_1.dbhistorialseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: seguimiento_tecnico',
            id_tecnico: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialseguimiento_tecnico = DelHistorialseguimiento_tecnico;
//almacenar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMasterseguimiento_tecnico = (id_seguimiento_tecnico, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
            id_usuario: id_usuario,
            id_seguimiento_tecnico: id_seguimiento_tecnico,
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
exports.NewHistorialMasterseguimiento_tecnico = NewHistorialMasterseguimiento_tecnico;
//Actualizar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
const actualizarHistorialMasterseguimiento_tecnico = (id_usuario, id_seguimiento_tecnico, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
            id_usuario: id_usuario,
            id_seguimiento_tecnico,
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
const DelMasterHistorialseguimiento_tecnico = (id_usuario, id_seguimiento_tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
            id_usuario: id_usuario,
            id_seguimiento_tecnico: id_seguimiento_tecnico,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialseguimiento_tecnico = DelMasterHistorialseguimiento_tecnico;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcionseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_seguimiento_tecnico, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findOne({ where: { id_seguimiento_tecnico: id_seguimiento_tecnico } });
    if (params) {
        try {
            const resultado = yield seguimiento_tecnico_1.dbseguimiento_tecnico.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_seguimiento_tecnico: id_seguimiento_tecnico
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMasterseguimiento_tecnico)(id_usuario, id_seguimiento_tecnico, estatus, descripcion);
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
            msg: 'Registro de la tabla : seguimiento_tecnico  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcionseguimiento_tecnico = actualizarEstatusDescripcionseguimiento_tecnico;
const actualizarDesactivadoseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield seguimiento_tecnico_1.dbseguimiento_tecnico.findOne({ where: { id_seguimiento_tecnico: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield seguimiento_tecnico_1.dbseguimiento_tecnico.update({
            activo: 1,
        }, {
            where: {
                id_seguimiento_tecnico: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialseguimiento_tecnico)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialseguimiento_tecnico)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadoseguimiento_tecnico = actualizarDesactivadoseguimiento_tecnico;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialseguimiento_tecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialseguimiento_tecnico_1.dbhistorialseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_tecnico: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialseguimiento_tecnico = ActualDesactivadoHistorialseguimiento_tecnico;
//Desactivar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialseguimiento_tecnico = (id_usuario, id_seguimiento_tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
            id_usuario: id_usuario,
            id_seguimiento_tecnico: id_seguimiento_tecnico,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_seguimiento_tecnico,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialseguimiento_tecnico = ActualDesactivadoMasterHistorialseguimiento_tecnico;
