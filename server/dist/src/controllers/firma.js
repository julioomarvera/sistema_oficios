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
exports.ActualDesactivadoMasterHistorialfirma = exports.ActualDesactivadoHistorialfirma = exports.actualizarDesactivadofirma = exports.actualizarEstatusDescripcionfirma = exports.DelMasterHistorialfirma = exports.actualizarHistorialMasterfirma = exports.NewHistorialMasterfirma = exports.DelHistorialfirma = exports.UpdHistorialfirmaid_firma_coordinador = exports.NewHistorialfirma = exports.HistorialgetRegByIdfirma = exports.HistorialgetAllfirma = exports.delfirma = exports.updfirma_id_firma_coordinador = exports.newfirma = exports.getRegByIdfirma = exports.getAllfirma = exports.timeNow = void 0;
const firma_1 = require("../models/firma");
const historialfirma_1 = require("../models/historialfirma");
const historialMasterfirma_1 = require("../models/historialMasterfirma");
const { Sequelize, DataTypes } = require('sequelize');
const firma_coordinador_1 = require("../models/firma_coordinador");
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
const getAllfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listfirma = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listfirma = yield firma_1.dbfirma.findAll({
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listfirma = yield firma_1.dbfirma.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: firma_coordinador_1.dbfirma_coordinador,
                    }],
                attributes: [
                    'id_firma',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'), 'id_firma_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'), 'id_gestion_oficio'],
                    [Sequelize.col('ws_firma_coordinador.id_oficios'), 'id_oficios'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'), 'id_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'), 'text_direccion_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_area_coordinador'), 'id_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.text_area_coordinador'), 'text_area_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'), 'id_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'), 'text_direccion_peticion'],
                    [Sequelize.col('ws_firma_coordinador.id_area_peticion'), 'id_area_peticion'],
                    [Sequelize.col('ws_firma_coordinador.area_text_peticion'), 'area_text_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'), 'numero_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'), 'nombre_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'), 'foto_empleado_coordinador'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'), 'numero_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'), 'nombre_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'), 'foto_empleado_peticion'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'), 'numero_empleado_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.nombre_secretaria'), 'nombre_secretaria'],
                    [Sequelize.col('ws_firma_coordinador.foto_secretario'), 'foto_secretario'],
                    [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'), 'numero_empleado_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.nombre_tecnico'), 'nombre_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.foto_tecnico'), 'foto_tecnico'],
                    [Sequelize.col('ws_firma_coordinador.numero_oficio'), 'numero_oficio'],
                    [Sequelize.col('ws_firma_coordinador.numero_contestacion'), 'numero_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.archivo_oficio'), 'archivo_oficio'],
                    [Sequelize.col('ws_firma_coordinador.archivo_sello'), 'archivo_sello'],
                    [Sequelize.col('ws_firma_coordinador.archivo_evidencia'), 'archivo_evidencia'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'), 'archivo_contestacion_pdf'],
                    [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'), 'archivo_contestacion_digital'],
                    [Sequelize.col('ws_firma_coordinador.asunto'), 'asunto'],
                    [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'), 'descripcion_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.visto'), 'visto'],
                    [Sequelize.col('ws_firma_coordinador.fecha_contestacion'), 'fecha_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.fecha_terminacion'), 'fecha_terminacion'],
                    [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'), 'tiempo_efectivo_contestacion'],
                    [Sequelize.col('ws_firma_coordinador.otro'), 'otro']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listfirma);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllfirma)(id_usuario);
    }
});
exports.getAllfirma = getAllfirma;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findfirma = yield firma_1.dbfirma.findOne({ where: { id_firma: id } });
    try {
        if (findfirma) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdfirma)(id_usuario, id);
            }
            return res.json(findfirma);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los firma. ',
            error
        });
    }
    console.log(findfirma);
});
exports.getRegByIdfirma = getRegByIdfirma;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield firma_1.dbfirma.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevofirma_coordinador',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_firma);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialfirma)(id_usuario, id);
        (0, exports.NewHistorialMasterfirma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newfirma = newfirma;
//Actualizar el parametro con Id de : id_firma_coordinador--------------------------------------------------------------------------> 
const updfirma_id_firma_coordinador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_firma, id_firma_coordinador, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield firma_1.dbfirma.findOne({ where: { id_firma: id_firma } });
    if (params) {
        try {
            const resultado = yield firma_1.dbfirma.update({
                id_usuario: id_usuario,
                id_firma_coordinador: id_firma_coordinador,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_firma: id_firma
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialfirmaid_firma_coordinador)(id_usuario, id_firma_coordinador);
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
            msg: 'Registro de la tabla : firma  ya almacenado',
        });
    }
});
exports.updfirma_id_firma_coordinador = updfirma_id_firma_coordinador;
//Eliminar un Parametro firma--------------------------------------------------------------------------> 
const delfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield firma_1.dbfirma.findOne({ where: { id_firma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield firma_1.dbfirma.update({
            activo: 0,
        }, {
            where: {
                id_firma: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialfirma)(id_usuario, id);
        (0, exports.DelMasterHistorialfirma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delfirma = delfirma;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllfirma = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_1.dbhistorialfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllfirma = HistorialgetAllfirma;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdfirma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_1.dbhistorialfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdfirma = HistorialgetRegByIdfirma;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialfirma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_1.dbhistorialfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: firma',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialfirma = NewHistorialfirma;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialfirmaid_firma_coordinador = (id_usuario, id_firma_coordinador) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_1.dbhistorialfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: firma',
            id_firma_coordinador,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialfirmaid_firma_coordinador = UpdHistorialfirmaid_firma_coordinador;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialfirma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_1.dbhistorialfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: firma',
            id_firma_coordinador: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialfirma = DelHistorialfirma;
//almacenar en la tabla Historial Master firma ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMasterfirma = (id_firma, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
            id_usuario: id_usuario,
            id_firma: id_firma,
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
exports.NewHistorialMasterfirma = NewHistorialMasterfirma;
//Actualizar en la tabla Historial Master firma ----------------------------------------------------------------------> 
const actualizarHistorialMasterfirma = (id_usuario, id_firma, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
            id_usuario: id_usuario,
            id_firma,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterfirma = actualizarHistorialMasterfirma;
//Desactivar en la tabla Historial Master firma ----------------------------------------------------------------------> 
const DelMasterHistorialfirma = (id_usuario, id_firma) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
            id_usuario: id_usuario,
            id_firma: id_firma,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialfirma = DelMasterHistorialfirma;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcionfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_firma, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield firma_1.dbfirma.findOne({ where: { id_firma: id_firma } });
    if (params) {
        try {
            const resultado = yield firma_1.dbfirma.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_firma: id_firma
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMasterfirma)(id_usuario, id_firma, estatus, descripcion);
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
            msg: 'Registro de la tabla : firma  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcionfirma = actualizarEstatusDescripcionfirma;
const actualizarDesactivadofirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield firma_1.dbfirma.findOne({ where: { id_firma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield firma_1.dbfirma.update({
            activo: 1,
        }, {
            where: {
                id_firma: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialfirma)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialfirma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadofirma = actualizarDesactivadofirma;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialfirma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_1.dbhistorialfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_firma_coordinador: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialfirma = ActualDesactivadoHistorialfirma;
//Desactivar en la tabla Historial Master firma ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialfirma = (id_usuario, id_firma) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
            id_usuario: id_usuario,
            id_firma: id_firma,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_firma,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialfirma = ActualDesactivadoMasterHistorialfirma;
