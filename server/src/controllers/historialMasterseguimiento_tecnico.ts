import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbhistorialMasterseguimiento_tecnico } from '../models/historialMasterseguimiento_tecnico'; 

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
export const getAllhistorialMasterseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listseguimiento_tecnico    = await  dbhistorialMasterseguimiento_tecnico.findAll({where: {activo : 1}}); 
   res.json(listseguimiento_tecnico); 
   if(id_usuario != null){ 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdhistorialMasterseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findseguimiento_tecnico = await dbhistorialMasterseguimiento_tecnico.findOne({ where: {  id_tecnico: id }}); 
   try { 
      if (findseguimiento_tecnico) { 
         if(id_usuario != null){ 
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
export const newhistorialMasterseguimiento_tecnico = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbhistorialMasterseguimiento_tecnico.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_seguimiento_tecnico); 
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
//Actualizar el parametro con Id de : id_tecnico--------------------------------------------------------------------------> 
export const updatehistorialMasterseguimiento_tecnico= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_historialMasterseguimiento_tecnico, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbhistorialMasterseguimiento_tecnico.findOne({ where: {  id_historialMasterseguimiento_tecnico : id_historialMasterseguimiento_tecnico} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbhistorialMasterseguimiento_tecnico.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_historialMasterseguimiento_tecnico : id_historialMasterseguimiento_tecnico 
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
      msg: 'Registro de la tabla : seguimiento_tecnico  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro seguimiento_tecnico--------------------------------------------------------------------------> 
export const delhistorialMasterseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbhistorialMasterseguimiento_tecnico.findOne({ where: {id_historialMasterseguimiento_tecnico : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbhistorialMasterseguimiento_tecnico.update({
         activo : 0,
         },{
         where: {
            id_historialMasterseguimiento_tecnico : id 
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
