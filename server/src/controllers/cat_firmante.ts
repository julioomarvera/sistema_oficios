import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbcat_firmante } from '../models/cat_firmante'; 
import { dbregistro_quien_firma } from '../models/registro_quien_firma'; 
import { dbhistorialcat_firmante } from '../models/historialcat_firmante'; 
import { dbhistorialMasterregistro_quien_firma } from '../models/historialMasterregistro_quien_firma'; 
import {dbcat_direcciones} from '../models/cat_direcciones';
import {dbcat_areas} from '../models/cat_areas';
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
export const getAllcat_firmante = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol } = req.params; 
   let listcat_firmante :any = ''; 
  if(id_rol == "1"){ 
    listcat_firmante    = await  dbcat_firmante.findAll({where: {activo : 1}}); 
  } 
  else{ 
    listcat_firmante    = await  dbcat_firmante.findAll({where: {activo : 1, id_usuario : id_usuario}}); 
  } 
   res.json(listcat_firmante); 
   if(id_usuario != null){ 
     HistorialgetAllcat_firmante(id_usuario); 
   } 
} 

//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getcat_firmanteByid_gestion_oficios = async (req: Request, res: Response) => { 
   const { id_gestion_oficios } = req.params;    
   let listcat_firmante :any = ''; 
   listcat_firmante    = await  dbcat_firmante.findOne({where: {activo : 1, id_gestion_oficios : id_gestion_oficios}}); 
   res.json(listcat_firmante); 

} 




//Traer todos los Parametros ----------------------------------------------------------------------> 
export const cancelFirmante = async (req: Request, res: Response) => { 
   const { id_gestion_oficios } = req.params; 
   const resultado: any = await  dbcat_firmante.update(
          { activo:0}, { 
         where: { 
            id_gestion_oficios : id_gestion_oficios
         },}) 
   res.json(resultado); 

} 



