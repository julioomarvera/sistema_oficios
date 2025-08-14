import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatusgestion_oficios } from '../models/estatusgestion_oficios'; 
import { dbhistorialestatusgestion_oficios } from '../models/historialestatusgestion_oficios'; 
import {dboficios} from '../models/oficios'; 

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
export const getAllestatusgestion_oficios = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listgestion_oficios    = await  dbestatusgestion_oficios.findAll({where: {activo : 1}}); 
   res.json(listgestion_oficios); 
   if(id_usuario != null){ 
     HistorialgetAllgestion_oficios(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatusgestion_oficios = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findgestion_oficios = await dbestatusgestion_oficios.findOne({ where: {  id_estatusgestion_oficios: id }}); 
   try { 
      if (findgestion_oficios) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdgestion_oficios(id_usuario,id); 
         } 
         return res.json(findgestion_oficios) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los gestion_oficios. ', 
         error 
      }); 
   }    
   console.log(findgestion_oficios);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newestatusgestion_oficios = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatusgestion_oficios.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_gestion_oficios); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialgestion_oficios(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_oficios--------------------------------------------------------------------------> 
export const updateestatusgestion_oficios= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatusgestion_oficios, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatusgestion_oficios.findOne({ where: {  id_estatusgestion_oficios : id_estatusgestion_oficios} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatusgestion_oficios.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatusgestion_oficios : id_estatusgestion_oficios 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatusgestion_oficios(id_usuario,id_estatusgestion_oficios); 
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
      msg: 'Registro de la tabla : gestion_oficios  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro gestion_oficios--------------------------------------------------------------------------> 
export const delestatusgestion_oficios = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatusgestion_oficios.findOne({ where: {id_estatusgestion_oficios : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatusgestion_oficios.update({
         activo : 0,
         },{
         where: {
            id_estatusgestion_oficios : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialgestion_oficios(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllgestion_oficios = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusgestion_oficios.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : gestion_oficios',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdgestion_oficios = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusgestion_oficios.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: gestion_oficios',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialgestion_oficios = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusgestion_oficios.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: gestion_oficios',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatusgestion_oficios = async (id_usuario:any,id_oficios: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusgestion_oficios.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: gestion_oficios',
         id_oficios ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialgestion_oficios = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusgestion_oficios.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: gestion_oficios',
          id_oficios :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
