import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dbgestion_oficios } from '../models/gestion_oficios';
import { dbhistorialgestion_oficios } from '../models/historialgestion_oficios';
import { dbhistorialMastergestion_oficios } from '../models/historialMastergestion_oficios';
const { Sequelize, DataTypes } = require('sequelize');
import { dboficios } from '../models/oficios';
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
export const getAllgestion_oficios = async (req: Request, res: Response) => {
   const { id_usuario, id_rol, estatus, activo } = req.params;
   let listgestion_oficios: any = '';
   if (id_rol == "1") {
      if (activo == "2") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "1" && estatus == "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo },
               include: [{ model: dboficios },
               ],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro'],
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "0" && estatus == "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo },
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "1" && estatus != "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo, estatus: estatus },
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "0" && estatus != "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo, estatus: estatus },
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
   }
   else {
      if (activo == "2") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { id_usuario: id_usuario },
               include: [{ model: dboficios },
               { model: dbcat_destinatario },
               ],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro'],
                  [Sequelize.col('ws_cat_destinatario'), 'foto']
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "1" && estatus == "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo, id_usuario: id_usuario },
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "0" && estatus == "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo, id_usuario: id_usuario },
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "1" && estatus != "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
      else if (activo == "0" && estatus != "0") {
         listgestion_oficios = await dbgestion_oficios.findAll(
            {
               where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
               include: [{
                  model: dboficios,
               }],
               attributes: [
                  'id_gestion_oficios',
                  'id_usuario',
                  'finalizado',
                  'estatus',
                  'descripcion',
                  'activo',
                  'createdAt',
                  [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
                  [Sequelize.col('ws_oficio.oficio'), 'oficio'],
                  [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
                  [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
                  [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
                  [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
                  [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
                  [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
                  [Sequelize.col('ws_oficio.asunto'), 'asunto'],
                  [Sequelize.col('ws_oficio.contenido'), 'contenido'],
                  [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
                  [Sequelize.col('ws_oficio.otro'), 'otro']
               ],
               raw: true,
               nest: false,
            })
      }
   }
   res.json(listgestion_oficios);
   if (id_usuario != null) {
      HistorialgetAllgestion_oficios(id_usuario);
   }
}
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdgestion_oficios = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   const findgestion_oficios = await dbgestion_oficios.findOne({ where: { id_gestion_oficios: id } });
   try {
      if (findgestion_oficios) {
         if (id_usuario != null) {
            HistorialgetRegByIdgestion_oficios(id_usuario, id);
         }
         return res.json(findgestion_oficios)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los gestion_oficios. ',
         error
      });
   }
   console.log(findgestion_oficios);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newgestion_oficios = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario } = req.params;
   console.log("11111111111111111111111111111111111111111111111111111111111");

   try {
      const resultado: any = await dbgestion_oficios.create({
         id_usuario: id_usuario,
         estatus: 1,
         activo: 0,
         PaginaActual: '/index/nuevooficios',
         finalizado: 0,
         createdAt: time,
         updatedAt: time,
      }).then();
      const id = (resultado.dataValues.id_gestion_oficios);
      res.json({
         msg: id,
      })
      NewHistorialgestion_oficios(id_usuario, id);
      NewHistorialMastergestion_oficios(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}
//Actualizar el parametro con Id de : id_oficios--------------------------------------------------------------------------> 
export const updgestion_oficios_id_oficios = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario, id_gestion_oficios, id_oficios, activo } = req.body;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbgestion_oficios.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
   if (params) {
      try {
         const resultado: any = await dbgestion_oficios.update({
            id_usuario: id_usuario,
            id_oficios: id_oficios,
            activo: activo,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_gestion_oficios: id_gestion_oficios
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         UpdHistorialgestion_oficiosid_oficios(id_usuario, id_oficios);
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
         msg: 'Registro de la tabla : gestion_oficios  ya almacenado',
      });
   }
}
//Eliminar un Parametro gestion_oficios--------------------------------------------------------------------------> 
export const delgestion_oficios = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbgestion_oficios.findOne({ where: { id_gestion_oficios: id } });

   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbgestion_oficios.update({
         activo: 0,
      }, {
         where: {
            id_gestion_oficios: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialgestion_oficios(id_usuario, id);
      DelMasterHistorialgestion_oficios(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllgestion_oficios = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialgestion_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : gestion_oficios',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdgestion_oficios = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialgestion_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: gestion_oficios',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialgestion_oficios = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialgestion_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: gestion_oficios',
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialgestion_oficiosid_oficios = async (id_usuario: any, id_oficios: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialgestion_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: gestion_oficios',
         id_oficios,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialgestion_oficios = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialgestion_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: gestion_oficios',
         id_oficios: id,
      }).then();
   }
   catch (error) {
   }
}
//almacenar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
const time = timeNow();
export const NewHistorialMastergestion_oficios = async (id_gestion_oficios: any, id_usuario: any) => {
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.create({
         id_usuario: id_usuario,
         id_gestion_oficios: id_gestion_oficios,
         estatus: 1,
         activo: 1,
         accion: 'El usuario dio de alta el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
export const actualizarHistorialMastergestion_oficios = async (id_usuario: any, id_gestion_oficios: any, estatus: any, descripcion: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.create({
         id_usuario: id_usuario,
         id_gestion_oficios,
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
export const DelMasterHistorialgestion_oficios = async (id_usuario: any, id_gestion_oficios: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.create({
         id_usuario: id_usuario,
         id_gestion_oficios: id_gestion_oficios,
         activo: 0,
         accion: 'El usuario elimino el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
export const actualizarEstatusDescripciongestion_oficios = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_gestion_oficios, id_usuario, estatus, descripcion } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbgestion_oficios.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
   if (params) {
      try {
         const resultado: any = await dbgestion_oficios.update({
            estatus: estatus,
            descripcion: descripcion,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_gestion_oficios: id_gestion_oficios
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         actualizarHistorialMastergestion_oficios(id_usuario, id_gestion_oficios, estatus, descripcion);
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
         msg: 'Registro de la tabla : gestion_oficios  ya almacenado',
      });
   }
}
export const actualizarDesactivadogestion_oficios = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbgestion_oficios.findOne({ where: { id_gestion_oficios: id } });

   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbgestion_oficios.update({
         activo: 1,
      }, {
         where: {
            id_gestion_oficios: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      ActualDesactivadoHistorialgestion_oficios(id_usuario, id);
      ActualDesactivadoMasterHistorialgestion_oficios(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
export const ActualDesactivadoHistorialgestion_oficios = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialgestion_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
         id_oficios: id,
      }).then();
   }
   catch (error) {
   }
}
//Desactivar en la tabla Historial Master gestion_oficios ----------------------------------------------------------------------> 
export const ActualDesactivadoMasterHistorialgestion_oficios = async (id_usuario: any, id_gestion_oficios: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastergestion_oficios.create({
         id_usuario: id_usuario,
         id_gestion_oficios: id_gestion_oficios,
         activo: 1,
         accion: 'El usuario cambio el estatus de desactivado a activado' + id_gestion_oficios,
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}

//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getOficiosByDireccion = async (req: Request, res: Response) => {
   const list_id_gestion_oficios = req.body.ids;

   console.log(list_id_gestion_oficios);

   let listgestion_oficios: any = '';
   listgestion_oficios = await dbgestion_oficios.findAll(
      {
         where: {
            id_gestion_oficios: list_id_gestion_oficios // Sequelize lo interpreta como IN
         },

         include: [{
            model: dboficios,
         }],
         attributes: [
            'id_gestion_oficios',
            'id_usuario',
            'finalizado',
            'estatus',
            'descripcion',
            'activo',
            'createdAt',
            [Sequelize.col('ws_oficio.id_oficios'), 'id_oficios'],
            [Sequelize.col('ws_oficio.oficio'), 'oficio'],
            [Sequelize.col('ws_oficio.text_oficio'), 'text_oficio'],
            [Sequelize.col('ws_oficio.tipo_oficio'), 'tipo_oficio'],
            [Sequelize.col('ws_oficio.text_tipo'), 'text_tipo'],
            [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
            [Sequelize.col('ws_oficio.fecha_hora'), 'fecha_hora'],
            [Sequelize.col('ws_oficio.caso_cop'), 'caso_cop'],
            [Sequelize.col('ws_oficio.asunto'), 'asunto'],
            [Sequelize.col('ws_oficio.contenido'), 'contenido'],
            [Sequelize.col('ws_oficio.archivo_oficio'), 'archivo_oficio'],
            [Sequelize.col('ws_oficio.otro'), 'otro']
         ],
         raw: true,
         nest: false,
      })
      return res.json(listgestion_oficios);

}

export const getId_gestion_oficio = async (req: Request, res: Response) => {
   const { id_oficios } = req.params;
   let listgestion_oficios: any = '';
   listgestion_oficios = await dbgestion_oficios.findOne({
       where: {
            id_oficios: id_oficios , activo : 1 
         },
   
   });
    return res.json(listgestion_oficios);
      
}