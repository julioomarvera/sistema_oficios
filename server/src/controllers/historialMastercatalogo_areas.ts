import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbhistorialMastercatalogo_areas } from '../models/historialMastercatalogo_areas'; 

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
export const getAllhistorialMastercatalogo_areas = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listcatalogo_areas    = await  dbhistorialMastercatalogo_areas.findAll({where: {activo : 1}}); 
   res.json(listcatalogo_areas); 
   if(id_usuario != null){ 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdhistorialMastercatalogo_areas = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcatalogo_areas = await dbhistorialMastercatalogo_areas.findOne({ where: {  id_cat_areas: id }}); 
   try { 
      if (findcatalogo_areas) { 
         if(id_usuario != null){ 
         } 
         return res.json(findcatalogo_areas) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_areas. ', 
         error 
      }); 
   }    
   console.log(findcatalogo_areas);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newhistorialMastercatalogo_areas = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_catalogo_areas); 
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
//Actualizar el parametro con Id de : id_cat_areas--------------------------------------------------------------------------> 
export const updatehistorialMastercatalogo_areas= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_historialMastercatalogo_areas, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbhistorialMastercatalogo_areas.findOne({ where: {  id_historialMastercatalogo_areas : id_historialMastercatalogo_areas} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbhistorialMastercatalogo_areas.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_historialMastercatalogo_areas : id_historialMastercatalogo_areas 
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
      msg: 'Registro de la tabla : catalogo_areas  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro catalogo_areas--------------------------------------------------------------------------> 
export const delhistorialMastercatalogo_areas = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbhistorialMastercatalogo_areas.findOne({ where: {id_historialMastercatalogo_areas : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbhistorialMastercatalogo_areas.update({
         activo : 0,
         },{
         where: {
            id_historialMastercatalogo_areas : id 
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
