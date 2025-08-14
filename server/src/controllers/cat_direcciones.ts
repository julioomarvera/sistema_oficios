import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbcat_direcciones } from '../models/cat_direcciones'; 
import { dbhistorialcat_direcciones } from '../models/historialcat_direcciones'; 

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
export const getAllcat_direcciones = async (req: Request, res: Response) => { 
   const { id_usuario } = req.params; 
   const listcat_direcciones    = await  dbcat_direcciones.findAll({
      where: {activo : 1},
      order:[
         ['descripcion','ASC']
      ]
   }); 
   res.json(listcat_direcciones); 
   if(id_usuario != null){ 
     HistorialgetAllcat_direcciones(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcat_direcciones = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcat_direcciones = await dbcat_direcciones.findOne({ where: { id_cat_direcciones: id }}); 
   try { 
      if (findcat_direcciones) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcat_direcciones(id_usuario,id); 
         } 
         return res.json(findcat_direcciones) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_direcciones. ', 
         error 
      }); 
   }    
   console.log(findcat_direcciones);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcat_direcciones = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_catalogo,id_usuario,  descripcion , PaginaActual,finalizado} = req.body; 
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbcat_direcciones.findOne({ where: { descripcion : descripcion } }); 
   if (params) { 
      return res.status(404).json({ 
         msg: 'Registro de la tabla : cat_direcciones  ya almacenado', 
      }); 
   } 
   try { 
      const resultado: any = await  dbcat_direcciones.create({ 
         descripcion ,
         activo:1 ,
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_cat_direcciones); 
      res.json({ 
         msg: `cat_direcciones registro almacenado exitosamente`, 
      }) 
      NewHistorialcat_direcciones(id_usuario,id,descripcion); 
      
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updcat_direcciones = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_cat_direcciones,descripcion } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_direcciones.findOne({ where: { id_cat_direcciones: id_cat_direcciones } }); 
      if (params) { 
         try { 
            const resultado: any = await  dbcat_direcciones.update({ 
                id_cat_direcciones:id_cat_direcciones, 
                descripcion:descripcion, 
               activo:1,
               createdAt:time, 
               updatedAt:time, 
            }, { 
            where: { 
              id_cat_direcciones : id_cat_direcciones 
            }, 
         }); 
           res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialcat_direcciones(id_usuario,id_cat_direcciones,descripcion); 
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
       msg: 'Registro de la tabla : cat_direcciones  ya almacenado', 
    }); 
  }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delcat_direcciones = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcat_direcciones.findOne({ where: { id_cat_direcciones : id } }); 
   const id_cat_direcciones = findParam?.dataValues.id_cat_direcciones;
   const descripcion = findParam?.dataValues.descripcion;
      if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcat_direcciones.destroy({
         where: {
            id_cat_direcciones : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcat_direcciones(id_usuario,id_cat_direcciones,descripcion); 
         }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcat_direcciones = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_direcciones.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : cat_direcciones',
         id_cat_direcciones: '',descripcion: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcat_direcciones = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_direcciones.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó un registro de la tabla: cat_direcciones',
         id_cat_direcciones: id,descripcion: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcat_direcciones = async (id_usuario:any,id:any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_direcciones.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario inserto un nuevo registro de la tabla: cat_direcciones',
         id_cat_direcciones: id,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcat_direcciones = async (id_usuario:any,id:any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_direcciones.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Actualizo un registro de la tabla: cat_direcciones',
         id_cat_direcciones: id,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcat_direcciones = async (id_usuario:any,id:any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_direcciones.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: cat_direcciones',
          id_cat_direcciones: id,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
