import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatususuarios_opdm } from '../models/estatususuarios_opdm'; 
import { dbhistorialestatususuarios_opdm } from '../models/historialestatususuarios_opdm'; 
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
export const getAllestatususuarios_opdm = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listusuarios_opdm    = await  dbestatususuarios_opdm.findAll({where: {activo : 1}}); 
   res.json(listusuarios_opdm); 
   if(id_usuario != null){ 
     HistorialgetAllusuarios_opdm(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatususuarios_opdm = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findusuarios_opdm = await dbestatususuarios_opdm.findOne({ where: {  id_estatususuarios_opdm: id }}); 
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
export const newestatususuarios_opdm = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatususuarios_opdm.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_usuarios_opdm); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialusuarios_opdm(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_users_opdm--------------------------------------------------------------------------> 
export const updateestatususuarios_opdm= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatususuarios_opdm, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatususuarios_opdm.findOne({ where: {  id_estatususuarios_opdm : id_estatususuarios_opdm} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatususuarios_opdm.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatususuarios_opdm : id_estatususuarios_opdm 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatususuarios_opdm(id_usuario,id_estatususuarios_opdm); 
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
export const delestatususuarios_opdm = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatususuarios_opdm.findOne({ where: {id_estatususuarios_opdm : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatususuarios_opdm.update({
         activo : 0,
         },{
         where: {
            id_estatususuarios_opdm : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialusuarios_opdm(id_usuario,id); 
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
          const resultado: any = await  dbhistorialestatususuarios_opdm.create({ 
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
      const resultado: any = await  dbhistorialestatususuarios_opdm.create({ 
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
      const resultado: any = await  dbhistorialestatususuarios_opdm.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: usuarios_opdm',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatususuarios_opdm = async (id_usuario:any,id_users_opdm: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatususuarios_opdm.create({ 
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
          const resultado: any = await  dbhistorialestatususuarios_opdm.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: usuarios_opdm',
          id_users_opdm :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
