import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbcat_areas } from '../models/cat_areas'; 
import { dbcatalogo_areas } from '../models/catalogo_areas'; 
import { dbhistorialcat_areas } from '../models/historialcat_areas'; 
import { dbhistorialMastercatalogo_areas } from '../models/historialMastercatalogo_areas'; 
import {dbcat_direcciones} from '../models/cat_direcciones';

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
export const getAllcat_areas = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol } = req.params; 
   let listcat_areas :any = ''; 
  if(id_rol == "1"){ 
    listcat_areas    = await  dbcat_areas.findAll({where: {activo : 1}}); 
  } 
  else{ 
    listcat_areas    = await  dbcat_areas.findAll({where: {activo : 1, id_usuario : id_usuario}}); 
  } 
   res.json(listcat_areas); 
   if(id_usuario != null){ 
     HistorialgetAllcat_areas(id_usuario); 
   } 
} 

//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcat_areas = async (req: Request, res: Response) => { 
   const { id, id_usuario,id_rol } = req.params; 
   const findcat_areas = await dbcat_areas.findOne({ where: { id_cat_areas: id }}); 
   try { 
      if (findcat_areas) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcat_areas(id_usuario,id); 
         } 
         return res.json(findcat_areas) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_areas. ', 
         error 
      }); 
   }    
   console.log(findcat_areas);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcat_areas = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_catalogo_areas,id_usuario,  id_direccion,text_direccion,descripcion ,id_estatuscatalogo_areas, PaginaActual,finalizado} = req.body; 
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbcat_areas.findOne({ where: { id_direccion : id_direccion } }); 
   if (params) { 
      return res.status(404).json({ 
         msg: 'Registro de la tabla : cat_areas  ya almacenado', 
      }); 
   } 
   try { 
      const resultado: any = await  dbcat_areas.create({ 
         id_usuario:id_usuario,
         id_direccion,text_direccion,descripcion ,
         id_estatuscatalogo_areas : id_estatuscatalogo_areas ,
         activo:1 ,
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_cat_areas); 
      res.json({ 
         msg: `cat_areas registro almacenado exitosamente`, 
      }) 
      NewHistorialcat_areas(id_usuario,id,id_direccion,text_direccion,descripcion); 
      actualizarcatalogo_areas(id_catalogo_areas,id,PaginaActual,finalizado); 
      actualizarEstadoActivocatalogo_areas(id_catalogo_areas); 
      NewHistorialMastercatalogo_areas(id_usuario,id,id_direccion,text_direccion,descripcion); 
      
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updcat_areas = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_cat_areas,id_direccion,text_direccion,descripcion,id_estatuscatalogo_areas } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_areas.findOne({ where: { id_cat_areas: id_cat_areas } }); 
      if (params) { 
         try { 
            const resultado: any = await  dbcat_areas.update({ 
               id_usuario:id_usuario,
                id_cat_areas:id_cat_areas, 
                id_direccion:id_direccion, 
                text_direccion:text_direccion, 
                descripcion:descripcion, 
               id_estatuscatalogo_areas : id_estatuscatalogo_areas ,
               activo:1,
               createdAt:time, 
               updatedAt:time, 
            }, { 
            where: { 
              id_cat_areas : id_cat_areas 
            }, 
         }); 
           res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialcat_areas(id_usuario,id_cat_areas,id_direccion,text_direccion,descripcion); 
         actualizarHistorialMastercatalogo_areas(id_usuario,id_cat_areas,id_direccion,text_direccion,descripcion); 
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
       msg: 'Registro de la tabla : cat_areas  ya almacenado', 
    }); 
  }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delcat_areas = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcat_areas.findOne({ where: { id_cat_areas : id } }); 
   const id_cat_areas = findParam?.dataValues.id_cat_areas;
   const id_direccion = findParam?.dataValues.id_direccion;
   const text_direccion = findParam?.dataValues.text_direccion;
   const descripcion = findParam?.dataValues.descripcion;
      if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcat_areas.destroy({
         where: {
            id_cat_areas : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcat_areas(id_usuario,id_cat_areas,id_direccion,text_direccion,descripcion); 
      DelMasterHistorialcat_areas(id_usuario,id); 
         }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcat_areas = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : cat_areas',
         id_cat_areas: '',id_direccion: '',text_direccion: '',descripcion: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcat_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó un registro de la tabla: cat_areas',
         id_cat_areas: id,id_direccion: '',text_direccion: '',descripcion: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcat_areas = async (id_usuario:any,id:any,id_direccion: any,text_direccion: any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario inserto un nuevo registro de la tabla: cat_areas',
         id_cat_areas: id,id_direccion:id_direccion,text_direccion:text_direccion,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcat_areas = async (id_usuario:any,id:any,id_direccion: any,text_direccion: any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Actualizo un registro de la tabla: cat_areas',
         id_cat_areas: id,id_direccion:id_direccion,text_direccion:text_direccion,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcat_areas = async (id_usuario:any,id:any,id_direccion: any,text_direccion: any,descripcion: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: cat_areas',
          id_cat_areas: id,id_direccion:id_direccion,text_direccion:text_direccion,descripcion:descripcion ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//actualizar en la tabla catalogo_areas ----------------------------------------------------------------------> 
export const actualizarcatalogo_areas = async (id_catalogo_areas : any , id:any, PaginaActual:any, finalizado:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbcatalogo_areas.update({ 
       id_cat_areas   : id,
       PaginaActual : PaginaActual,
       finalizado   : finalizado,
      },{ 
         where :{
           id_catalogo_areas : id_catalogo_areas
         }, 
      }).then();  
   }
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
   export const NewHistorialMastercatalogo_areas = async (id_usuario:any,id_cat_areas: any,id_direccion: any,text_direccion: any,descripcion: any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
            id_usuario:id_usuario,
          id_cat_areas:id_cat_areas,id_direccion:id_direccion,text_direccion:text_direccion,descripcion:descripcion ,
          activo:1,
          accion:'El usuario dio de alta el registro',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
   export const actualizarHistorialMastercatalogo_areas= async (id_usuario: any,id_cat_areas: any,id_direccion: any,text_direccion: any,descripcion: any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
            id_usuario:id_usuario,
          id_cat_areas:id_cat_areas,id_direccion:id_direccion,text_direccion:text_direccion,descripcion:descripcion ,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
   export const DelMasterHistorialcat_areas= async (id_usuario: any ,id_cat_areas : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
            id_usuario:id_usuario,
            activo:0,
            accion:'El usuario elimino el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//actualizar Estado Activo en la tabla catalogo_areas ----------------------------------------------------------------------> 
export const actualizarEstadoActivocatalogo_areas = async (id_catalogo_areas : any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbcatalogo_areas.update({ 
       activo       : 1,
      },{ 
         where :{
           id_catalogo_areas : id_catalogo_areas
         }, 
      }).then();  
   }
   catch (error) { 
   }    
}
