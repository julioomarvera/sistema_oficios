import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbfirma } from '../models/firma'; 
import { dbhistorialfirma } from '../models/historialfirma'; 
import { dbhistorialMasterfirma } from '../models/historialMasterfirma'; 
const { Sequelize, DataTypes } = require('sequelize'); 
import {dbfirma_coordinador} from '../models/firma_coordinador'; 

//extraer la hora para el sistema //-------------------------------------------------------------> 

export const timeNow = () => { 
   const now = new Date(); // Jul 2021 Friday 
   const fecha = (now.toLocaleString('en-US', { timeZone: 'America/Mexico_City', dateStyle: 'short', timeStyle: 'short'}));
   let d = new Date()    
   let add30Minutes = new Date(   
      // add 30 minutes  
       d.getFullYear(),  
       d.getMonth(),     
       d.getDate(),      
       d.getUTCHours(),  
      (d.getMinutes()), // add 30 minutes, 
       d.getSeconds(),  
       d.getMilliseconds(),
   ) 
 // ISO formatted UTC timestamp 
 // timezone is always zero UTC offset, as denoted by the suffix 'Z' 
 let isoString = add30Minutes.toISOString(); 
 // MySQL formatted UTC timestamp: YYYY-MM-DD HH:MM:SS 
 let mySqlTimestamp = isoString.slice(0, 19).replace('T', ' ') 
 return isoString; 
} 
//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getAllfirma = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listfirma :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listfirma= await  dbfirma.findAll(
         {
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listfirma    = await  dbfirma.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listfirma= await  dbfirma.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbfirma_coordinador,
            }],
            attributes: [
               'id_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_firma_coordinador.id_firma_coordinador'),'id_firma_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_firma_coordinador.id_oficios'),'id_oficios'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_coordinador'),'id_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_coordinador'),'text_direccion_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_area_coordinador'),'id_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.text_area_coordinador'),'text_area_coordinador'],
               [Sequelize.col('ws_firma_coordinador.id_direccion_peticion'),'id_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.text_direccion_peticion'),'text_direccion_peticion'],
               [Sequelize.col('ws_firma_coordinador.id_area_peticion'),'id_area_peticion'],
               [Sequelize.col('ws_firma_coordinador.area_text_peticion'),'area_text_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_coordinador'),'numero_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_coordinador'),'nombre_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_coordinador'),'foto_empleado_coordinador'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_peticion'),'numero_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.nombre_empleado_peticion'),'nombre_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.foto_empleado_peticion'),'foto_empleado_peticion'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_secretaria'),'numero_empleado_secretaria'],
               [Sequelize.col('ws_firma_coordinador.nombre_secretaria'),'nombre_secretaria'],
               [Sequelize.col('ws_firma_coordinador.foto_secretario'),'foto_secretario'],
               [Sequelize.col('ws_firma_coordinador.numero_empleado_tecnico'),'numero_empleado_tecnico'],
               [Sequelize.col('ws_firma_coordinador.nombre_tecnico'),'nombre_tecnico'],
               [Sequelize.col('ws_firma_coordinador.foto_tecnico'),'foto_tecnico'],
               [Sequelize.col('ws_firma_coordinador.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_firma_coordinador.numero_contestacion'),'numero_contestacion'],
               [Sequelize.col('ws_firma_coordinador.archivo_oficio'),'archivo_oficio'],
               [Sequelize.col('ws_firma_coordinador.archivo_sello'),'archivo_sello'],
               [Sequelize.col('ws_firma_coordinador.archivo_evidencia'),'archivo_evidencia'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_pdf'),'archivo_contestacion_pdf'],
               [Sequelize.col('ws_firma_coordinador.archivo_contestacion_digital'),'archivo_contestacion_digital'],
               [Sequelize.col('ws_firma_coordinador.asunto'),'asunto'],
               [Sequelize.col('ws_firma_coordinador.descripcion_contestacion'),'descripcion_contestacion'],
               [Sequelize.col('ws_firma_coordinador.visto'),'visto'],
               [Sequelize.col('ws_firma_coordinador.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_firma_coordinador.fecha_terminacion'),'fecha_terminacion'],
               [Sequelize.col('ws_firma_coordinador.tiempo_efectivo_contestacion'),'tiempo_efectivo_contestacion'],
               [Sequelize.col('ws_firma_coordinador.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listfirma); 
   if(id_usuario != null){ 
     HistorialgetAllfirma(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdfirma = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findfirma = await dbfirma.findOne({ where: {  id_firma: id }}); 
   try { 
      if (findfirma) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdfirma(id_usuario,id); 
         } 
         return res.json(findfirma) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los firma. ', 
         error 
      }); 
   }    
   console.log(findfirma);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newfirma = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbfirma.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevofirma_coordinador' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_firma); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialfirma(id_usuario,id); 
      NewHistorialMasterfirma(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_firma_coordinador--------------------------------------------------------------------------> 
export const updfirma_id_firma_coordinador = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_firma, id_firma_coordinador, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbfirma.findOne({ where: {  id_firma : id_firma } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbfirma.update({ 
            id_usuario:id_usuario,
            id_firma_coordinador:id_firma_coordinador,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_firma : id_firma 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialfirmaid_firma_coordinador(id_usuario,id_firma_coordinador); 
      }
      catch (error) {
         res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
            error 
         }); 
      }
   } 
   else{ 
      return res.status(404).json({ 
      msg: 'Registro de la tabla : firma  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro firma--------------------------------------------------------------------------> 
export const delfirma = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbfirma.findOne({ where: {id_firma : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbfirma.update({
         activo : 0,
         },{
         where: {
            id_firma : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialfirma(id_usuario,id); 
      DelMasterHistorialfirma(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllfirma = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : firma',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdfirma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialfirma.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: firma',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialfirma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialfirma.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: firma',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialfirmaid_firma_coordinador = async (id_usuario:any,id_firma_coordinador: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialfirma.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: firma',
         id_firma_coordinador ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialfirma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: firma',
          id_firma_coordinador :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master firma ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMasterfirma = async (id_firma:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMasterfirma.create({ 
          id_usuario:id_usuario,
          id_firma:id_firma,
          estatus:1,
          activo:1,
          accion:'El usuario dio de alta el registro',
          createdAt:time, 
          updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar en la tabla Historial Master firma ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterfirma= async (id_usuario: any, id_firma:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterfirma.create({ 
            id_usuario:id_usuario,
            id_firma,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master firma ----------------------------------------------------------------------> 
   export const DelMasterHistorialfirma= async (id_usuario: any ,id_firma:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterfirma.create({ 
            id_usuario:id_usuario,
            id_firma:id_firma,
            activo:0,
            accion:'El usuario elimino el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
export const actualizarEstatusDescripcionfirma = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_firma,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbfirma.findOne({ where: {  id_firma : id_firma } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbfirma.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_firma : id_firma 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMasterfirma(id_usuario,id_firma,estatus, descripcion);
      }
      catch (error) {
         res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
            error 
         }); 
      }
   } 
   else{ 
      return res.status(404).json({ 
      msg: 'Registro de la tabla : firma  ya almacenado', 
      }); 
   }
}
export const actualizarDesactivadofirma = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbfirma.findOne({ where: {id_firma : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbfirma.update({
         activo : 1,
         },{
         where: {
            id_firma : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialfirma(id_usuario,id); 
      ActualDesactivadoMasterHistorialfirma(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialfirma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_firma_coordinador :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master firma ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialfirma= async (id_usuario: any ,id_firma:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterfirma.create({ 
            id_usuario:id_usuario,
            id_firma:id_firma,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_firma,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
