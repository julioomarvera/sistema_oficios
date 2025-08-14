import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbusuarios_opdm } from '../models/usuarios_opdm'; 
import { dbhistorialusuarios_opdm } from '../models/historialusuarios_opdm'; 
import { dbhistorialMasterusuarios_opdm } from '../models/historialMasterusuarios_opdm'; 
const { Sequelize, DataTypes } = require('sequelize'); 
import {dbusers_opdm} from '../models/users_opdm'; 

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
export const getAllusuarios_opdm = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listusuarios_opdm :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         {
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listusuarios_opdm    = await  dbusuarios_opdm.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listusuarios_opdm= await  dbusuarios_opdm.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbusers_opdm,
            }],
            attributes: [
               'id_usuarios_opdm',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_users_opdm.id_users_opdm'),'id_users_opdm'],
               [Sequelize.col('ws_users_opdm.id_roll'),'id_roll'],
               [Sequelize.col('ws_users_opdm.usuario'),'usuario'],
               [Sequelize.col('ws_users_opdm.clave'),'clave'],
               [Sequelize.col('ws_users_opdm.nombre'),'nombre'],
               [Sequelize.col('ws_users_opdm.apepa'),'apepa'],
               [Sequelize.col('ws_users_opdm.apema'),'apema'],
               [Sequelize.col('ws_users_opdm.genero'),'genero'],
               [Sequelize.col('ws_users_opdm.correo'),'correo'],
               [Sequelize.col('ws_users_opdm.telefono'),'telefono'],
               [Sequelize.col('ws_users_opdm.fec_ingreso'),'fec_ingreso'],
               [Sequelize.col('ws_users_opdm.imp'),'imp'],
               [Sequelize.col('ws_users_opdm.edit'),'edit'],
               [Sequelize.col('ws_users_opdm.elim'),'elim'],
               [Sequelize.col('ws_users_opdm.nuev'),'nuev'],
               [Sequelize.col('ws_users_opdm.img'),'img'],
               [Sequelize.col('ws_users_opdm.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_users_opdm.texto_direccion'),'texto_direccion'],
               [Sequelize.col('ws_users_opdm.id_area'),'id_area'],
               [Sequelize.col('ws_users_opdm.texto_area'),'texto_area'],
               [Sequelize.col('ws_users_opdm.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_users_opdm.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listusuarios_opdm); 
   if(id_usuario != null){ 
     HistorialgetAllusuarios_opdm(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdusuarios_opdm = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findusuarios_opdm = await dbusuarios_opdm.findOne({ where: {  id_usuarios_opdm: id }}); 
   try { 
      if (findusuarios_opdm) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdusuarios_opdm(id_usuario,id); 
         } 
         return res.json(findusuarios_opdm) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los usuarios_opdm. ', 
         error 
      }); 
   }    
   console.log(findusuarios_opdm);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newusuarios_opdm = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbusuarios_opdm.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevousers_opdm' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_usuarios_opdm); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialusuarios_opdm(id_usuario,id); 
      NewHistorialMasterusuarios_opdm(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_users_opdm--------------------------------------------------------------------------> 
export const updusuarios_opdm_id_users_opdm = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_usuarios_opdm, id_users_opdm, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbusuarios_opdm.findOne({ where: {  id_usuarios_opdm : id_usuarios_opdm } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbusuarios_opdm.update({ 
            id_usuario:id_usuario,
            id_users_opdm:id_users_opdm,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_usuarios_opdm : id_usuarios_opdm 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialusuarios_opdmid_users_opdm(id_usuario,id_users_opdm); 
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
      msg: 'Registro de la tabla : usuarios_opdm  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro usuarios_opdm--------------------------------------------------------------------------> 
export const delusuarios_opdm = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbusuarios_opdm.findOne({ where: {id_usuarios_opdm : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbusuarios_opdm.update({
         activo : 0,
         },{
         where: {
            id_usuarios_opdm : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialusuarios_opdm(id_usuario,id); 
      DelMasterHistorialusuarios_opdm(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllusuarios_opdm = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialusuarios_opdm.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : usuarios_opdm',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdusuarios_opdm = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialusuarios_opdm.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: usuarios_opdm',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialusuarios_opdm = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialusuarios_opdm.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: usuarios_opdm',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialusuarios_opdmid_users_opdm = async (id_usuario:any,id_users_opdm: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialusuarios_opdm.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: usuarios_opdm',
         id_users_opdm ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialusuarios_opdm = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialusuarios_opdm.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: usuarios_opdm',
          id_users_opdm :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMasterusuarios_opdm = async (id_usuarios_opdm:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMasterusuarios_opdm.create({ 
          id_usuario:id_usuario,
          id_usuarios_opdm:id_usuarios_opdm,
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
//Actualizar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterusuarios_opdm= async (id_usuario: any, id_usuarios_opdm:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterusuarios_opdm.create({ 
            id_usuario:id_usuario,
            id_usuarios_opdm,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
   export const DelMasterHistorialusuarios_opdm= async (id_usuario: any ,id_usuarios_opdm:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterusuarios_opdm.create({ 
            id_usuario:id_usuario,
            id_usuarios_opdm:id_usuarios_opdm,
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
export const actualizarEstatusDescripcionusuarios_opdm = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuarios_opdm,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbusuarios_opdm.findOne({ where: {  id_usuarios_opdm : id_usuarios_opdm } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbusuarios_opdm.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_usuarios_opdm : id_usuarios_opdm 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMasterusuarios_opdm(id_usuario,id_usuarios_opdm,estatus, descripcion);
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
      msg: 'Registro de la tabla : usuarios_opdm  ya almacenado', 
      }); 
   }
}
export const actualizarDesactivadousuarios_opdm = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbusuarios_opdm.findOne({ where: {id_usuarios_opdm : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbusuarios_opdm.update({
         activo : 1,
         },{
         where: {
            id_usuarios_opdm : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialusuarios_opdm(id_usuario,id); 
      ActualDesactivadoMasterHistorialusuarios_opdm(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialusuarios_opdm = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialusuarios_opdm.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_users_opdm :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialusuarios_opdm= async (id_usuario: any ,id_usuarios_opdm:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterusuarios_opdm.create({ 
            id_usuario:id_usuario,
            id_usuarios_opdm:id_usuarios_opdm,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_usuarios_opdm,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
