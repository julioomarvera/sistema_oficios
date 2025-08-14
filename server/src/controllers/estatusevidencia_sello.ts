import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatusevidencia_sello } from '../models/estatusevidencia_sello'; 
import { dbhistorialestatusevidencia_sello } from '../models/historialestatusevidencia_sello'; 
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
export const getAllestatusevidencia_sello = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listevidencia_sello    = await  dbestatusevidencia_sello.findAll({where: {activo : 1}}); 
   res.json(listevidencia_sello); 
   if(id_usuario != null){ 
     HistorialgetAllevidencia_sello(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatusevidencia_sello = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findevidencia_sello = await dbestatusevidencia_sello.findOne({ where: {  id_estatusevidencia_sello: id }}); 
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
export const newestatusevidencia_sello = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatusevidencia_sello.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_evidencia_sello); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialevidencia_sello(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_sello--------------------------------------------------------------------------> 
export const updateestatusevidencia_sello= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatusevidencia_sello, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatusevidencia_sello.findOne({ where: {  id_estatusevidencia_sello : id_estatusevidencia_sello} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatusevidencia_sello.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatusevidencia_sello : id_estatusevidencia_sello 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatusevidencia_sello(id_usuario,id_estatusevidencia_sello); 
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
export const delestatusevidencia_sello = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatusevidencia_sello.findOne({ where: {id_estatusevidencia_sello : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatusevidencia_sello.update({
         activo : 0,
         },{
         where: {
            id_estatusevidencia_sello : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialevidencia_sello(id_usuario,id); 
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
          const resultado: any = await  dbhistorialestatusevidencia_sello.create({ 
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
      const resultado: any = await  dbhistorialestatusevidencia_sello.create({ 
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
      const resultado: any = await  dbhistorialestatusevidencia_sello.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: evidencia_sello',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatusevidencia_sello = async (id_usuario:any,id_sello: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusevidencia_sello.create({ 
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
          const resultado: any = await  dbhistorialestatusevidencia_sello.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: evidencia_sello',
          id_sello :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
