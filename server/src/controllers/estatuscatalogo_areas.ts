import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatuscatalogo_areas } from '../models/estatuscatalogo_areas'; 
import { dbhistorialestatuscatalogo_areas } from '../models/historialestatuscatalogo_areas'; 
import {dbcat_areas} from '../models/cat_areas'; 

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
export const getAllestatuscatalogo_areas = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listcatalogo_areas    = await  dbestatuscatalogo_areas.findAll({where: {activo : 1}}); 
   res.json(listcatalogo_areas); 
   if(id_usuario != null){ 
     HistorialgetAllcatalogo_areas(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatuscatalogo_areas = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcatalogo_areas = await dbestatuscatalogo_areas.findOne({ where: {  id_estatuscatalogo_areas: id }}); 
   try { 
      if (findcatalogo_areas) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcatalogo_areas(id_usuario,id); 
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
export const newestatuscatalogo_areas = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatuscatalogo_areas.create({ 
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
      NewHistorialcatalogo_areas(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_areas--------------------------------------------------------------------------> 
export const updateestatuscatalogo_areas= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatuscatalogo_areas, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatuscatalogo_areas.findOne({ where: {  id_estatuscatalogo_areas : id_estatuscatalogo_areas} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatuscatalogo_areas.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatuscatalogo_areas : id_estatuscatalogo_areas 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatuscatalogo_areas(id_usuario,id_estatuscatalogo_areas); 
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
export const delestatuscatalogo_areas = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatuscatalogo_areas.findOne({ where: {id_estatuscatalogo_areas : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatuscatalogo_areas.update({
         activo : 0,
         },{
         where: {
            id_estatuscatalogo_areas : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcatalogo_areas(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcatalogo_areas = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatuscatalogo_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : catalogo_areas',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcatalogo_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatuscatalogo_areas.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: catalogo_areas',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcatalogo_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatuscatalogo_areas.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_areas',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatuscatalogo_areas = async (id_usuario:any,id_cat_areas: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatuscatalogo_areas.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: catalogo_areas',
         id_cat_areas ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcatalogo_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatuscatalogo_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: catalogo_areas',
          id_cat_areas :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
