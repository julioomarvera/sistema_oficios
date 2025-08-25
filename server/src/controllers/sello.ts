import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dbsello } from '../models/sello';
import { dbevidencia_sello } from '../models/evidencia_sello';
import { dbhistorialsello } from '../models/historialsello';
import { dbhistorialMasterevidencia_sello } from '../models/historialMasterevidencia_sello';

//extraer la hora para el sistema //-------------------------------------------------------------> 

export const timeNow = () => {
   const now = new Date(); // Jul 2021 Friday 
   const fecha = (now.toLocaleString('en-US', { timeZone: 'America/Mexico_City', dateStyle: 'short', timeStyle: 'short' }));
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
export const getAllsello = async (req: Request, res: Response) => {
   const { id_usuario, id_rol } = req.params;
   let listsello: any = '';
   if (id_rol == "1") {
      listsello = await dbsello.findAll({ where: { activo: 1 } });
   }
   else {
      listsello = await dbsello.findAll({ where: { activo: 1, id_usuario: id_usuario } });
   }
   res.json(listsello);
   if (id_usuario != null) {
      HistorialgetAllsello(id_usuario);
   }
}

//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getselloByIdgestonOficios = async (req: Request, res: Response) => {
   const { id_gestion_oficios, id_usuario } = req.params;
   console.log(req.params);

   let listsello: any = '';
   listsello = await dbsello.findOne({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios, id_usuario: id_usuario } });
   res.json(listsello);
   if (id_usuario != null) {
      HistorialgetAllsello(id_usuario);
   }
}




