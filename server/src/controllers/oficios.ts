import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dboficios } from '../models/oficios';
import { dbgestion_oficios } from '../models/gestion_oficios';
import { dbhistorialoficios } from '../models/historialoficios';
import { dbhistorialMastergestion_oficios } from '../models/historialMastergestion_oficios';
import { dbcat_oficio } from '../models/cat_oficio';
import { dbcat_tipo_oficios } from '../models/cat_tipo_oficios';
import { dbcat_numero_oficios } from '../models/cat_numero_oficios';
import { dbcat_destinatario } from '../models/cat_destinatario';

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
export const getAlloficios = async (req: Request, res: Response) => {
   const { id_usuario, id_rol } = req.params;
   let listoficios: any = '';
   if (id_rol == "1") {
      listoficios = await dboficios.findAll({ where: { activo: 1 } });
   }
   else {
      listoficios = await dboficios.findAll({ where: { activo: 1, id_usuario: id_usuario } });
   }
   res.json(listoficios);
   if (id_usuario != null) {
      HistorialgetAlloficios(id_usuario);
   }
}


//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getOficio_by_id_oficio = async (req: Request, res: Response) => {
   const { id_oficios } = req.params;
   let listoficios: any = '';
   listoficios = await dboficios.findOne({ where: { activo: 1, id_oficios: id_oficios } });
   res.json(listoficios);

}
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdoficios = async (req: Request, res: Response) => {
   const { id, id_usuario, id_rol } = req.params;
   const findoficios = await dboficios.findOne({ where: { id_oficios: id } });
   try {
      if (findoficios) {
         if (id_usuario != null) {
            HistorialgetRegByIdoficios(id_usuario, id);
         }
         return res.json(findoficios)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los oficios. ',
         error
      });
   }
   console.log(findoficios);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newoficios = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_gestion_oficios, id_usuario, oficio, text_oficio, tipo_oficio, text_tipo, folio, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro, id_estatusgestion_oficios, PaginaActual, finalizado } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dboficios.findOne({ where: { numero_oficio: numero_oficio } });
   if (params) {
      return res.status(404).json({
         msg: 'Número de oficio ya almacenado anteriormente',
      });
   }
   try {
      const resultado: any = await dboficios.create({
         id_usuario: id_usuario,
         oficio, text_oficio, tipo_oficio, text_tipo, folio, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro,
         id_estatusgestion_oficios: id_estatusgestion_oficios,
         activo: 1,
         createdAt: time,
         updatedAt: time,
      }).then();
      const id = (resultado.dataValues.id_oficios);
      res.json({
         msg: `oficios registro almacenado exitosamente`,
      })
      NewHistorialoficios(id_usuario, id, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
      actualizargestion_oficios(id_gestion_oficios, id, PaginaActual, finalizado);
      actualizarEstadoActivogestion_oficios(id_gestion_oficios);
      NewHistorialMastergestion_oficios(id_usuario, id, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
      actualizar_id_oficio_destinatarios(id_gestion_oficios,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updoficios = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, folio, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro, id_estatusgestion_oficios } = req.body;
   //Validamos si existe el parametro en la base de datos 
   const params = await dboficios.findOne({ where: { id_oficios: id_oficios } });
   if (params) {
      try {
         const resultado: any = await dboficios.update({
            id_usuario: id_usuario,
            id_oficios: id_oficios,
            oficio: oficio,
            text_oficio: text_oficio,
            tipo_oficio: tipo_oficio,
            text_tipo: text_tipo,
            folio: folio,
            numero_oficio: numero_oficio,
            fecha_hora: fecha_hora,
            caso_cop: caso_cop,
            asunto: asunto,
            contenido: contenido,
            archivo_oficio: archivo_oficio,
            otro: otro,
            id_estatusgestion_oficios: id_estatusgestion_oficios,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_oficios: id_oficios
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         UpdHistorialoficios(id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
         actualizarHistorialMastergestion_oficios(id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
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
         msg: 'Registro de la tabla : oficios  ya almacenado',
      });
   }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const deloficios = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dboficios.findOne({ where: { id_oficios: id } });
   const id_oficios = findParam?.dataValues.id_oficios;
   const oficio = findParam?.dataValues.oficio;
   const text_oficio = findParam?.dataValues.text_oficio;
   const tipo_oficio = findParam?.dataValues.tipo_oficio;
   const text_tipo = findParam?.dataValues.text_tipo;
   const numero_oficio = findParam?.dataValues.numero_oficio;
   const fecha_hora = findParam?.dataValues.fecha_hora;
   const caso_cop = findParam?.dataValues.caso_cop;
   const asunto = findParam?.dataValues.asunto;
   const contenido = findParam?.dataValues.contenido;
   const archivo_oficio = findParam?.dataValues.archivo_oficio;
   const otro = findParam?.dataValues.otro;
   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dboficios.destroy({
         where: {
            id_oficios: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialoficios(id_usuario, id_oficios, oficio, text_oficio, tipo_oficio, text_tipo, numero_oficio, fecha_hora, caso_cop, asunto, contenido, archivo_oficio, otro);
      DelMasterHistorialoficios(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAlloficios = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialoficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : oficios',
         id_oficios: '', oficio: '', text_oficio: '', tipo_oficio: '', text_tipo: '', numero_oficio: '', fecha_hora: '', caso_cop: '', asunto: '', contenido: '', archivo_oficio: '', otro: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdoficios = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialoficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: oficios',
         id_oficios: id, oficio: '', text_oficio: '', tipo_oficio: '', text_tipo: '', numero_oficio: '', fecha_hora: '', caso_cop: '', asunto: '', contenido: '', archivo_oficio: '', otro: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialoficios = async (id_usuario: any, id: any, oficio: any, text_oficio: any, tipo_oficio: any, text_tipo: any, numero_oficio: any, fecha_hora: any, caso_cop: any, asunto: any, contenido: any, archivo_oficio: any, otro: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialoficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: oficios',
         id_oficios: id, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialoficios = async (id_usuario: any, id: any, oficio: any, text_oficio: any, tipo_oficio: any, text_tipo: any, numero_oficio: any, fecha_hora: any, caso_cop: any, asunto: any, contenido: any, archivo_oficio: any, otro: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialoficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: oficios',
         id_oficios: id, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialoficios = async (id_usuario: any, id: any, oficio: any, text_oficio: any, tipo_oficio: any, text_tipo: any, numero_oficio: any, fecha_hora: any, caso_cop: any, asunto: any, contenido: any, archivo_oficio: any, otro: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialoficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: oficios',
         id_oficios: id, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
      }).then();
   }
   catch (error) {
   }
}
//actualizar en la tabla gestion_oficios ----------------------------------------------------------------------> 
export const actualizargestion_oficios = async (id_gestion_oficios: any, id: any, PaginaActual: any, finalizado: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbgestion_oficios.update({
         id_oficios: id,
         PaginaActual: PaginaActual,
         finalizado: finalizado,
      }, {
         where: {
            id_gestion_oficios: id_gestion_oficios
         },
      }).then();
   }
   catch (error) {
   }
}
//almacenar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
export const NewHistorialMastergestion_oficios = async (id_usuario: any, id_oficios: any, oficio: any, text_oficio: any, tipo_oficio: any, text_tipo: any, numero_oficio: any, fecha_hora: any, caso_cop: any, asunto: any, contenido: any, archivo_oficio: any, otro: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.create({
         id_usuario: id_usuario,
         id_oficios: id_oficios, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
         activo: 1,
         accion: 'El usuario dio de alta el registro',
      }).then();
   }
   catch (error) {
   }
}
//Actualizar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
export const actualizarHistorialMastergestion_oficios = async (id_usuario: any, id_oficios: any, oficio: any, text_oficio: any, tipo_oficio: any, text_tipo: any, numero_oficio: any, fecha_hora: any, caso_cop: any, asunto: any, contenido: any, archivo_oficio: any, otro: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.create({
         id_usuario: id_usuario,
         id_oficios: id_oficios, oficio: oficio, text_oficio: text_oficio, tipo_oficio: tipo_oficio, text_tipo: text_tipo, numero_oficio: numero_oficio, fecha_hora: fecha_hora, caso_cop: caso_cop, asunto: asunto, contenido: contenido, archivo_oficio: archivo_oficio, otro: otro,
         activo: 1,
         accion: 'El usuario actualizo el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Desactivar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
export const DelMasterHistorialoficios = async (id_usuario: any, id_oficios: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.create({
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
//actualizar Estado Activo en la tabla gestion_oficios ----------------------------------------------------------------------> 
export const actualizarEstadoActivogestion_oficios = async (id_gestion_oficios: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbgestion_oficios.update({
         activo: 1,
      }, {
         where: {
            id_gestion_oficios: id_gestion_oficios
         },
      }).then();
   }
   catch (error) {
   }
}

//actualizar en la tabla gestion_oficios ----------------------------------------------------------------------> 
export const actualizar_id_oficio_destinatarios = async (id_gestion_oficios: any, id_oficio: any,) => {
   const time = timeNow();
   try {
      const resultado: any = await dbcat_destinatario.update({
         estatus : 0,
         id_oficio: id_oficio,
      }, {
         where: {
            id_gestion_oficios: id_gestion_oficios
         },
      }).then();
   }
   catch (error) {
   }
}
