import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbestatusseguimiento_tecnico } from '../models/estatusseguimiento_tecnico'; 
import { dbhistorialestatusseguimiento_tecnico } from '../models/historialestatusseguimiento_tecnico'; 
import {dbtecnico} from '../models/tecnico'; 

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
export const getAllestatusseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listseguimiento_tecnico    = await  dbestatusseguimiento_tecnico.findAll({where: {activo : 1}}); 
   res.json(listseguimiento_tecnico); 
   if(id_usuario != null){ 
     HistorialgetAllseguimiento_tecnico(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdestatusseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findseguimiento_tecnico = await dbestatusseguimiento_tecnico.findOne({ where: {  id_estatusseguimiento_tecnico: id }}); 
   try { 
      if (findseguimiento_tecnico) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdseguimiento_tecnico(id_usuario,id); 
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
export const newestatusseguimiento_tecnico = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,descripcion,activo} = req.body; 
   try { 
      const resultado: any = await  dbestatusseguimiento_tecnico.create({ 
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
      NewHistorialseguimiento_tecnico(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_tecnico--------------------------------------------------------------------------> 
export const updateestatusseguimiento_tecnico= async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_estatusseguimiento_tecnico, descripcion , activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbestatusseguimiento_tecnico.findOne({ where: {  id_estatusseguimiento_tecnico : id_estatusseguimiento_tecnico} }); 
   if (params) { 
      try { 
         const resultado: any = await  dbestatusseguimiento_tecnico.update({ 
            descripcion:descripcion,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_estatusseguimiento_tecnico : id_estatusseguimiento_tecnico 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialestatusseguimiento_tecnico(id_usuario,id_estatusseguimiento_tecnico); 
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
export const delestatusseguimiento_tecnico = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbestatusseguimiento_tecnico.findOne({ where: {id_estatusseguimiento_tecnico : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbestatusseguimiento_tecnico.update({
         activo : 0,
         },{
         where: {
            id_estatusseguimiento_tecnico : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialseguimiento_tecnico(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllseguimiento_tecnico = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusseguimiento_tecnico.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : seguimiento_tecnico',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdseguimiento_tecnico = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusseguimiento_tecnico.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: seguimiento_tecnico',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialseguimiento_tecnico = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusseguimiento_tecnico.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: seguimiento_tecnico',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialestatusseguimiento_tecnico = async (id_usuario:any,id_tecnico: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialestatusseguimiento_tecnico.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: seguimiento_tecnico',
         id_tecnico ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialseguimiento_tecnico = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialestatusseguimiento_tecnico.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: seguimiento_tecnico',
          id_tecnico :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
