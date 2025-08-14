import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbcat_oficio } from '../models/cat_oficio'; 
import { dbhistorialcat_oficio } from '../models/historialcat_oficio'; 

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
export const getAllcat_oficio = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listcat_oficio    = await  dbcat_oficio.findAll({where: {activo : 1}}); 
   res.json(listcat_oficio); 
   if(id_usuario != null){ 
     HistorialgetAllcat_oficio(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcat_oficio = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcat_oficio = await dbcat_oficio.findOne({ where: { id_cat_oficio: id }}); 
   try { 
      if (findcat_oficio) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcat_oficio(id_usuario,id); 
         } 
         return res.json(findcat_oficio) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_oficio. ', 
         error 
      }); 
   }    
   console.log(findcat_oficio);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcat_oficio = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_catalogo,id_usuario,  descripcion , PaginaActual,finalizado} = req.body; 
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbcat_oficio.findOne({ where: { descripcion : descripcion } }); 
   if (params) { 
      return res.status(404).json({ 
         msg: 'Registro de la tabla : cat_oficio  ya almacenado', 
      }); 
   } 
   try { 
      const resultado: any = await  dbcat_oficio.create({ 
         descripcion ,
         activo:1 ,
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_cat_oficio); 
      res.json({ 
         msg: `cat_oficio registro almacenado exitosamente`, 
      }) 
      NewHistorialcat_oficio(id_usuario,id,descripcion); 
      
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updcat_oficio = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_cat_oficio,descripcion } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_oficio.findOne({ where: { id_cat_oficio: id_cat_oficio } }); 
      if (params) { 
         try { 
            const resultado: any = await  dbcat_oficio.update({ 
                id_cat_oficio:id_cat_oficio, 
                descripcion:descripcion, 
               activo:1,
               createdAt:time, 
               updatedAt:time, 
            }, { 
            where: { 
              id_cat_oficio : id_cat_oficio 
            }, 
         }); 
           res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialcat_oficio(id_usuario,id_cat_oficio,descripcion); 
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
       msg: 'Registro de la tabla : cat_oficio  ya almacenado', 
    }); 
  }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delcat_oficio = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcat_oficio.findOne({ where: { id_cat_oficio : id } }); 
   const id_cat_oficio = findParam?.dataValues.id_cat_oficio;
   const descripcion = findParam?.dataValues.descripcion;
      if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcat_oficio.destroy({
         where: {
            id_cat_oficio : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcat_oficio(id_usuario,id_cat_oficio,descripcion); 
         }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcat_oficio = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_oficio.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : cat_oficio',
         id_cat_oficio: '',descripcion: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcat_oficio = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_oficio.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó un registro de la tabla: cat_oficio',
         id_cat_oficio: id,descripcion: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcat_oficio = async (id_usuario:any,id:any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_oficio.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario inserto un nuevo registro de la tabla: cat_oficio',
         id_cat_oficio: id,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcat_oficio = async (id_usuario:any,id:any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_oficio.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Actualizo un registro de la tabla: cat_oficio',
         id_cat_oficio: id,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcat_oficio = async (id_usuario:any,id:any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_oficio.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: cat_oficio',
          id_cat_oficio: id,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
