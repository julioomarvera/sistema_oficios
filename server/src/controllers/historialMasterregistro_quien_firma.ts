import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbhistorialMasterregistro_quien_firma } from '../models/historialMasterregistro_quien_firma'; 

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
export const getAllhistorialMasterregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listregistro_quien_firma    = await  dbhistorialMasterregistro_quien_firma.findAll({where: {activo : 1}}); 
   res.json(listregistro_quien_firma); 
   if(id_usuario != null){ 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdhistorialMasterregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findregistro_quien_firma = await dbhistorialMasterregistro_quien_firma.findOne({ where: {  id_cat_firmante: id }}); 
   try { 
      if (findregistro_quien_firma) { 
         if(id_usuario != null){ 
         } 
         return res.json(findregistro_quien_firma) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los registro_quien_firma. ', 
         error 
      }); 
   }    
   console.log(findregistro_quien_firma);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newhistorialMasterregistro_quien_firma = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_registro_quien_firma); 
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
//Actualizar el parametro con Id de : id_cat_firmante--------------------------------------------------------------------------> 
export const updatehistorialMasterregistro_quien_firma= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_historialMasterregistro_quien_firma, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbhistorialMasterregistro_quien_firma.findOne({ where: {  id_historialMasterregistro_quien_firma : id_historialMasterregistro_quien_firma} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbhistorialMasterregistro_quien_firma.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_historialMasterregistro_quien_firma : id_historialMasterregistro_quien_firma 
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
      msg: 'Registro de la tabla : registro_quien_firma  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro registro_quien_firma--------------------------------------------------------------------------> 
export const delhistorialMasterregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbhistorialMasterregistro_quien_firma.findOne({ where: {id_historialMasterregistro_quien_firma : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbhistorialMasterregistro_quien_firma.update({
         activo : 0,
         },{
         where: {
            id_historialMasterregistro_quien_firma : id 
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
