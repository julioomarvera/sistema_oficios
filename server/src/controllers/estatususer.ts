import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatususer } from '../models/estatususer'; 
import { dbhistorialestatususer } from '../models/historialestatususer'; 
import { dbusers_opdm } from '../models/users_opdm'; 

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
export const getAllestatususer = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listuser    = await  dbestatususer.findAll({where: {activo : 1}}); 
   res.json(listuser); 
   if(id_usuario != null){ 
     HistorialgetAlluser(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatususer = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const finduser = await dbestatususer.findOne({ where: {  id_estatususer: id }}); 
   try { 
      if (finduser) { 
         if(id_usuario != null){ 
             HistorialgetRegByIduser(id_usuario,id); 
         } 
         return res.json(finduser) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los user. ', 
         error 
      }); 
   }    
   console.log(finduser);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newestatususer = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatususer.create({ 
         id_usuario: id_usuario ,
         descripcion: descripcion,
         activo:1, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_user); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialuser(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_users--------------------------------------------------------------------------> 
export const updateestatususer= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatususer, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatususer.findOne({ where: {  id_estatususer : id_estatususer} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatususer.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatususer : id_estatususer 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatususer(id_usuario,id_estatususer); 
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
      msg: 'Registro de la tabla : user  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro user--------------------------------------------------------------------------> 
export const delestatususer = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatususer.findOne({ where: {id_estatususer : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatususer.update({
         activo : 0,
         },{
         where: {
            id_estatususer : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialuser(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAlluser = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatususer.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : user',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIduser = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatususer.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: user',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialuser = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatususer.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: user',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatususer = async (id_usuario:any,id_users: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatususer.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: user',
         id_users ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialuser = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatususer.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: user',
          id_users :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
