import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbevidencia_sello } from '../models/evidencia_sello'; 
import { dbhistorialevidencia_sello } from '../models/historialevidencia_sello'; 
import { dbhistorialMasterevidencia_sello } from '../models/historialMasterevidencia_sello'; 
const { Sequelize, DataTypes } = require('sequelize'); 
import {dbsello} from '../models/sello'; 

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
export const getAllevidencia_sello = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listevidencia_sello :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         {
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listevidencia_sello    = await  dbevidencia_sello.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listevidencia_sello= await  dbevidencia_sello.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbsello,
            }],
            attributes: [
               'id_evidencia_sello',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_sello.id_sello'),'id_sello'],
               [Sequelize.col('ws_sello.id_gestion_oficios'),'id_gestion_oficios'],
               [Sequelize.col('ws_sello.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_sello.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_sello.id_area'),'id_area'],
               [Sequelize.col('ws_sello.text_area'),'text_area'],
               [Sequelize.col('ws_sello.numero_oficio'),'numero_oficio'],
               [Sequelize.col('ws_sello.fecha_creacion'),'fecha_creacion'],
               [Sequelize.col('ws_sello.nombre_documento_oficio'),'nombre_documento_oficio'],
               [Sequelize.col('ws_sello.nombre_documento_sello_digital'),'nombre_documento_sello_digital'],
               [Sequelize.col('ws_sello.nombre_documento_sello'),'nombre_documento_sello']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listevidencia_sello); 
   if(id_usuario != null){ 
     HistorialgetAllevidencia_sello(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdevidencia_sello = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findevidencia_sello = await dbevidencia_sello.findOne({ where: {  id_evidencia_sello: id }}); 
   try { 
      if (findevidencia_sello) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdevidencia_sello(id_usuario,id); 
         } 
         return res.json(findevidencia_sello) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los evidencia_sello. ', 
         error 
      }); 
   }    
   console.log(findevidencia_sello);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newevidencia_sello = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbevidencia_sello.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevosello' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_evidencia_sello); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialevidencia_sello(id_usuario,id); 
      NewHistorialMasterevidencia_sello(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_sello--------------------------------------------------------------------------> 
export const updevidencia_sello_id_sello = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_evidencia_sello, id_sello, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbevidencia_sello.findOne({ where: {  id_evidencia_sello : id_evidencia_sello } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbevidencia_sello.update({ 
            id_usuario:id_usuario,
            id_sello:id_sello,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_evidencia_sello : id_evidencia_sello 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialevidencia_selloid_sello(id_usuario,id_sello); 
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
      msg: 'Registro de la tabla : evidencia_sello  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro evidencia_sello--------------------------------------------------------------------------> 
export const delevidencia_sello = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbevidencia_sello.findOne({ where: {id_evidencia_sello : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbevidencia_sello.update({
         activo : 0,
         },{
         where: {
            id_evidencia_sello : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialevidencia_sello(id_usuario,id); 
      DelMasterHistorialevidencia_sello(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllevidencia_sello = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialevidencia_sello.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : evidencia_sello',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdevidencia_sello = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialevidencia_sello.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: evidencia_sello',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialevidencia_sello = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialevidencia_sello.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: evidencia_sello',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialevidencia_selloid_sello = async (id_usuario:any,id_sello: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialevidencia_sello.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: evidencia_sello',
         id_sello ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialevidencia_sello = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialevidencia_sello.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: evidencia_sello',
          id_sello :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMasterevidencia_sello = async (id_evidencia_sello:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMasterevidencia_sello.create({ 
          id_usuario:id_usuario,
          id_evidencia_sello:id_evidencia_sello,
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
//Actualizar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterevidencia_sello= async (id_usuario: any, id_evidencia_sello:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterevidencia_sello.create({ 
            id_usuario:id_usuario,
            id_evidencia_sello,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
   export const DelMasterHistorialevidencia_sello= async (id_usuario: any ,id_evidencia_sello:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterevidencia_sello.create({ 
            id_usuario:id_usuario,
            id_evidencia_sello:id_evidencia_sello,
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
export const actualizarEstatusDescripcionevidencia_sello = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_evidencia_sello,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbevidencia_sello.findOne({ where: {  id_evidencia_sello : id_evidencia_sello } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbevidencia_sello.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_evidencia_sello : id_evidencia_sello 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMasterevidencia_sello(id_usuario,id_evidencia_sello,estatus, descripcion);
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
      msg: 'Registro de la tabla : evidencia_sello  ya almacenado', 
      }); 
   }
}
export const actualizarDesactivadoevidencia_sello = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbevidencia_sello.findOne({ where: {id_evidencia_sello : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbevidencia_sello.update({
         activo : 1,
         },{
         where: {
            id_evidencia_sello : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialevidencia_sello(id_usuario,id); 
      ActualDesactivadoMasterHistorialevidencia_sello(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialevidencia_sello = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialevidencia_sello.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_sello :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialevidencia_sello= async (id_usuario: any ,id_evidencia_sello:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterevidencia_sello.create({ 
            id_usuario:id_usuario,
            id_evidencia_sello:id_evidencia_sello,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_evidencia_sello,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
