import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatuscatalogo_empleados } from '../models/estatuscatalogo_empleados'; 
import { dbhistorialestatuscatalogo_empleados } from '../models/historialestatuscatalogo_empleados'; 
import {dbcat_empleados} from '../models/cat_empleados'; 

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
export const getAllestatuscatalogo_empleados = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listcatalogo_empleados    = await  dbestatuscatalogo_empleados.findAll({where: {activo : 1}}); 
   res.json(listcatalogo_empleados); 
   if(id_usuario != null){ 
     HistorialgetAllcatalogo_empleados(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatuscatalogo_empleados = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcatalogo_empleados = await dbestatuscatalogo_empleados.findOne({ where: {  id_estatuscatalogo_empleados: id }}); 
   try { 
      if (findcatalogo_empleados) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcatalogo_empleados(id_usuario,id); 
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
export const newestatuscatalogo_empleados = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatuscatalogo_empleados.create({ 
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
      NewHistorialcatalogo_empleados(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_empleados--------------------------------------------------------------------------> 
export const updateestatuscatalogo_empleados= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatuscatalogo_empleados, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatuscatalogo_empleados.findOne({ where: {  id_estatuscatalogo_empleados : id_estatuscatalogo_empleados} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatuscatalogo_empleados.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatuscatalogo_empleados : id_estatuscatalogo_empleados 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatuscatalogo_empleados(id_usuario,id_estatuscatalogo_empleados); 
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
export const delestatuscatalogo_empleados = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatuscatalogo_empleados.findOne({ where: {id_estatuscatalogo_empleados : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatuscatalogo_empleados.update({
         activo : 0,
         },{
         where: {
            id_estatuscatalogo_empleados : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcatalogo_empleados(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcatalogo_empleados = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatuscatalogo_empleados.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : catalogo_empleados',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcatalogo_empleados = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatuscatalogo_empleados.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: catalogo_empleados',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcatalogo_empleados = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatuscatalogo_empleados.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_empleados',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatuscatalogo_empleados = async (id_usuario:any,id_cat_empleados: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatuscatalogo_empleados.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: catalogo_empleados',
         id_cat_empleados ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcatalogo_empleados = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatuscatalogo_empleados.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: catalogo_empleados',
          id_cat_empleados :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
