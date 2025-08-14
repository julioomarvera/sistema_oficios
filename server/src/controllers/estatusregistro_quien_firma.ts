import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatusregistro_quien_firma } from '../models/estatusregistro_quien_firma'; 
import { dbhistorialestatusregistro_quien_firma } from '../models/historialestatusregistro_quien_firma'; 
import {dbcat_firmante} from '../models/cat_firmante'; 

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
export const getAllestatusregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listregistro_quien_firma    = await  dbestatusregistro_quien_firma.findAll({where: {activo : 1}}); 
   res.json(listregistro_quien_firma); 
   if(id_usuario != null){ 
     HistorialgetAllregistro_quien_firma(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatusregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findregistro_quien_firma = await dbestatusregistro_quien_firma.findOne({ where: {  id_estatusregistro_quien_firma: id }}); 
   try { 
      if (findregistro_quien_firma) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdregistro_quien_firma(id_usuario,id); 
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
export const newestatusregistro_quien_firma = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatusregistro_quien_firma.create({ 
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
      NewHistorialregistro_quien_firma(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_firmante--------------------------------------------------------------------------> 
export const updateestatusregistro_quien_firma= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatusregistro_quien_firma, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatusregistro_quien_firma.findOne({ where: {  id_estatusregistro_quien_firma : id_estatusregistro_quien_firma} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatusregistro_quien_firma.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatusregistro_quien_firma : id_estatusregistro_quien_firma 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatusregistro_quien_firma(id_usuario,id_estatusregistro_quien_firma); 
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
export const delestatusregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatusregistro_quien_firma.findOne({ where: {id_estatusregistro_quien_firma : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatusregistro_quien_firma.update({
         activo : 0,
         },{
         where: {
            id_estatusregistro_quien_firma : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialregistro_quien_firma(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllregistro_quien_firma = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusregistro_quien_firma.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : registro_quien_firma',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdregistro_quien_firma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusregistro_quien_firma.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: registro_quien_firma',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialregistro_quien_firma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusregistro_quien_firma.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: registro_quien_firma',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatusregistro_quien_firma = async (id_usuario:any,id_cat_firmante: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusregistro_quien_firma.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: registro_quien_firma',
         id_cat_firmante ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialregistro_quien_firma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusregistro_quien_firma.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: registro_quien_firma',
          id_cat_firmante :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
