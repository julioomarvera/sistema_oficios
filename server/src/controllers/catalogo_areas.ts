import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbcatalogo_areas } from '../models/catalogo_areas'; 
import { dbhistorialcatalogo_areas } from '../models/historialcatalogo_areas'; 
import { dbhistorialMastercatalogo_areas } from '../models/historialMastercatalogo_areas'; 
const { Sequelize, DataTypes } = require('sequelize'); 
import {dbcat_areas} from '../models/cat_areas'; 

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
export const getAllcatalogo_areas = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listcatalogo_areas :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         {
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listcatalogo_areas    = await  dbcatalogo_areas.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listcatalogo_areas= await  dbcatalogo_areas.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_areas,
            }],
            attributes: [
               'id_catalogo_areas',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_areas.id_cat_areas'),'id_cat_areas'],
               [Sequelize.col('ws_cat_areas.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_areas.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_areas.descripcion'),'descripcion']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listcatalogo_areas); 
   if(id_usuario != null){ 
     HistorialgetAllcatalogo_areas(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcatalogo_areas = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcatalogo_areas = await dbcatalogo_areas.findOne({ where: {  id_catalogo_areas: id }}); 
   try { 
      if (findcatalogo_areas) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcatalogo_areas(id_usuario,id); 
         } 
         return res.json(findcatalogo_areas) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_areas. ', 
         error 
      }); 
   }    
   console.log(findcatalogo_areas);   
}





//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcatalogo_areas = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbcatalogo_areas.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevocat_areas' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_catalogo_areas); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialcatalogo_areas(id_usuario,id); 
      NewHistorialMastercatalogo_areas(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_areas--------------------------------------------------------------------------> 
export const updcatalogo_areas_id_cat_areas = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_catalogo_areas, id_cat_areas, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcatalogo_areas.findOne({ where: {  id_catalogo_areas : id_catalogo_areas } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbcatalogo_areas.update({ 
            id_usuario:id_usuario,
            id_cat_areas:id_cat_areas,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_catalogo_areas : id_catalogo_areas 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialcatalogo_areasid_cat_areas(id_usuario,id_cat_areas); 
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
      msg: 'Registro de la tabla : catalogo_areas  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro catalogo_areas--------------------------------------------------------------------------> 
export const delcatalogo_areas = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcatalogo_areas.findOne({ where: {id_catalogo_areas : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcatalogo_areas.update({
         activo : 0,
         },{
         where: {
            id_catalogo_areas : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcatalogo_areas(id_usuario,id); 
      DelMasterHistorialcatalogo_areas(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcatalogo_areas = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcatalogo_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : catalogo_areas',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcatalogo_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialcatalogo_areas.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: catalogo_areas',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcatalogo_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialcatalogo_areas.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_areas',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcatalogo_areasid_cat_areas = async (id_usuario:any,id_cat_areas: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialcatalogo_areas.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: catalogo_areas',
         id_cat_areas ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcatalogo_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcatalogo_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: catalogo_areas',
          id_cat_areas :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMastercatalogo_areas = async (id_catalogo_areas:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
          id_usuario:id_usuario,
          id_catalogo_areas:id_catalogo_areas,
          estatus:1,
          activo:1,
          accion:'El usuario dio de alta el registro',
          createdAt:time, 
          updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
   export const actualizarHistorialMastercatalogo_areas= async (id_usuario: any, id_catalogo_areas:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
            id_usuario:id_usuario,
            id_catalogo_areas,
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
   export const DelMasterHistorialcatalogo_areas= async (id_usuario: any ,id_catalogo_areas:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
            id_usuario:id_usuario,
            id_catalogo_areas:id_catalogo_areas,
            activo:0,
            accion:'El usuario elimino el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
export const actualizarEstatusDescripcioncatalogo_areas = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_catalogo_areas,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcatalogo_areas.findOne({ where: {  id_catalogo_areas : id_catalogo_areas } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbcatalogo_areas.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_catalogo_areas : id_catalogo_areas 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMastercatalogo_areas(id_usuario,id_catalogo_areas,estatus, descripcion);
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
      msg: 'Registro de la tabla : catalogo_areas  ya almacenado', 
      }); 
   }
}
export const actualizarDesactivadocatalogo_areas = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcatalogo_areas.findOne({ where: {id_catalogo_areas : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcatalogo_areas.update({
         activo : 1,
         },{
         where: {
            id_catalogo_areas : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialcatalogo_areas(id_usuario,id); 
      ActualDesactivadoMasterHistorialcatalogo_areas(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialcatalogo_areas = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcatalogo_areas.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_cat_areas :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialcatalogo_areas= async (id_usuario: any ,id_catalogo_areas:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_areas.create({ 
            id_usuario:id_usuario,
            id_catalogo_areas:id_catalogo_areas,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_catalogo_areas,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
