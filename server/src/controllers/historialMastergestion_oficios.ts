import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbhistorialMastergestion_oficios } from '../models/historialMastergestion_oficios'; 

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
export const getAllhistorialMastergestion_oficios = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listgestion_oficios    = await  dbhistorialMastergestion_oficios.findAll({where: {activo : 1}}); 
   res.json(listgestion_oficios); 
   if(id_usuario != null){ 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdhistorialMastergestion_oficios = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findgestion_oficios = await dbhistorialMastergestion_oficios.findOne({ where: {  id_oficios: id }}); 
   try { 
      if (findgestion_oficios) { 
         if(id_usuario != null){ 
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
export const newhistorialMastergestion_oficios = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbhistorialMastergestion_oficios.create({ 
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
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_oficios--------------------------------------------------------------------------> 
export const updatehistorialMastergestion_oficios= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_historialMastergestion_oficios, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbhistorialMastergestion_oficios.findOne({ where: {  id_historialMastergestion_oficios : id_historialMastergestion_oficios} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbhistorialMastergestion_oficios.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_historialMastergestion_oficios : id_historialMastergestion_oficios 
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
      msg: 'Registro de la tabla : gestion_oficios  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro gestion_oficios--------------------------------------------------------------------------> 
export const delhistorialMastergestion_oficios = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbhistorialMastergestion_oficios.findOne({ where: {id_historialMastergestion_oficios : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.update({
         activo : 0,
         },{
         where: {
            id_historialMastergestion_oficios : id 
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
