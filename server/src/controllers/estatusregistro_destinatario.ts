import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatusregistro_destinatario } from '../models/estatusregistro_destinatario'; 
import { dbhistorialestatusregistro_destinatario } from '../models/historialestatusregistro_destinatario'; 
import {dbcat_destinatario} from '../models/cat_destinatario'; 

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
export const getAllestatusregistro_destinatario = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listregistro_destinatario    = await  dbestatusregistro_destinatario.findAll({where: {activo : 1}}); 
   res.json(listregistro_destinatario); 
   if(id_usuario != null){ 
     HistorialgetAllregistro_destinatario(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatusregistro_destinatario = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findregistro_destinatario = await dbestatusregistro_destinatario.findOne({ where: {  id_estatusregistro_destinatario: id }}); 
   try { 
      if (findregistro_destinatario) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdregistro_destinatario(id_usuario,id); 
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
export const newestatusregistro_destinatario = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatusregistro_destinatario.create({ 
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
      NewHistorialregistro_destinatario(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_destinatario--------------------------------------------------------------------------> 
export const updateestatusregistro_destinatario= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatusregistro_destinatario, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatusregistro_destinatario.findOne({ where: {  id_estatusregistro_destinatario : id_estatusregistro_destinatario} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatusregistro_destinatario.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatusregistro_destinatario : id_estatusregistro_destinatario 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatusregistro_destinatario(id_usuario,id_estatusregistro_destinatario); 
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
export const delestatusregistro_destinatario = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatusregistro_destinatario.findOne({ where: {id_estatusregistro_destinatario : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatusregistro_destinatario.update({
         activo : 0,
         },{
         where: {
            id_estatusregistro_destinatario : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialregistro_destinatario(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllregistro_destinatario = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusregistro_destinatario.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : registro_destinatario',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdregistro_destinatario = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusregistro_destinatario.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: registro_destinatario',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialregistro_destinatario = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusregistro_destinatario.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: registro_destinatario',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatusregistro_destinatario = async (id_usuario:any,id_cat_destinatario: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusregistro_destinatario.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: registro_destinatario',
         id_cat_destinatario ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialregistro_destinatario = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusregistro_destinatario.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: registro_destinatario',
          id_cat_destinatario :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
