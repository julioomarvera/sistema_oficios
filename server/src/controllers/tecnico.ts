import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json, Op } from 'sequelize';
import { dbtecnico } from '../models/tecnico';
import { dbseguimiento_tecnico } from '../models/seguimiento_tecnico';
import { dbhistorialtecnico } from '../models/historialtecnico';
import { dbhistorialMasterseguimiento_tecnico } from '../models/historialMasterseguimiento_tecnico';
import { dbasignacion } from '../models/asignacion';
import { dbusers_opdm } from '../models/users_opdm';
import { Tecnico } from '../interfaces/tecnicos.interfaces';

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
export const getAlltecnico = async (req: Request, res: Response) => {
   const { id_usuario, id_rol } = req.params;
   let listtecnico: any = '';
   if (id_rol == "1") {
      listtecnico = await dbtecnico.findAll({ where: { activo: 1 } });
   }
   else {
      listtecnico = await dbtecnico.findAll({ where: { activo: 1, id_usuario: id_usuario } });
   }
   res.json(listtecnico);
   if (id_usuario != null) {
      HistorialgetAlltecnico(id_usuario);
   }
}
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdtecnico = async (req: Request, res: Response) => {
   const { id, id_usuario, id_rol } = req.params;
   const findtecnico = await dbtecnico.findOne({ where: { id_tecnico: id } });
   try {
      if (findtecnico) {
         if (id_usuario != null) {
            HistorialgetRegByIdtecnico(id_usuario, id);
         }
         return res.json(findtecnico)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los tecnico. ',
         error
      });
   }
   console.log(findtecnico);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newtecnico = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_asignacion, id_seguimiento_tecnico, id_usuario, id_gestion_oficio, id_oficio, numero_oficio,
      id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion,
      numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento,
      fecha_contestacion, evidencia, documento_oficio, id_estatusseguimiento_tecnico, PaginaActual, finalizado,
      numero_empleado_tecnico, nombre_tecnico, foto_tecnico
   } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbtecnico.findAll({ where: { id_gestion_oficio: id_gestion_oficio } });
   if (params && params.length > 0) {
      const porcentajes = params.map(p => p.get('porcentaje_seguimiento') as number);
      const algunoMayor = porcentajes.some(p => p > porcentaje_seguimiento);
      if (algunoMayor) {
         return res.status(400).json({ msg: 'El porcentaje ingresado no puede ser menor  o igual que al seguimiento anterior' });
      }
      else {
         try {
            const resultado: any = await dbtecnico.create({
               id_usuario: id_usuario,
               id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante,
               id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion,
               fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio,
               id_estatusseguimiento_tecnico: id_estatusseguimiento_tecnico,
               nombre_tecnico,
               foto_tecnico,
               numero_empleado_tecnico: numero_empleado_tecnico,
               activo: 1,
               createdAt: time,
               updatedAt: time,
            });
            const id = (resultado.dataValues.id_tecnico);
            res.json({
               msg: `tecnico registro almacenado exitosamente`,
            })
            NewHistorialtecnico(id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
            actualizarseguimiento_tecnico(id_seguimiento_tecnico, id, PaginaActual, finalizado);
            actualizarEstadoActivoseguimiento_tecnico(id_seguimiento_tecnico);
            NewHistorialMasterseguimiento_tecnico(id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
            actualizarEstatusSeguimiento(id_asignacion, estatus_seguimiento);
            
         }
         catch (error) {
            res.status(404).json({
               msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
               error
            });
         }
      }
   }
   else {
      try {
         const resultado: any = await dbtecnico.create({
            id_usuario: id_usuario,
            id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante,
            id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion,
            fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio,
            id_estatusseguimiento_tecnico: id_estatusseguimiento_tecnico,
            nombre_tecnico,
            foto_tecnico,
            numero_empleado_tecnico: numero_empleado_tecnico,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         });
         const id = (resultado.dataValues.id_tecnico);
         res.json({
            msg: `tecnico registro almacenado exitosamente`,
         })
         NewHistorialtecnico(id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
         actualizarseguimiento_tecnico(id_seguimiento_tecnico, id, PaginaActual, finalizado);
         actualizarEstadoActivoseguimiento_tecnico(id_seguimiento_tecnico);
         NewHistorialMasterseguimiento_tecnico(id_usuario, id, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
         actualizarEstatusSeguimiento(id_asignacion, estatus_seguimiento);

      }
      catch (error) {
         res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
         });
      }
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updtecnico = async (req: Request, res: Response) => {


   const time = timeNow();
   const { id_asignacion, id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio,
      id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante,
      numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion,
      text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones,
      porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio, id_estatusseguimiento_tecnico } = req.body;

   console.log(req.body);
   //Validamos si existe el parametro en la base de datos 
   const params = await dbtecnico.findOne({ where: { id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio } });
   if (params) {
      try {
         const resultado: any = await dbtecnico.update({
            id_usuario: id_usuario,
            id_tecnico: id_tecnico,
            id_gestion_oficio: id_gestion_oficio,
            id_oficio: id_oficio,
            numero_oficio: numero_oficio,
            id_direcion_firmante: id_direcion_firmante,
            text_direccion_firmante: text_direccion_firmante,
            id_area_firmante: id_area_firmante,
            text_area_firmante: text_area_firmante,
            numero_empleado_firmante: numero_empleado_firmante,
            id_direccion_asignacion: id_direccion_asignacion,
            text_direccion_asignacion: text_direccion_asignacion,
            id_area_asignacion: id_area_asignacion,
            text_area_asignacion: text_area_asignacion,
            numero_empleado_asignacion: numero_empleado_asignacion,
            fecha_asignacion: fecha_asignacion,
            estatus_seguimiento: estatus_seguimiento,
            observaciones: observaciones,
            porcentaje_seguimiento: porcentaje_seguimiento,
            fecha_contestacion: fecha_contestacion,
            evidencia: evidencia,
            documento_oficio: documento_oficio,
            id_estatusseguimiento_tecnico: id_estatusseguimiento_tecnico,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         UpdHistorialtecnico(id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
         actualizarHistorialMasterseguimiento_tecnico(id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
         actualizarEstatusSeguimiento(id_asignacion, estatus_seguimiento);
      }
      catch (error) {
         res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de actualizar el registro' + error,
            error
         });
      }
   }
   else {
      return res.status(404).json({
         msg: 'Registro de la tabla : tecnico  ya almacenado',
      });
   }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const deltecnico = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbtecnico.findOne({ where: { id_tecnico: id } });
   const id_tecnico = findParam?.dataValues.id_tecnico;
   const id_gestion_oficio = findParam?.dataValues.id_gestion_oficio;
   const id_oficio = findParam?.dataValues.id_oficio;
   const numero_oficio = findParam?.dataValues.numero_oficio;
   const id_direcion_firmante = findParam?.dataValues.id_direcion_firmante;
   const text_direccion_firmante = findParam?.dataValues.text_direccion_firmante;
   const id_area_firmante = findParam?.dataValues.id_area_firmante;
   const text_area_firmante = findParam?.dataValues.text_area_firmante;
   const numero_empleado_firmante = findParam?.dataValues.numero_empleado_firmante;
   const id_direccion_asignacion = findParam?.dataValues.id_direccion_asignacion;
   const text_direccion_asignacion = findParam?.dataValues.text_direccion_asignacion;
   const id_area_asignacion = findParam?.dataValues.id_area_asignacion;
   const text_area_asignacion = findParam?.dataValues.text_area_asignacion;
   const numero_empleado_asignacion = findParam?.dataValues.numero_empleado_asignacion;
   const fecha_asignacion = findParam?.dataValues.fecha_asignacion;
   const estatus_seguimiento = findParam?.dataValues.estatus_seguimiento;
   const observaciones = findParam?.dataValues.observaciones;
   const porcentaje_seguimiento = findParam?.dataValues.porcentaje_seguimiento;
   const fecha_contestacion = findParam?.dataValues.fecha_contestacion;
   const evidencia = findParam?.dataValues.evidencia;
   const documento_oficio = findParam?.dataValues.documento_oficio;
   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbtecnico.destroy({
         where: {
            id_tecnico: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialtecnico(id_usuario, id_tecnico, id_gestion_oficio, id_oficio, numero_oficio, id_direcion_firmante, text_direccion_firmante, id_area_firmante, text_area_firmante, numero_empleado_firmante, id_direccion_asignacion, text_direccion_asignacion, id_area_asignacion, text_area_asignacion, numero_empleado_asignacion, fecha_asignacion, estatus_seguimiento, observaciones, porcentaje_seguimiento, fecha_contestacion, evidencia, documento_oficio);
      DelMasterHistorialtecnico(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAlltecnico = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialtecnico.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : tecnico',
         id_tecnico: '', id_gestion_oficio: '', id_oficio: '', numero_oficio: '', id_direcion_firmante: '', text_direccion_firmante: '', id_area_firmante: '', text_area_firmante: '', numero_empleado_firmante: '', id_direccion_asignacion: '', text_direccion_asignacion: '', id_area_asignacion: '', text_area_asignacion: '', numero_empleado_asignacion: '', fecha_asignacion: '', estatus_seguimiento: '', observaciones: '', porcentaje_seguimiento: '', fecha_contestacion: '', evidencia: '', documento_oficio: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdtecnico = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialtecnico.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: tecnico',
         id_tecnico: id, id_gestion_oficio: '', id_oficio: '', numero_oficio: '', id_direcion_firmante: '', text_direccion_firmante: '', id_area_firmante: '', text_area_firmante: '', numero_empleado_firmante: '', id_direccion_asignacion: '', text_direccion_asignacion: '', id_area_asignacion: '', text_area_asignacion: '', numero_empleado_asignacion: '', fecha_asignacion: '', estatus_seguimiento: '', observaciones: '', porcentaje_seguimiento: '', fecha_contestacion: '', evidencia: '', documento_oficio: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialtecnico = async (id_usuario: any, id: any, id_gestion_oficio: any, id_oficio: any, numero_oficio: any, id_direcion_firmante: any, text_direccion_firmante: any, id_area_firmante: any, text_area_firmante: any, numero_empleado_firmante: any, id_direccion_asignacion: any, text_direccion_asignacion: any, id_area_asignacion: any, text_area_asignacion: any, numero_empleado_asignacion: any, fecha_asignacion: any, estatus_seguimiento: any, observaciones: any, porcentaje_seguimiento: any, fecha_contestacion: any, evidencia: any, documento_oficio: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialtecnico.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: tecnico',
         id_tecnico: id, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialtecnico = async (id_usuario: any, id: any, id_gestion_oficio: any, id_oficio: any, numero_oficio: any, id_direcion_firmante: any, text_direccion_firmante: any, id_area_firmante: any, text_area_firmante: any, numero_empleado_firmante: any, id_direccion_asignacion: any, text_direccion_asignacion: any, id_area_asignacion: any, text_area_asignacion: any, numero_empleado_asignacion: any, fecha_asignacion: any, estatus_seguimiento: any, observaciones: any, porcentaje_seguimiento: any, fecha_contestacion: any, evidencia: any, documento_oficio: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialtecnico.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: tecnico',
         id_tecnico: id, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialtecnico = async (id_usuario: any, id: any, id_gestion_oficio: any, id_oficio: any, numero_oficio: any, id_direcion_firmante: any, text_direccion_firmante: any, id_area_firmante: any, text_area_firmante: any, numero_empleado_firmante: any, id_direccion_asignacion: any, text_direccion_asignacion: any, id_area_asignacion: any, text_area_asignacion: any, numero_empleado_asignacion: any, fecha_asignacion: any, estatus_seguimiento: any, observaciones: any, porcentaje_seguimiento: any, fecha_contestacion: any, evidencia: any, documento_oficio: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialtecnico.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: tecnico',
         id_tecnico: id, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
      }).then();
   }
   catch (error) {
   }
}
//actualizar en la tabla seguimiento_tecnico ----------------------------------------------------------------------> 
export const actualizarseguimiento_tecnico = async (id_seguimiento_tecnico: any, id: any, PaginaActual: any, finalizado: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbseguimiento_tecnico.update({
         id_tecnico: id,
         PaginaActual: PaginaActual,
         finalizado: finalizado,
      }, {
         where: {
            id_seguimiento_tecnico: id_seguimiento_tecnico
         },
      }).then();
   }
   catch (error) {
   }
}
//almacenar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
export const NewHistorialMasterseguimiento_tecnico = async (id_usuario: any, id_tecnico: any, id_gestion_oficio: any, id_oficio: any, numero_oficio: any, id_direcion_firmante: any, text_direccion_firmante: any, id_area_firmante: any, text_area_firmante: any, numero_empleado_firmante: any, id_direccion_asignacion: any, text_direccion_asignacion: any, id_area_asignacion: any, text_area_asignacion: any, numero_empleado_asignacion: any, fecha_asignacion: any, estatus_seguimiento: any, observaciones: any, porcentaje_seguimiento: any, fecha_contestacion: any, evidencia: any, documento_oficio: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterseguimiento_tecnico.create({
         id_usuario: id_usuario,
         id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
         activo: 1,
         accion: 'El usuario dio de alta el registro',
      }).then();
   }
   catch (error) {
   }
}
//Actualizar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
export const actualizarHistorialMasterseguimiento_tecnico = async (id_usuario: any, id_tecnico: any, id_gestion_oficio: any, id_oficio: any, numero_oficio: any, id_direcion_firmante: any, text_direccion_firmante: any, id_area_firmante: any, text_area_firmante: any, numero_empleado_firmante: any, id_direccion_asignacion: any, text_direccion_asignacion: any, id_area_asignacion: any, text_area_asignacion: any, numero_empleado_asignacion: any, fecha_asignacion: any, estatus_seguimiento: any, observaciones: any, porcentaje_seguimiento: any, fecha_contestacion: any, evidencia: any, documento_oficio: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterseguimiento_tecnico.create({
         id_usuario: id_usuario,
         id_tecnico: id_tecnico, id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficio, numero_oficio: numero_oficio, id_direcion_firmante: id_direcion_firmante, text_direccion_firmante: text_direccion_firmante, id_area_firmante: id_area_firmante, text_area_firmante: text_area_firmante, numero_empleado_firmante: numero_empleado_firmante, id_direccion_asignacion: id_direccion_asignacion, text_direccion_asignacion: text_direccion_asignacion, id_area_asignacion: id_area_asignacion, text_area_asignacion: text_area_asignacion, numero_empleado_asignacion: numero_empleado_asignacion, fecha_asignacion: fecha_asignacion, estatus_seguimiento: estatus_seguimiento, observaciones: observaciones, porcentaje_seguimiento: porcentaje_seguimiento, fecha_contestacion: fecha_contestacion, evidencia: evidencia, documento_oficio: documento_oficio,
         activo: 1,
         accion: 'El usuario actualizo el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Desactivar en la tabla Historial Master seguimiento_tecnico ----------------------------------------------------------------------> 
export const DelMasterHistorialtecnico = async (id_usuario: any, id_tecnico: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterseguimiento_tecnico.create({
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
//actualizar Estado Activo en la tabla seguimiento_tecnico ----------------------------------------------------------------------> 
export const actualizarEstadoActivoseguimiento_tecnico = async (id_seguimiento_tecnico: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbseguimiento_tecnico.update({
         activo: 1,
      }, {
         where: {
            id_seguimiento_tecnico: id_seguimiento_tecnico
         },
      }).then();
   }
   catch (error) {
   }
}


//actualizar Estado Activo en la tabla seguimiento_tecnico ----------------------------------------------------------------------> 
export const actualizarEstatusSeguimiento = async (id_asignacion: any, estatus_seguimiento: any) => {
   const time = timeNow();

   //mapa de estatus :
   // 1 =  nuevo
   // 2 =  En preoceso
   // 3 =  En pausa
   // 4 =  Concluido



   try {
      const resultado: any = await dbasignacion.update({
         estatus_oficio: estatus_seguimiento,
      }, {
         where: {
            id_asignacion: id_asignacion
         },
      }).then();
   }
   catch (error) {
   }
}
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const get_oficio_tecnico_by_id_gestion_oficio_id_oficios = async (req: Request, res: Response) => {
   const { id_gestion_oficio, id_oficios } = req.params;
   let findtecnico = "";
   try {
      let findtecnico = await dbtecnico.findOne({
         where: { id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficios },
         order: [['porcentaje_seguimiento', 'DESC']],
      });

      if (!findtecnico) {
         return res.status(404).json({ msg: 'Técnico no encontrado.' });
      }

      // 2. Buscar usuario por número de empleado
      const numeroEmpleado = findtecnico.dataValues.numero_empleado_tecnico;
      const userData = await dbusers_opdm.findOne({
         where: { numero_empleado: numeroEmpleado },
         attributes: ['foto', 'nombre', 'apepa', 'apema'] // solo traemos la foto
      });

      const nombre = userData?.dataValues.nombre || '';
      const apepa = userData?.dataValues.apepa || '';
      const apema = userData?.dataValues.apema || '';

      // 3. Fusionar datos
      const response = {
         ...findtecnico.toJSON(),
         foto_tecnico: userData?.dataValues.foto || null,
         nombre_tecnico: `${nombre} ${apepa} ${apema}`.trim()
      };

      return res.json(response);

   } catch (error) {
      return res.status(500).json({
         msg: 'Ocurrió un error al obtener la información del técnico.',
         error
      });
   }

}

export const get_oficio_tecnico_by_id_gestion_oficio_id_oficios_arreglo = async (
   req: Request,
   res: Response
) => {
   const { id_gestion_oficio, id_oficios } = req.params;

   try {
      const tecnicos = await dbtecnico.findAll({
         where: { id_gestion_oficio, id_oficio: id_oficios },

         raw: true
      });

      if (tecnicos.length === 0) {
         return res.status(404).json({ msg: 'No se encontraron técnicos.' });
      }

      const numerosEmpleado = tecnicos.map(
         (t: any) => t.numero_empleado_tecnico
      );

      const users = await dbusers_opdm.findAll({
         where: { numero_empleado: { [Op.in]: numerosEmpleado } },
         attributes: ['numero_empleado', 'foto', 'nombre', 'apepa', 'apema'],
         raw: true
      });

      const userMap = new Map<string, any>(
         users.map((u: any) => [u.numero_empleado, u])
      );

      const response = tecnicos.map((tech: any) => {
         const usr = userMap.get(tech.numero_empleado_tecnico) || {};
         const nombreCompleto = [usr.nombre, usr.apepa, usr.apema]
            .filter(Boolean)
            .join(' ')
            .trim();

         return {
            ...tech,
            foto_tecnico: usr.foto || null,
            nombre_tecnico: nombreCompleto
         };
      });

      return res.json(response);

   } catch (error) {
      return res.status(500).json({
         msg: 'Ocurrió un error al obtener la información de los técnicos.',
         error
      });
   }
};

export const get_oficio_tecnico_by_id_gestion_oficio_id_oficios_numero_empleado = async (
   req: Request,
   res: Response
) => {
   const { id_gestion_oficio, id_oficios, numero_empleado } = req.params;

   try {
      const tecnicos = await dbtecnico.findAll({
         where: { id_gestion_oficio: id_gestion_oficio, id_oficio: id_oficios, numero_empleado_tecnico: numero_empleado },
         raw: true
      });
      res.json(tecnicos);
   } catch (error) {
      return res.status(500).json({
         msg: 'Ocurrió un error al obtener la información de los técnicos.',
         error
      });
   }
}

export const get_estatus_oficio = async (req: Request, res: Response) => {
   const { id_gestion_oficio, id_oficios } = req.params;

   // Validación de parámetros
   if (!id_gestion_oficio || !id_oficios) {
      return res.status(400).json({ msg: 'Faltan parámetros requeridos.' });
   }

   try {
      // Consulta de técnicos
      const result = await dbtecnico.findAll({
         where: { id_gestion_oficio, id_oficio: id_oficios, activo:1 },
         order: [['fecha_asignacion', 'DESC']],
         raw: true
      });

      const tecnicos = result as unknown as Tecnico[];


      // Filtrado de técnicos únicos por número de empleado
      const tecnicosUnicos: Record<string, Tecnico> = {};
      tecnicos.forEach(t => {
         if (!tecnicosUnicos[t.numero_empleado_tecnico]) {
            tecnicosUnicos[t.numero_empleado_tecnico] = t;
         }
      });

      const tecnicosFinales = Object.values(tecnicosUnicos);
      const promedioAvance = calcularPromedioAvance(tecnicosFinales);

      // Respuesta enriquecida
      res.json({
         tecnicos: tecnicosFinales,
         promedioAvance,
         totalTecnicos: tecnicosFinales.length,
         gestion: id_gestion_oficio,
         oficio: id_oficios
      });

   } catch (error) {
      return res.status(500).json({
         msg: 'Ocurrió un error al obtener la información de los técnicos.',
         error
      });
   }
};

// Helper para calcular el promedio de avance
function calcularPromedioAvance(tecnicos: Tecnico[]): number {
   const avances = tecnicos.map(t => t.porcentaje_seguimiento || 0);
   const total = avances.reduce((sum, val) => sum + val, 0);
   return avances.length ? Math.round(total / avances.length) : 0;
}