//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcat_firmante = async (req: Request, res: Response) => { 
   const { id, id_usuario,id_rol } = req.params; 
   const findcat_firmante = await dbcat_firmante.findOne({ where: { id_cat_firmante: id }}); 
   try { 
      if (findcat_firmante) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcat_firmante(id_usuario,id); 
         } 
         return res.json(findcat_firmante) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_firmante. ', 
         error 
      }); 
   }    
   console.log(findcat_firmante);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcat_firmante = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_registro_quien_firma,id_usuario,id_gestion_oficios, id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro ,id_estatusregistro_quien_firma, PaginaActual,finalizado} = req.body; 
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbcat_firmante.findOne({ where: { id_gestion_oficios : id_gestion_oficios, numero_empledo: numero_empledo , activo: 1 } }); 
   if (params) { 
      return res.status(404).json({ 
         msg: 'Registro de la tabla : cat_firmante  ya almacenado', 
      }); 
   } 
   try { 
      const resultado: any = await  dbcat_firmante.create({ 
         id_usuario:id_usuario,
         id_gestion_oficios:id_gestion_oficios,
         id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro ,
         id_estatusregistro_quien_firma : id_estatusregistro_quien_firma ,
         activo:1 ,
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_cat_firmante); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialcat_firmante(id_usuario,id,id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro); 
      actualizarregistro_quien_firma(id_registro_quien_firma,id,PaginaActual,finalizado); 
      actualizarEstadoActivoregistro_quien_firma(id_registro_quien_firma); 
      NewHistorialMasterregistro_quien_firma(id_usuario,id,id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro); 
      
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updcat_firmante = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_cat_firmante,id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro,id_estatusregistro_quien_firma } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_firmante.findOne({ where: { id_cat_firmante: id_cat_firmante } }); 
      if (params) { 
         try { 
            const resultado: any = await  dbcat_firmante.update({ 
               id_usuario:id_usuario,
                id_cat_firmante:id_cat_firmante, 
                id_direccion:id_direccion, 
                text_direccion:text_direccion, 
                id_area:id_area, 
                area_texto:area_texto, 
                numero_empledo:numero_empledo, 
                text_nombre_empleado:text_nombre_empleado, 
                foto:foto, 
                id_oficio:id_oficio, 
                otro:otro, 
               id_estatusregistro_quien_firma : id_estatusregistro_quien_firma ,
               activo:1,
               createdAt:time, 
               updatedAt:time, 
            }, { 
            where: { 
              id_cat_firmante : id_cat_firmante 
            }, 
         }); 
           res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialcat_firmante(id_usuario,id_cat_firmante,id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro); 
         actualizarHistorialMasterregistro_quien_firma(id_usuario,id_cat_firmante,id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro); 
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
       msg: 'Registro de la tabla : cat_firmante  ya almacenado', 
    }); 
  }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delcat_firmante = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcat_firmante.findOne({ where: { id_cat_firmante : id } }); 
   const id_cat_firmante = findParam?.dataValues.id_cat_firmante;
   const id_direccion = findParam?.dataValues.id_direccion;
   const text_direccion = findParam?.dataValues.text_direccion;
   const id_area = findParam?.dataValues.id_area;
   const area_texto = findParam?.dataValues.area_texto;
   const numero_empledo = findParam?.dataValues.numero_empledo;
   const text_nombre_empleado = findParam?.dataValues.text_nombre_empleado;
   const foto = findParam?.dataValues.foto;
   const id_oficio = findParam?.dataValues.id_oficio;
   const otro = findParam?.dataValues.otro;
      if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcat_firmante.destroy({
         where: {
            id_cat_firmante : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcat_firmante(id_usuario,id_cat_firmante,id_direccion,text_direccion,id_area,area_texto,numero_empledo,text_nombre_empleado,foto,id_oficio,otro); 
      DelMasterHistorialcat_firmante(id_usuario,id); 
         }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcat_firmante = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_firmante.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : cat_firmante',
         id_cat_firmante: '',id_direccion: '',text_direccion: '',id_area: '',area_texto: '',numero_empledo: '',text_nombre_empleado: '',foto: '',id_oficio: '',otro: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcat_firmante = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_firmante.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó un registro de la tabla: cat_firmante',
         id_cat_firmante: id,id_direccion: '',text_direccion: '',id_area: '',area_texto: '',numero_empledo: '',text_nombre_empleado: '',foto: '',id_oficio: '',otro: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcat_firmante = async (id_usuario:any,id:any,id_direccion: any,text_direccion: any,id_area: any,area_texto: any,numero_empledo: any,text_nombre_empleado: any,foto: any,id_oficio: any,otro: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_firmante.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario inserto un nuevo registro de la tabla: cat_firmante',
         id_cat_firmante: id,id_direccion:id_direccion,text_direccion:text_direccion,id_area:id_area,area_texto:area_texto,numero_empledo:numero_empledo,text_nombre_empleado:text_nombre_empleado,foto:foto,id_oficio:id_oficio,otro:otro ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcat_firmante = async (id_usuario:any,id:any,id_direccion: any,text_direccion: any,id_area: any,area_texto: any,numero_empledo: any,text_nombre_empleado: any,foto: any,id_oficio: any,otro: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_firmante.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Actualizo un registro de la tabla: cat_firmante',
         id_cat_firmante: id,id_direccion:id_direccion,text_direccion:text_direccion,id_area:id_area,area_texto:area_texto,numero_empledo:numero_empledo,text_nombre_empleado:text_nombre_empleado,foto:foto,id_oficio:id_oficio,otro:otro ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcat_firmante = async (id_usuario:any,id:any,id_direccion: any,text_direccion: any,id_area: any,area_texto: any,numero_empledo: any,text_nombre_empleado: any,foto: any,id_oficio: any,otro: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcat_firmante.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: cat_firmante',
          id_cat_firmante: id,id_direccion:id_direccion,text_direccion:text_direccion,id_area:id_area,area_texto:area_texto,numero_empledo:numero_empledo,text_nombre_empleado:text_nombre_empleado,foto:foto,id_oficio:id_oficio,otro:otro ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//actualizar en la tabla registro_quien_firma ----------------------------------------------------------------------> 
export const actualizarregistro_quien_firma = async (id_registro_quien_firma : any , id:any, PaginaActual:any, finalizado:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbregistro_quien_firma.update({ 
       id_cat_firmante   : id,
       PaginaActual : PaginaActual,
       finalizado   : finalizado,
      },{ 
         where :{
           id_registro_quien_firma : id_registro_quien_firma
         }, 
      }).then();  
   }
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
   export const NewHistorialMasterregistro_quien_firma = async (id_usuario:any,id_cat_firmante: any,id_direccion: any,text_direccion: any,id_area: any,area_texto: any,numero_empledo: any,text_nombre_empleado: any,foto: any,id_oficio: any,otro: any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
            id_usuario:id_usuario,
          id_cat_firmante:id_cat_firmante,id_direccion:id_direccion,text_direccion:text_direccion,id_area:id_area,area_texto:area_texto,numero_empledo:numero_empledo,text_nombre_empleado:text_nombre_empleado,foto:foto,id_oficio:id_oficio,otro:otro ,
          activo:1,
          accion:'El usuario dio de alta el registro',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterregistro_quien_firma= async (id_usuario: any,id_cat_firmante: any,id_direccion: any,text_direccion: any,id_area: any,area_texto: any,numero_empledo: any,text_nombre_empleado: any,foto: any,id_oficio: any,otro: any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
            id_usuario:id_usuario,
          id_cat_firmante:id_cat_firmante,id_direccion:id_direccion,text_direccion:text_direccion,id_area:id_area,area_texto:area_texto,numero_empledo:numero_empledo,text_nombre_empleado:text_nombre_empleado,foto:foto,id_oficio:id_oficio,otro:otro ,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
   export const DelMasterHistorialcat_firmante= async (id_usuario: any ,id_cat_firmante : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
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
//actualizar Estado Activo en la tabla registro_quien_firma ----------------------------------------------------------------------> 
export const actualizarEstadoActivoregistro_quien_firma = async (id_registro_quien_firma : any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbregistro_quien_firma.update({ 
       activo       : 1,
      },{ 
         where :{
           id_registro_quien_firma : id_registro_quien_firma
         }, 
      }).then();  
   }
   catch (error) { 
   }    
}

//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getregistro_quien_firma_by_id_gestion_oficios = async (req: Request, res: Response) => { 
   const { id_gestion_oficios } = req.params;    
   let listcat_firmante :any = ''; 
   listcat_firmante    = await  dbcat_firmante.findOne({where: {activo : 1, id_gestion_oficios : id_gestion_oficios}}); 
   res.json(listcat_firmante); 

} 