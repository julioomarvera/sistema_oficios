import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbregistro_quien_firma } from '../models/registro_quien_firma'; 
import { dbhistorialregistro_quien_firma } from '../models/historialregistro_quien_firma'; 
import { dbhistorialMasterregistro_quien_firma } from '../models/historialMasterregistro_quien_firma'; 
const { Sequelize, DataTypes } = require('sequelize'); 
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
export const getAllregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listregistro_quien_firma :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         {
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listregistro_quien_firma    = await  dbregistro_quien_firma.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listregistro_quien_firma= await  dbregistro_quien_firma.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_firmante,
            }],
            attributes: [
               'id_registro_quien_firma',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_firmante.id_cat_firmante'),'id_cat_firmante'],
               [Sequelize.col('ws_cat_firmante.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_firmante.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_firmante.id_area'),'id_area'],
               [Sequelize.col('ws_cat_firmante.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_firmante.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_firmante.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_firmante.foto'),'foto'],
               [Sequelize.col('ws_cat_firmante.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_firmante.otro'),'otro']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listregistro_quien_firma); 
   if(id_usuario != null){ 
     HistorialgetAllregistro_quien_firma(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findregistro_quien_firma = await dbregistro_quien_firma.findOne({ where: {  id_registro_quien_firma: id }}); 
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
export const newregistro_quien_firma = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbregistro_quien_firma.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevocat_firmante' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_registro_quien_firma); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialregistro_quien_firma(id_usuario,id); 
      NewHistorialMasterregistro_quien_firma(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_firmante--------------------------------------------------------------------------> 
export const updregistro_quien_firma_id_cat_firmante = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_registro_quien_firma, id_cat_firmante, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbregistro_quien_firma.findOne({ where: {  id_registro_quien_firma : id_registro_quien_firma } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbregistro_quien_firma.update({ 
            id_usuario:id_usuario,
            id_cat_firmante:id_cat_firmante,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_registro_quien_firma : id_registro_quien_firma 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialregistro_quien_firmaid_cat_firmante(id_usuario,id_cat_firmante); 
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
export const delregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbregistro_quien_firma.findOne({ where: {id_registro_quien_firma : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbregistro_quien_firma.update({
         activo : 0,
         },{
         where: {
            id_registro_quien_firma : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialregistro_quien_firma(id_usuario,id); 
      DelMasterHistorialregistro_quien_firma(id_usuario,id);
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
          const resultado: any = await  dbhistorialregistro_quien_firma.create({ 
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
      const resultado: any = await  dbhistorialregistro_quien_firma.create({ 
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
      const resultado: any = await  dbhistorialregistro_quien_firma.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: registro_quien_firma',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialregistro_quien_firmaid_cat_firmante = async (id_usuario:any,id_cat_firmante: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialregistro_quien_firma.create({ 
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
          const resultado: any = await  dbhistorialregistro_quien_firma.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: registro_quien_firma',
          id_cat_firmante :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMasterregistro_quien_firma = async (id_registro_quien_firma:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
          id_usuario:id_usuario,
          id_registro_quien_firma:id_registro_quien_firma,
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
//Actualizar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterregistro_quien_firma= async (id_usuario: any, id_registro_quien_firma:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
            id_usuario:id_usuario,
            id_registro_quien_firma,
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
   export const DelMasterHistorialregistro_quien_firma= async (id_usuario: any ,id_registro_quien_firma:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
            id_usuario:id_usuario,
            id_registro_quien_firma:id_registro_quien_firma,
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
export const actualizarEstatusDescripcionregistro_quien_firma = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_registro_quien_firma,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbregistro_quien_firma.findOne({ where: {  id_registro_quien_firma : id_registro_quien_firma } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbregistro_quien_firma.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_registro_quien_firma : id_registro_quien_firma 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMasterregistro_quien_firma(id_usuario,id_registro_quien_firma,estatus, descripcion);
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
export const actualizarDesactivadoregistro_quien_firma = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbregistro_quien_firma.findOne({ where: {id_registro_quien_firma : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbregistro_quien_firma.update({
         activo : 1,
         },{
         where: {
            id_registro_quien_firma : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialregistro_quien_firma(id_usuario,id); 
      ActualDesactivadoMasterHistorialregistro_quien_firma(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialregistro_quien_firma = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialregistro_quien_firma.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_cat_firmante :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialregistro_quien_firma= async (id_usuario: any ,id_registro_quien_firma:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_quien_firma.create({ 
            id_usuario:id_usuario,
            id_registro_quien_firma:id_registro_quien_firma,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_registro_quien_firma,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
