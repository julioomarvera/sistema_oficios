import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbhistorialMasterregistro_destinatario } from '../models/historialMasterregistro_destinatario'; 

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
export const getAllhistorialMasterregistro_destinatario = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listregistro_destinatario    = await  dbhistorialMasterregistro_destinatario.findAll({where: {activo : 1}}); 
   res.json(listregistro_destinatario); 
   if(id_usuario != null){ 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdhistorialMasterregistro_destinatario = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findregistro_destinatario = await dbhistorialMasterregistro_destinatario.findOne({ where: {  id_cat_destinatario: id }}); 
   try { 
      if (findregistro_destinatario) { 
         if(id_usuario != null){ 
         } 
         return res.json(findregistro_destinatario) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los registro_destinatario. ', 
         error 
      }); 
   }    
   console.log(findregistro_destinatario);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newhistorialMasterregistro_destinatario = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbhistorialMasterregistro_destinatario.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_registro_destinatario); 
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
//Actualizar el parametro con Id de : id_cat_destinatario--------------------------------------------------------------------------> 
export const updatehistorialMasterregistro_destinatario= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_historialMasterregistro_destinatario, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbhistorialMasterregistro_destinatario.findOne({ where: {  id_historialMasterregistro_destinatario : id_historialMasterregistro_destinatario} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbhistorialMasterregistro_destinatario.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_historialMasterregistro_destinatario : id_historialMasterregistro_destinatario 
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
      msg: 'Registro de la tabla : registro_destinatario  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro registro_destinatario--------------------------------------------------------------------------> 
export const delhistorialMasterregistro_destinatario = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbhistorialMasterregistro_destinatario.findOne({ where: {id_historialMasterregistro_destinatario : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbhistorialMasterregistro_destinatario.update({
         activo : 0,
         },{
         where: {
            id_historialMasterregistro_destinatario : id 
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
