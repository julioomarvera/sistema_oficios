import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbhistorialMasterusuarios_opdm } from '../models/historialMasterusuarios_opdm'; 

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
export const getAllhistorialMasterusuarios_opdm = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listusuarios_opdm    = await  dbhistorialMasterusuarios_opdm.findAll({where: {activo : 1}}); 
   res.json(listusuarios_opdm); 
   if(id_usuario != null){ 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdhistorialMasterusuarios_opdm = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findusuarios_opdm = await dbhistorialMasterusuarios_opdm.findOne({ where: {  id_users_opdm: id }}); 
   try { 
      if (findusuarios_opdm) { 
         if(id_usuario != null){ 
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
export const newhistorialMasterusuarios_opdm = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbhistorialMasterusuarios_opdm.create({ 
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
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_users_opdm--------------------------------------------------------------------------> 
export const updatehistorialMasterusuarios_opdm= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_historialMasterusuarios_opdm, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbhistorialMasterusuarios_opdm.findOne({ where: {  id_historialMasterusuarios_opdm : id_historialMasterusuarios_opdm} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbhistorialMasterusuarios_opdm.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_historialMasterusuarios_opdm : id_historialMasterusuarios_opdm 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
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
export const delhistorialMasterusuarios_opdm = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbhistorialMasterusuarios_opdm.findOne({ where: {id_historialMasterusuarios_opdm : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbhistorialMasterusuarios_opdm.update({
         activo : 0,
         },{
         where: {
            id_historialMasterusuarios_opdm : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
