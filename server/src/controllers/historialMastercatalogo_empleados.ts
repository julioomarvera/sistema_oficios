import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbhistorialMastercatalogo_empleados } from '../models/historialMastercatalogo_empleados'; 

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
export const getAllhistorialMastercatalogo_empleados = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listcatalogo_empleados    = await  dbhistorialMastercatalogo_empleados.findAll({where: {activo : 1}}); 
   res.json(listcatalogo_empleados); 
   if(id_usuario != null){ 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdhistorialMastercatalogo_empleados = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcatalogo_empleados = await dbhistorialMastercatalogo_empleados.findOne({ where: {  id_cat_empleados: id }}); 
   try { 
      if (findcatalogo_empleados) { 
         if(id_usuario != null){ 
         } 
         return res.json(findcatalogo_empleados) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_empleados. ', 
         error 
      }); 
   }    
   console.log(findcatalogo_empleados);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newhistorialMastercatalogo_empleados = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbhistorialMastercatalogo_empleados.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_catalogo_empleados); 
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
//Actualizar el parametro con Id de : id_cat_empleados--------------------------------------------------------------------------> 
export const updatehistorialMastercatalogo_empleados= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_historialMastercatalogo_empleados, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbhistorialMastercatalogo_empleados.findOne({ where: {  id_historialMastercatalogo_empleados : id_historialMastercatalogo_empleados} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbhistorialMastercatalogo_empleados.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_historialMastercatalogo_empleados : id_historialMastercatalogo_empleados 
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
      msg: 'Registro de la tabla : catalogo_empleados  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro catalogo_empleados--------------------------------------------------------------------------> 
export const delhistorialMastercatalogo_empleados = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbhistorialMastercatalogo_empleados.findOne({ where: {id_historialMastercatalogo_empleados : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbhistorialMastercatalogo_empleados.update({
         activo : 0,
         },{
         where: {
            id_historialMastercatalogo_empleados : id 
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
