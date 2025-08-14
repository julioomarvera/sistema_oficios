import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbrolles } from '../models/rolles'; 

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
export const getAllws_rolles = async (req: Request, res: Response) => { 
   const listws_rolles    = await  dbrolles.findAll({where: {activo : 1}}); 
   res.json(listws_rolles); 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdws_rolles = async (req: Request, res: Response) => { 
   const { id } = req.params; 
   const findws_rolles = await dbrolles.findOne({ where: { id_roll: id }}); 
   try { 
      if (findws_rolles) { 
         return res.json(findws_rolles) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los ws_rolles. ', 
         error 
      }); 
   }    
   console.log(findws_rolles);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newws_rolles = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{  descripcion,crear,ver,editar,eliminar,activo } = req.body; 
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbrolles.findOne({ where: { descripcion : descripcion } }); 
   if (params) { 
      return res.status(404).json({ 
         msg: 'Registro de la tabla : ws_rolles  ya almacenado', 
      }); 
   } 
   try { 
      const resultado: any = await  dbrolles.create({ 
         descripcion,crear,ver,editar,eliminar,
         activo:1 ,
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      res.json({ 
         msg: `ws_rolles '$descripcion\' registrado exitosamente`, 
      }) 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updws_rolles = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{  id_roll,descripcion,crear,ver,editar,eliminar,activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbrolles.findOne({ where: { id_roll: id_roll } }); 
      if (params) { 
         try { 
            const resultado: any = await  dbrolles.update({ 
                id_roll:id_roll, 
                descripcion:descripcion, 
                crear:crear, 
                ver:ver, 
                editar:editar, 
                eliminar:eliminar, 
                activo:1, 
               createdAt:time, 
               updatedAt:time, 
            }, { 
            where: { 
              id_roll : id_roll 
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
       msg: 'Registro de la tabla : ws_rolles  ya almacenado', 
    }); 
  }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delws_rolles = async (req: Request, res: Response) => { 
   const { id } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbrolles.findOne({ where: { id_roll : id } }); 
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbrolles.destroy({
         where: {
            id_roll : id 
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