//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdsello = async (req: Request, res: Response) => {
   const { id, id_usuario, id_rol } = req.params;
   const findsello = await dbsello.findOne({ where: { id_sello: id } });
   try {
      if (findsello) {
         if (id_usuario != null) {
            HistorialgetRegByIdsello(id_usuario, id);
         }
         return res.json(findsello)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los sello. ',
         error
      });
   }
   console.log(findsello);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newsello = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_evidencia_sello, id_usuario, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, 
           numero_oficio, fecha_creacion, nombre_documento_oficio, 
           nombre_documento_sello_digital, nombre_documento_sello, id_estatusevidencia_sello, PaginaActual, finalizado,
           numero_empleado_secretaria,foto_secretaria } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbsello.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
   if (params) {
      const id_sello = params.dataValues.id_sello;
      const actualizar = await Actualizarsello(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, 
                                               id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio,
                                               nombre_documento_sello_digital, nombre_documento_sello, id_estatusevidencia_sello,
                                             );
      if (actualizar == 1) {
         return res.status(404).json({
            msg: 'Registro de la tabla : sello  actualizado correctamente',
         });
      }
      else{
         return res.status(404).json({
            msg: 'Registro de la tabla : sello  ya almacenado',
         });
      }
   }
   try {
      const resultado: any = await dbsello.create({
         id_usuario: id_usuario,
         id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, 
         numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, 
         nombre_documento_sello,
         id_estatusevidencia_sello: id_estatusevidencia_sello,
         numero_empleado_secretaria,
         foto_secretaria,
         activo: 1,
         createdAt: time,
         updatedAt: time,
      }).then();
      const id = (resultado.dataValues.id_sello);
      res.json({
         msg: `sello registro almacenado exitosamente`,
      })
      NewHistorialsello(id_usuario, id, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
      actualizarevidencia_sello(id_evidencia_sello, id, PaginaActual, finalizado);
      actualizarEstadoActivoevidencia_sello(id_evidencia_sello);
      NewHistorialMasterevidencia_sello(id_usuario, id, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);

   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updsello = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello, id_estatusevidencia_sello } = req.body;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbsello.findOne({ where: { id_sello: id_sello } });
   if (params) {
      try {
         const resultado: any = await dbsello.update({
            id_usuario: id_usuario,
            id_sello: id_sello,
            id_gestion_oficios: id_gestion_oficios,
            id_direccion: id_direccion,
            text_direccion: text_direccion,
            id_area: id_area,
            text_area: text_area,
            numero_oficio: numero_oficio,
            fecha_creacion: fecha_creacion,
            nombre_documento_oficio: nombre_documento_oficio,
            nombre_documento_sello_digital: nombre_documento_sello_digital,
            nombre_documento_sello: nombre_documento_sello,
            id_estatusevidencia_sello: id_estatusevidencia_sello,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_sello: id_sello
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         UpdHistorialsello(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
         actualizarHistorialMasterevidencia_sello(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
      }
      catch (error) {
         res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
            error
         });
      }
   }
   else {
      return res.status(404).json({
         msg: 'Registro de la tabla : sello  ya almacenado',
      });
   }
}

//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const Actualizarsello = async (id_usuario: number, id_sello: number, id_gestion_oficios: number, id_direccion: number, text_direccion: string,
   id_area: number, text_area: string, numero_oficio: string, fecha_creacion: string, nombre_documento_oficio: string,
   nombre_documento_sello_digital: string, nombre_documento_sello: string, id_estatusevidencia_sello: number) => {
   const time = timeNow();
   //Validamos si existe el parametro en la base de datos 
   const params = await dbsello.findOne({ where: { id_sello: id_sello, id_gestion_oficios: id_gestion_oficios } });
   if (params) {
      try {
         const resultado: any = await dbsello.update({
            id_usuario: id_usuario,
            id_sello: id_sello,
            id_gestion_oficios: id_gestion_oficios,
            id_direccion: id_direccion,
            text_direccion: text_direccion,
            id_area: id_area,
            text_area: text_area,
            numero_oficio: numero_oficio,
            fecha_creacion: fecha_creacion,
            nombre_documento_oficio: nombre_documento_oficio,
            nombre_documento_sello_digital: nombre_documento_sello_digital,
            nombre_documento_sello: nombre_documento_sello,
            id_estatusevidencia_sello: id_estatusevidencia_sello,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_sello: id_sello, id_gestion_oficios: id_gestion_oficios
            },
         });
         UpdHistorialsello(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
         actualizarHistorialMasterevidencia_sello(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
         return 1;
      }
      catch (error) {
         return 0;
      }
   }
   else {
      return 0;
   }
}

//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delsello = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbsello.findOne({ where: { id_sello: id } });
   const id_sello = findParam?.dataValues.id_sello;
   const id_gestion_oficios = findParam?.dataValues.id_gestion_oficios;
   const id_direccion = findParam?.dataValues.id_direccion;
   const text_direccion = findParam?.dataValues.text_direccion;
   const id_area = findParam?.dataValues.id_area;
   const text_area = findParam?.dataValues.text_area;
   const numero_oficio = findParam?.dataValues.numero_oficio;
   const fecha_creacion = findParam?.dataValues.fecha_creacion;
   const nombre_documento_oficio = findParam?.dataValues.nombre_documento_oficio;
   const nombre_documento_sello_digital = findParam?.dataValues.nombre_documento_sello_digital;
   const nombre_documento_sello = findParam?.dataValues.nombre_documento_sello;
   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbsello.destroy({
         where: {
            id_sello: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialsello(id_usuario, id_sello, id_gestion_oficios, id_direccion, text_direccion, id_area, text_area, numero_oficio, fecha_creacion, nombre_documento_oficio, nombre_documento_sello_digital, nombre_documento_sello);
      DelMasterHistorialsello(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllsello = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialsello.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : sello',
         id_sello: '', id_gestion_oficios: '', id_direccion: '', text_direccion: '', id_area: '', text_area: '', numero_oficio: '', fecha_creacion: '', nombre_documento_oficio: '', nombre_documento_sello_digital: '', nombre_documento_sello: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdsello = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialsello.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: sello',
         id_sello: id, id_gestion_oficios: '', id_direccion: '', text_direccion: '', id_area: '', text_area: '', numero_oficio: '', fecha_creacion: '', nombre_documento_oficio: '', nombre_documento_sello_digital: '', nombre_documento_sello: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialsello = async (id_usuario: any, id: any, id_gestion_oficios: any, id_direccion: any, text_direccion: any, id_area: any, text_area: any, numero_oficio: any, fecha_creacion: any, nombre_documento_oficio: any, nombre_documento_sello_digital: any, nombre_documento_sello: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialsello.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: sello',
         id_sello: id, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialsello = async (id_usuario: any, id: any, id_gestion_oficios: any, id_direccion: any, text_direccion: any, id_area: any, text_area: any, numero_oficio: any, fecha_creacion: any, nombre_documento_oficio: any, nombre_documento_sello_digital: any, nombre_documento_sello: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialsello.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: sello',
         id_sello: id, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialsello = async (id_usuario: any, id: any, id_gestion_oficios: any, id_direccion: any, text_direccion: any, id_area: any, text_area: any, numero_oficio: any, fecha_creacion: any, nombre_documento_oficio: any, nombre_documento_sello_digital: any, nombre_documento_sello: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialsello.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: sello',
         id_sello: id, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
      }).then();
   }
   catch (error) {
   }
}
//actualizar en la tabla evidencia_sello ----------------------------------------------------------------------> 
export const actualizarevidencia_sello = async (id_evidencia_sello: any, id: any, PaginaActual: any, finalizado: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbevidencia_sello.update({
         id_sello: id,
         PaginaActual: PaginaActual,
         finalizado: finalizado,
      }, {
         where: {
            id_evidencia_sello: id_evidencia_sello
         },
      }).then();
   }
   catch (error) {
   }
}
//almacenar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
export const NewHistorialMasterevidencia_sello = async (id_usuario: any, id_sello: any, id_gestion_oficios: any, id_direccion: any, text_direccion: any, id_area: any, text_area: any, numero_oficio: any, fecha_creacion: any, nombre_documento_oficio: any, nombre_documento_sello_digital: any, nombre_documento_sello: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterevidencia_sello.create({
         id_usuario: id_usuario,
         id_sello: id_sello, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
         activo: 1,
         accion: 'El usuario dio de alta el registro',
      }).then();
   }
   catch (error) {
   }
}
//Actualizar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
export const actualizarHistorialMasterevidencia_sello = async (id_usuario: any, id_sello: any, id_gestion_oficios: any, id_direccion: any, text_direccion: any, id_area: any, text_area: any, numero_oficio: any, fecha_creacion: any, nombre_documento_oficio: any, nombre_documento_sello_digital: any, nombre_documento_sello: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterevidencia_sello.create({
         id_usuario: id_usuario,
         id_sello: id_sello, id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, text_area: text_area, numero_oficio: numero_oficio, fecha_creacion: fecha_creacion, nombre_documento_oficio: nombre_documento_oficio, nombre_documento_sello_digital: nombre_documento_sello_digital, nombre_documento_sello: nombre_documento_sello,
         activo: 1,
         accion: 'El usuario actualizo el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Desactivar en la tabla Historial Master evidencia_sello ----------------------------------------------------------------------> 
export const DelMasterHistorialsello = async (id_usuario: any, id_sello: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterevidencia_sello.create({
         id_usuario: id_usuario,
         activo: 0,
         accion: 'El usuario elimino el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//actualizar Estado Activo en la tabla evidencia_sello ----------------------------------------------------------------------> 
export const actualizarEstadoActivoevidencia_sello = async (id_evidencia_sello: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbevidencia_sello.update({
         activo: 1,
      }, {
         where: {
            id_evidencia_sello: id_evidencia_sello
         },
      }).then();
   }
   catch (error) {
   }
}


//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getInformacionSello = async (req: Request, res: Response) => {
   const { id_gestion_oficio,id_direccion,id_area,numero_empleado } = req.params;
   console.log(req.params);

   let listsello: any = '';
   listsello = await dbsello.findOne(
      { where: 
         { activo: 1, id_gestion_oficios: id_gestion_oficio, id_direccion: id_direccion, id_area: id_area,numero_empleado_secretaria:numero_empleado  } 
      });
   res.json(listsello);
}

