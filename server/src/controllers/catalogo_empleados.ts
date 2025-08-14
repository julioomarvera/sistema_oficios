import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbcatalogo_empleados } from '../models/catalogo_empleados'; 
import { dbhistorialcatalogo_empleados } from '../models/historialcatalogo_empleados'; 
import { dbhistorialMastercatalogo_empleados } from '../models/historialMastercatalogo_empleados'; 
const { Sequelize, DataTypes } = require('sequelize'); 
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
export const getAllcatalogo_empleados = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol,estatus,activo } = req.params; 
   let listcatalogo_empleados :any = ''; 
   if(id_rol == "1"){ 
      if(activo == "2"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         {
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         }) 
      }
      else if(activo == "1" && estatus == "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo},
            include:[{
              model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo, estatus : estatus},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
   }
   else{ 
      if(activo == "2"){ 
         listcatalogo_empleados    = await  dbcatalogo_empleados.findAll(
         { 
            where: {id_usuario : id_usuario},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus == "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus == "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo, id_usuario : id_usuario},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "1" && estatus != "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      }
      else if(activo == "0" && estatus != "0"){ 
         listcatalogo_empleados= await  dbcatalogo_empleados.findAll(
         { 
            where: {activo : activo, estatus : estatus, id_usuario : id_usuario},
            include:[{
               model:dbcat_empleados,
            }],
            attributes: [
               'id_catalogo_empleados',
               'id_usuario',
               'finalizado',
               'estatus',
               'descripcion',
               'activo',
               'createdAt',
               [Sequelize.col('ws_cat_empleado.id_cat_empleados'),'id_cat_empleados'],
               [Sequelize.col('ws_cat_empleado.id_usuario'),'id_usuario'],
               [Sequelize.col('ws_cat_empleado.nombre_completo'),'nombre_completo'],
               [Sequelize.col('ws_cat_empleado.numero_empleado'),'numero_empleado'],
               [Sequelize.col('ws_cat_empleado.cargo'),'cargo'],
               [Sequelize.col('ws_cat_empleado.direccion'),'direccion'],
               [Sequelize.col('ws_cat_empleado.direccion_texto'),'direccion_texto'],
               [Sequelize.col('ws_cat_empleado.subdireccion'),'subdireccion'],
               [Sequelize.col('ws_cat_empleado.area'),'area'],
               [Sequelize.col('ws_cat_empleado.area_texto'),'area_texto'],
               [Sequelize.col('ws_cat_empleado.nombreJefe'),'nombreJefe'],
               [Sequelize.col('ws_cat_empleado.cargoJefe'),'cargoJefe'],
               [Sequelize.col('ws_cat_empleado.correo_institucional'),'correo_institucional'],
               [Sequelize.col('ws_cat_empleado.telefono_opdm'),'telefono_opdm'],
               [Sequelize.col('ws_cat_empleado.url'),'url'],
               [Sequelize.col('ws_cat_empleado.codigo_qr'),'codigo_qr'],
               [Sequelize.col('ws_cat_empleado.foto'),'foto']
            ],
            raw  : true ,
            nest : false,
         })
      } 
   } 
   res.json(listcatalogo_empleados); 
   if(id_usuario != null){ 
     HistorialgetAllcatalogo_empleados(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcatalogo_empleados = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findcatalogo_empleados = await dbcatalogo_empleados.findOne({ where: {  id_catalogo_empleados: id }}); 
   try { 
      if (findcatalogo_empleados) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdcatalogo_empleados(id_usuario,id); 
         } 
         return res.json(findcatalogo_empleados) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_empleados. ', 
         error 
      }); 
   }    
   console.log(findcatalogo_empleados);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcatalogo_empleados = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario} = req.params; 
   try { 
      const resultado: any = await  dbcatalogo_empleados.create({ 
         id_usuario:id_usuario,
         estatus:1,
         activo:0 ,
         PaginaActual: '/index/nuevocat_empleados' ,
         finalizado:0, 
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_catalogo_empleados); 
      res.json({ 
         msg: id, 
      }) 
      NewHistorialcatalogo_empleados(id_usuario,id); 
      NewHistorialMastercatalogo_empleados(id_usuario,id); 
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar el parametro con Id de : id_cat_empleados--------------------------------------------------------------------------> 
export const updcatalogo_empleados_id_cat_empleados = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_catalogo_empleados, id_cat_empleados, activo } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcatalogo_empleados.findOne({ where: {  id_catalogo_empleados : id_catalogo_empleados } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbcatalogo_empleados.update({ 
            id_usuario:id_usuario,
            id_cat_empleados:id_cat_empleados,
            activo:activo,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_catalogo_empleados : id_catalogo_empleados 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialcatalogo_empleadosid_cat_empleados(id_usuario,id_cat_empleados); 
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
      msg: 'Registro de la tabla : catalogo_empleados  ya almacenado', 
      }); 
   }
}
//Eliminar un Parametro catalogo_empleados--------------------------------------------------------------------------> 
export const delcatalogo_empleados = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcatalogo_empleados.findOne({ where: {id_catalogo_empleados : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcatalogo_empleados.update({
         activo : 0,
         },{
         where: {
            id_catalogo_empleados : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialcatalogo_empleados(id_usuario,id); 
      DelMasterHistorialcatalogo_empleados(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcatalogo_empleados = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcatalogo_empleados.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : catalogo_empleados',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcatalogo_empleados = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialcatalogo_empleados.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: catalogo_empleados',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcatalogo_empleados = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialcatalogo_empleados.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_empleados',
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcatalogo_empleadosid_cat_empleados = async (id_usuario:any,id_cat_empleados: any ) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbhistorialcatalogo_empleados.create({ 
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: catalogo_empleados',
         id_cat_empleados ,
      }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcatalogo_empleados = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcatalogo_empleados.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: catalogo_empleados',
          id_cat_empleados :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
   const time = timeNow(); 
   export const NewHistorialMastercatalogo_empleados = async (id_catalogo_empleados:any,id_usuario:any ) => {  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_empleados.create({ 
          id_usuario:id_usuario,
          id_catalogo_empleados:id_catalogo_empleados,
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
//Actualizar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
   export const actualizarHistorialMastercatalogo_empleados= async (id_usuario: any, id_catalogo_empleados:any,estatus : any, descripcion : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_empleados.create({ 
            id_usuario:id_usuario,
            id_catalogo_empleados,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
   export const DelMasterHistorialcatalogo_empleados= async (id_usuario: any ,id_catalogo_empleados:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_empleados.create({ 
            id_usuario:id_usuario,
            id_catalogo_empleados:id_catalogo_empleados,
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
export const actualizarEstatusDescripcioncatalogo_empleados = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_catalogo_empleados,id_usuario, estatus, descripcion } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcatalogo_empleados.findOne({ where: {  id_catalogo_empleados : id_catalogo_empleados } }); 
   if (params) { 
      try { 
         const resultado: any = await  dbcatalogo_empleados.update({ 
            estatus:estatus,
            descripcion:descripcion,
            createdAt:time, 
            updatedAt:time, 
            }, { 
            where: { 
                id_catalogo_empleados : id_catalogo_empleados 
            }, 
         }); 
         res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         actualizarHistorialMastercatalogo_empleados(id_usuario,id_catalogo_empleados,estatus, descripcion);
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
      msg: 'Registro de la tabla : catalogo_empleados  ya almacenado', 
      }); 
   }
}
export const actualizarDesactivadocatalogo_empleados = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcatalogo_empleados.findOne({ where: {id_catalogo_empleados : id } }); 
     
   if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbcatalogo_empleados.update({
         activo : 1,
         },{
         where: {
            id_catalogo_empleados : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      ActualDesactivadoHistorialcatalogo_empleados(id_usuario,id); 
      ActualDesactivadoMasterHistorialcatalogo_empleados(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialcatalogo_empleados = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialcatalogo_empleados.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario cambio el estatus de desactivado a activado :'+id,
          id_cat_empleados :id,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
   export const ActualDesactivadoMasterHistorialcatalogo_empleados= async (id_usuario: any ,id_catalogo_empleados:any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMastercatalogo_empleados.create({ 
            id_usuario:id_usuario,
            id_catalogo_empleados:id_catalogo_empleados,
            activo:1,
            accion:'El usuario cambio el estatus de desactivado a activado'+id_catalogo_empleados,
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
