import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbregistro_destinatario } from '../models/registro_destinatario'; 
import { dbhistorialregistro_destinatario } from '../models/historialregistro_destinatario'; 
import { dbhistorialMasterregistro_destinatario } from '../models/historialMasterregistro_destinatario'; 
const { Sequelize, DataTypes } = require('sequelize'); 
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
export const getAllregistro_destinatario = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listregistro_destinatario :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         {
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listregistro_destinatario    = await  dbregistro_destinatario.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listregistro_destinatario= await  dbregistro_destinatario.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_destinatario,
            }],
            attributes: [
               'id_registro_destinatario',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_destinatario.id_cat_destinatario'),'id_cat_destinatario'],
               [Sequelize.col('ws_cat_destinatario.id_direccion'),'id_direccion'],
               [Sequelize.col('ws_cat_destinatario.text_direccion'),'text_direccion'],
               [Sequelize.col('ws_cat_destinatario.id_area'),' id_area'],
               [Sequelize.col('ws_cat_destinatario.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_destinatario.numero_empledo'),'numero_empledo'],
               [Sequelize.col('ws_cat_destinatario.text_nombre_empleado'),'text_nombre_empleado'],
               [Sequelize.col('ws_cat_destinatario.foto'),'foto'],
               [Sequelize.col('ws_cat_destinatario.id_oficio'),'id_oficio'],
               [Sequelize.col('ws_cat_destinatario.estatus'),'estatus']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listregistro_destinatario); 
   if(id_usuario != null){ 
     HistorialgetAllregistro_destinatario(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdregistro_destinatario = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findregistro_destinatario = await dbregistro_destinatario.findOne({ where: {  id_registro_destinatario: id }}); 
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
export const newregistro_destinatario = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbregistro_destinatario.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevocat_destinatario' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_registro_destinatario); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialregistro_destinatario(id_usuario,id); 
      NewHistorialMasterregistro_destinatario(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_destinatario--------------------------------------------------------------------------> 
export const updregistro_destinatario_id_cat_destinatario = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_registro_destinatario, id_cat_destinatario, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbregistro_destinatario.findOne({ where: {  id_registro_destinatario : id_registro_destinatario } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbregistro_destinatario.update({ 
            id_usuario:id_usuario,
            id_cat_destinatario:id_cat_destinatario,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_registro_destinatario : id_registro_destinatario 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialregistro_destinatarioid_cat_destinatario(id_usuario,id_cat_destinatario); 
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
export const delregistro_destinatario = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbregistro_destinatario.findOne({ where: {id_registro_destinatario : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbregistro_destinatario.update({
         activo : 0,
         },{
         where: {
            id_registro_destinatario : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialregistro_destinatario(id_usuario,id); 
      DelMasterHistorialregistro_destinatario(id_usuario,id);
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
          const resultado: any = await  dbhistorialregistro_destinatario.create({ 
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
      const resultado: any = await  dbhistorialregistro_destinatario.create({ 
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
      const resultado: any = await  dbhistorialregistro_destinatario.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: registro_destinatario',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialregistro_destinatarioid_cat_destinatario = async (id_usuario:any,id_cat_destinatario: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialregistro_destinatario.create({ 
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
          const resultado: any = await  dbhistorialregistro_destinatario.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: registro_destinatario',
          id_cat_destinatario :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMasterregistro_destinatario = async (id_registro_destinatario:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_destinatario.create({ 
          id_usuario:id_usuario,
          id_registro_destinatario:id_registro_destinatario,
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
//Actualizar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterregistro_destinatario= async (id_usuario: any, id_registro_destinatario:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_destinatario.create({ 
            id_usuario:id_usuario,
            id_registro_destinatario,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
   export const DelMasterHistorialregistro_destinatario= async (id_usuario: any ,id_registro_destinatario:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_destinatario.create({ 
            id_usuario:id_usuario,
            id_registro_destinatario:id_registro_destinatario,
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
export const actualizarEstatusDescripcionregistro_destinatario = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_registro_destinatario,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbregistro_destinatario.findOne({ where: {  id_registro_destinatario : id_registro_destinatario } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbregistro_destinatario.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_registro_destinatario : id_registro_destinatario 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMasterregistro_destinatario(id_usuario,id_registro_destinatario,estatus, descripcion);
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
export const actualizarDesactivadoregistro_destinatario = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbregistro_destinatario.findOne({ where: {id_registro_destinatario : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbregistro_destinatario.update({
         activo : 1,
         },{
         where: {
            id_registro_destinatario : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialregistro_destinatario(id_usuario,id); 
      ActualDesactivadoMasterHistorialregistro_destinatario(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialregistro_destinatario = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialregistro_destinatario.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_cat_destinatario :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialregistro_destinatario= async (id_usuario: any ,id_registro_destinatario:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterregistro_destinatario.create({ 
            id_usuario:id_usuario,
            id_registro_destinatario:id_registro_destinatario,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_registro_destinatario,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
