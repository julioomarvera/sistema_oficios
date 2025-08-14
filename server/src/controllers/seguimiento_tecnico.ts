import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbseguimiento_tecnico } from '../models/seguimiento_tecnico'; 
import { dbhistorialseguimiento_tecnico } from '../models/historialseguimiento_tecnico'; 
import { dbhistorialMasterseguimiento_tecnico } from '../models/historialMasterseguimiento_tecnico'; 
const { Sequelize, DataTypes } = require('sequelize'); 
import {dbtecnico} from '../models/tecnico'; 

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
export const getAllseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listseguimiento_tecnico :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         {
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listseguimiento_tecnico    = await  dbseguimiento_tecnico.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listseguimiento_tecnico= await  dbseguimiento_tecnico.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbtecnico,
            }],
            attributes: [
               'id_seguimiento_tecnico',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_tecnico.id_tecnico'),'id_tecnico'],
               [Sequelize.col('ws_tecnico.id_gestion_oficio'),'id_gestion_oficio'],
               [Sequelize.col('ws_tecnico.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_tecnico.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_tecnico.id_direcion_firmante'),'id_direcion_firmante'],
               [Sequelize.col('ws_tecnico.text_direccion_firmante'),'text_direccion_firmante'],
               [Sequelize.col('ws_tecnico.id_area_firmante'),'id_area_firmante'],
               [Sequelize.col('ws_tecnico.text_area_firmante'),'text_area_firmante'],
               [Sequelize.col('ws_tecnico.numero_empleado_firmante'),'numero_empleado_firmante'],
               [Sequelize.col('ws_tecnico.id_direccion_asignacion'),'id_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.text_direccion_asignacion'),'text_direccion_asignacion'],
               [Sequelize.col('ws_tecnico.id_area_asignacion'),'id_area_asignacion'],
               [Sequelize.col('ws_tecnico.text_area_asignacion'),'text_area_asignacion'],
               [Sequelize.col('ws_tecnico.numero_empleado_asignacion'),'numero_empleado_asignacion'],
               [Sequelize.col('ws_tecnico.fecha_asignacion'),'fecha_asignacion'],
               [Sequelize.col('ws_tecnico.estatus_seguimiento'),'estatus_seguimiento'],
               [Sequelize.col('ws_tecnico.observaciones'),'observaciones'],
               [Sequelize.col('ws_tecnico.porcentaje_seguimiento'),'porcentaje_seguimiento'],
               [Sequelize.col('ws_tecnico.fecha_contestacion'),'fecha_contestacion'],
               [Sequelize.col('ws_tecnico.evidencia'),'evidencia'],
               [Sequelize.col('ws_tecnico.documento_oficio'),'documento_oficio']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listseguimiento_tecnico); 
   if(id_usuario != null){ 
     HistorialgetAllseguimiento_tecnico(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findseguimiento_tecnico = await dbseguimiento_tecnico.findOne({ where: {  id_seguimiento_tecnico: id }}); 
   try { 
      if (findseguimiento_tecnico) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdseguimiento_tecnico(id_usuario,id); 
         } 
         return res.json(findseguimiento_tecnico) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los seguimiento_tecnico. ', 
         error 
      }); 
   }    
   console.log(findseguimiento_tecnico);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newseguimiento_tecnico = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbseguimiento_tecnico.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevotecnico' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_seguimiento_tecnico); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialseguimiento_tecnico(id_usuario,id); 
      NewHistorialMasterseguimiento_tecnico(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_tecnico--------------------------------------------------------------------------> 
export const updseguimiento_tecnico_id_tecnico = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_seguimiento_tecnico, id_tecnico, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbseguimiento_tecnico.findOne({ where: {  id_seguimiento_tecnico : id_seguimiento_tecnico } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbseguimiento_tecnico.update({ 
            id_usuario:id_usuario,
            id_tecnico:id_tecnico,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_seguimiento_tecnico : id_seguimiento_tecnico 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialseguimiento_tecnicoid_tecnico(id_usuario,id_tecnico); 
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
      msg: 'Registro de la tabla : seguimiento_tecnico  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro seguimiento_tecnico--------------------------------------------------------------------------> 
export const delseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbseguimiento_tecnico.findOne({ where: {id_seguimiento_tecnico : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbseguimiento_tecnico.update({
         activo : 0,
         },{
         where: {
            id_seguimiento_tecnico : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialseguimiento_tecnico(id_usuario,id); 
      DelMasterHistorialseguimiento_tecnico(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllseguimiento_tecnico = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialseguimiento_tecnico.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : seguimiento_tecnico',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdseguimiento_tecnico = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialseguimiento_tecnico.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: seguimiento_tecnico',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialseguimiento_tecnico = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialseguimiento_tecnico.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: seguimiento_tecnico',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialseguimiento_tecnicoid_tecnico = async (id_usuario:any,id_tecnico: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialseguimiento_tecnico.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: seguimiento_tecnico',
         id_tecnico ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialseguimiento_tecnico = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialseguimiento_tecnico.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: seguimiento_tecnico',
          id_tecnico :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMasterseguimiento_tecnico = async (id_seguimiento_tecnico:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMasterseguimiento_tecnico.create({ 
          id_usuario:id_usuario,
          id_seguimiento_tecnico:id_seguimiento_tecnico,
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
//Actualizar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterseguimiento_tecnico= async (id_usuario: any, id_seguimiento_tecnico:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterseguimiento_tecnico.create({ 
            id_usuario:id_usuario,
            id_seguimiento_tecnico,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
   export const DelMasterHistorialseguimiento_tecnico= async (id_usuario: any ,id_seguimiento_tecnico:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterseguimiento_tecnico.create({ 
            id_usuario:id_usuario,
            id_seguimiento_tecnico:id_seguimiento_tecnico,
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
export const actualizarEstatusDescripcionseguimiento_tecnico = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_seguimiento_tecnico,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbseguimiento_tecnico.findOne({ where: {  id_seguimiento_tecnico : id_seguimiento_tecnico } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbseguimiento_tecnico.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_seguimiento_tecnico : id_seguimiento_tecnico 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMasterseguimiento_tecnico(id_usuario,id_seguimiento_tecnico,estatus, descripcion);
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
      msg: 'Registro de la tabla : seguimiento_tecnico  ya almacenado', 
      }); 
   }
}
export const actualizarDesactivadoseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbseguimiento_tecnico.findOne({ where: {id_seguimiento_tecnico : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbseguimiento_tecnico.update({
         activo : 1,
         },{
         where: {
            id_seguimiento_tecnico : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialseguimiento_tecnico(id_usuario,id); 
      ActualDesactivadoMasterHistorialseguimiento_tecnico(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialseguimiento_tecnico = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialseguimiento_tecnico.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_tecnico :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialseguimiento_tecnico= async (id_usuario: any ,id_seguimiento_tecnico:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterseguimiento_tecnico.create({ 
            id_usuario:id_usuario,
            id_seguimiento_tecnico:id_seguimiento_tecnico,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_seguimiento_tecnico,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
