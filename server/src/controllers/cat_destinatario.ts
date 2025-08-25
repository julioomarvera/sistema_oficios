import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dbcat_destinatario } from '../models/cat_destinatario';
import { dbregistro_destinatario } from '../models/registro_destinatario';
import { dbhistorialcat_destinatario } from '../models/historialcat_destinatario';
import { dbhistorialMasterregistro_destinatario } from '../models/historialMasterregistro_destinatario';
import { dbcat_direcciones } from '../models/cat_direcciones';
import { dbcat_areas } from '../models/cat_areas';
import { dbcat_empleados } from '../models/cat_empleados';
import { dbgestion_oficios } from '../models/gestion_oficios';
import { dboficios } from '../models/oficios';
<<<<<<< HEAD
import { Op } from 'sequelize';

=======
import { oficio } from '../../interfaces/oficio.interface';
import { destinatarios } from '../../interfaces/destinatario.interface';
import { destinatarioConOficio } from '../../interfaces/destinatarioConOficio.interface';
>>>>>>> 0cc160d239c80f679b2a0734af2c9e2a4bf3c65e
const { Sequelize, DataTypes } = require('sequelize');

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
export const getAllcat_destinatario = async (req: Request, res: Response) => {
   const { id_usuario, id_rol } = req.params;
   let listcat_destinatario: any = '';
   if (id_rol == "1") {
      listcat_destinatario = await dbcat_destinatario.findAll({ where: { activo: 1 } });
   }
   else {
      listcat_destinatario = await dbcat_destinatario.findAll({ where: { activo: 1, id_usuario: id_usuario } });
   }
   res.json(listcat_destinatario);
   if (id_usuario != null) {
      HistorialgetAllcat_destinatario(id_usuario);
   }
}


//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getregistro_destinatarioByid_gestion_oficios = async (req: Request, res: Response) => {
   const { id_gestion_oficios } = req.params;
   console.log(id_gestion_oficios);

   let listcat_destinatario: any = '';
   listcat_destinatario = await dbcat_destinatario.findAll({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios } });
   res.json(listcat_destinatario);
}


//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcat_destinatario = async (req: Request, res: Response) => {
   const { id, id_usuario, id_rol } = req.params;
   const findcat_destinatario = await dbcat_destinatario.findOne({ where: { id_cat_destinatario: id } });
   try {
      if (findcat_destinatario) {
         if (id_usuario != null) {
            HistorialgetRegByIdcat_destinatario(id_usuario, id);
         }
         return res.json(findcat_destinatario)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_destinatario. ',
         error
      });
   }
   console.log(findcat_destinatario);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcat_destinatario = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_registro_destinatario, id_usuario, id_gestion_oficios, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto,
      id_oficio, estatus, id_estatusregistro_destinatario, con_copia, PaginaActual, finalizado, fecha_terminacion } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios, area_texto: area_texto } }); //a
   if (params) {
      return res.status(404).json({
         msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
      });
   }
   try {
      const resultado: any = await dbcat_destinatario.create({
         id_usuario: id_usuario,
         id_gestion_oficios: id_gestion_oficios,
         id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus,
         id_estatusregistro_destinatario: id_estatusregistro_destinatario,
         con_copia: con_copia,
         fecha_terminacion: fecha_terminacion,
         activo: 1,
         visto: 0,
         respuesta: 0,
         createdAt: time,
         updatedAt: time,

      }).then();
      const id = (resultado.dataValues.id_cat_destinatario);
      res.json({
         msg: `cat_destinatario registro almacenado exitosamente`,
      })
      NewHistorialcat_destinatario(id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
      actualizarregistro_destinatario(id_registro_destinatario, id, PaginaActual, finalizado);
      actualizarEstadoActivoregistro_destinatario(id_registro_destinatario);
      NewHistorialMasterregistro_destinatario(id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);

   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updcat_destinatario = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus,
      id_estatusregistro_destinatario, con_copia, } = req.body;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_destinatario.findOne({ where: { id_cat_destinatario: id_cat_destinatario } });
   if (params) {
      try {
         const resultado: any = await dbcat_destinatario.update({
            id_usuario: id_usuario,
            id_cat_destinatario: id_cat_destinatario,
            id_direccion: id_direccion,
            text_direccion: text_direccion,
            id_area: id_area,
            area_texto: area_texto,
            numero_empledo: numero_empledo,
            text_nombre_empleado: text_nombre_empleado,
            foto: foto,
            id_oficio: id_oficio,
            estatus: estatus,
            id_estatusregistro_destinatario: id_estatusregistro_destinatario,
            con_copia: con_copia,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_cat_destinatario: id_cat_destinatario
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         UpdHistorialcat_destinatario(id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
         actualizarHistorialMasterregistro_destinatario(id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
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
         msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
      });
   }
}

//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const cancelarDestinatario = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_cat_destinatario, id_gestion_oficios } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
   if (params) {
      try {
         const resultado: any = await dbcat_destinatario.update({
            activo: 0,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_gestion_oficios: id_gestion_oficios, id_cat_destinatario: id_cat_destinatario
            },
         });
         res.json("1");
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
         msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
      });
   }
}



//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delcat_destinatario = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcat_destinatario.findOne({ where: { id_cat_destinatario: id } });
   const id_cat_destinatario = findParam?.dataValues.id_cat_destinatario;
   const id_direccion = findParam?.dataValues.id_direccion;
   const text_direccion = findParam?.dataValues.text_direccion;
   const id_area = findParam?.dataValues.id_area;
   const area_texto = findParam?.dataValues.area_texto;
   const numero_empledo = findParam?.dataValues.numero_empledo;
   const text_nombre_empleado = findParam?.dataValues.text_nombre_empleado;
   const foto = findParam?.dataValues.foto;
   const id_oficio = findParam?.dataValues.id_oficio;
   const estatus = findParam?.dataValues.estatus;
   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbcat_destinatario.destroy({
         where: {
            id_cat_destinatario: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialcat_destinatario(id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
      DelMasterHistorialcat_destinatario(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcat_destinatario = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_destinatario.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : cat_destinatario',
         id_cat_destinatario: '', id_direccion: '', text_direccion: '', id_area: '', area_texto: '', numero_empledo: '', text_nombre_empleado: '', foto: '', id_oficio: '', estatus: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcat_destinatario = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_destinatario.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: cat_destinatario',
         id_cat_destinatario: id, id_direccion: '', text_direccion: '', id_area: '', area_texto: '', numero_empledo: '', text_nombre_empleado: '', foto: '', id_oficio: '', estatus: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcat_destinatario = async (id_usuario: any, id: any, id_direccion: any, text_direccion: any, id_area: any, area_texto: any, numero_empledo: any, text_nombre_empleado: any, foto: any, id_oficio: any, estatus: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_destinatario.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: cat_destinatario',
         id_cat_destinatario: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcat_destinatario = async (id_usuario: any, id: any, id_direccion: any, text_direccion: any, id_area: any, area_texto: any, numero_empledo: any, text_nombre_empleado: any, foto: any, id_oficio: any, estatus: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_destinatario.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: cat_destinatario',
         id_cat_destinatario: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcat_destinatario = async (id_usuario: any, id: any, id_direccion: any, text_direccion: any, id_area: any, area_texto: any, numero_empledo: any, text_nombre_empleado: any, foto: any, id_oficio: any, estatus: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_destinatario.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: cat_destinatario',
         id_cat_destinatario: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
      }).then();
   }
   catch (error) {
   }
}
//actualizar en la tabla registro_destinatario ----------------------------------------------------------------------> 
export const actualizarregistro_destinatario = async (id_registro_destinatario: any, id: any, PaginaActual: any, finalizado: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbregistro_destinatario.update({
         id_cat_destinatario: id,
         PaginaActual: PaginaActual,
         finalizado: finalizado,
      }, {
         where: {
            id_registro_destinatario: id_registro_destinatario
         },
      }).then();
   }
   catch (error) {
   }
}
//almacenar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
export const NewHistorialMasterregistro_destinatario = async (id_usuario: any, id_cat_destinatario: any, id_direccion: any, text_direccion: any, id_area: any, area_texto: any, numero_empledo: any, text_nombre_empleado: any, foto: any, id_oficio: any, estatus: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterregistro_destinatario.create({
         id_usuario: id_usuario,
         id_cat_destinatario: id_cat_destinatario, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
         activo: 1,
         accion: 'El usuario dio de alta el registro',
      }).then();
   }
   catch (error) {
   }
}
//Actualizar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
export const actualizarHistorialMasterregistro_destinatario = async (id_usuario: any, id_cat_destinatario: any, id_direccion: any, text_direccion: any, id_area: any, area_texto: any, numero_empledo: any, text_nombre_empleado: any, foto: any, id_oficio: any, estatus: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterregistro_destinatario.create({
         id_usuario: id_usuario,
         id_cat_destinatario: id_cat_destinatario, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
         activo: 1,
         accion: 'El usuario actualizo el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Desactivar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
export const DelMasterHistorialcat_destinatario = async (id_usuario: any, id_cat_destinatario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterregistro_destinatario.create({
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
//actualizar Estado Activo en la tabla registro_destinatario ----------------------------------------------------------------------> 
export const actualizarEstadoActivoregistro_destinatario = async (id_registro_destinatario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbregistro_destinatario.update({
         activo: 1,
      }, {
         where: {
            id_registro_destinatario: id_registro_destinatario
         },
      }).then();
   }
   catch (error) {
   }
}

// 1. Define los tipos
// interface Destinatario {
//   id_gestion_oficios: number;
//   id_oficio: number;
// }

// interface Oficio {
//   id_oficios: number;
//   numero_oficio: string;
//   asunto: string;
//   archivo_oficio: string;
//   fecha_hora: string;
//   text_oficio: string;
//   text_tipo: string;
// }

// interface DestinatarioConOficio extends Destinatario {
//   oficio: Oficio | null;
// }

// 2. Función principal
export const get_id_gestion_oficiosByArea = async (req: Request, res: Response) => {
<<<<<<< HEAD
   const { id_direccion, id_area, estatus } = req.params;

   const whereDestinatarios: any = {
      activo: 1,
      id_direccion,
      id_area,
     id_oficio: {
    [Op.ne]: "" // 👈 Esto es lo que necesitas
  }

   };
   if (estatus !== "5") {
      whereDestinatarios.estatus = estatus;
   }


   try {
      const destinatarios = await dbcat_destinatario.findAll({
         where: whereDestinatarios
      });

   
      return res.json(destinatarios);
   } catch (error) {
      console.error('Error al filtrar por estatus:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
   }
=======
  
   console.log("aquiiiiiiiii");
   
//   try {
//     const { id_direccion, id_area, estatus } = req.params;

//     const whereDestinatarios: any = {
//       activo: 1,
//       id_direccion,
//       id_area
//     };
//     if (estatus !== "5") {
//       whereDestinatarios.estatus = estatus;
//     }

//     const destinatariosRaw = await dbcat_destinatario.findAll({
//       where: whereDestinatarios,
//       raw: true
//     });

//     if (!destinatariosRaw.length) return res.json([]);

//     const destinatarios: destinatarioConOficio[] = destinatariosRaw.map((d: any) => ({
//       id_usuario: d.id_usuario,
//       id_cat_destinatario: d.id_cat_destinatario,
//       id_gestion_oficios: d.id_gestion_oficios,
//       id_direccion: d.id_direccion,
//       text_direccion: d.text_direccion,
//       id_area: d.id_area,
//       area_texto: d.area_texto,
//       numero_empledo: d.numero_empledo,
//       text_nombre_empleado: d.text_nombre_empleado,
//       foto: d.foto,
//       id_oficio: d.id_oficio,
//       estatus: d.estatus,
//       id_estatusregistro_destinatario: d.id_estatusregistro_destinatario,
//       respuesta: d.respuesta,
//       id_asignacion: d.id_asignacion,
//       sello_digital: d.sello_digital,
//       con_copia: d.con_copia,
//       activo: d.activo,

//       // Campos del oficio se inicializan vacíos
//       id_oficios: null,
//       oficio: null,
//       text_oficio: '',
//       tipo_oficio: '',
//       text_tipo: '',
//       folio: '',
//       numero_oficio: '',
//       fecha_hora: '',
//       caso_cop: '',
//       asunto: '',
//       contenido: '',
//       archivo_oficio: '',
//       otro: '',
//       id_estatusgestion_oficios: null
//     }));
// console.log(destinatarios);

   
//     const idsOficio = destinatarios.map(d => d.id_oficio).filter(Boolean);

 
//     const oficiosRaw = await dboficios.findAll({
//       where: { id_oficios: idsOficio },
//       raw: true
//     });

//     const oficios: oficio[] = oficiosRaw.map((o: any) => ({
//       id_usuario: o.id_usuario,
//       id_oficios: o.id_oficios,
//       oficio: o.oficio,
//       text_oficio: o.text_oficio,
//       tipo_oficio: o.tipo_oficio,
//       text_tipo: o.text_tipo,
//       folio: o.folio,
//       numero_oficio: o.numero_oficio,
//       fecha_hora: o.fecha_hora,
//       caso_cop: o.caso_cop,
//       asunto: o.asunto,
//       contenido: o.contenido,
//       archivo_oficio: o.archivo_oficio,
//       otro: o.otro,
//       id_estatusgestion_oficios: o.id_estatusgestion_oficios,
//       activo: o.activo
//     }));


//     // 🔗 6. Enriquecer destinatarios con datos del oficio
//     const resultado: destinatarioConOficio[] = destinatarios.map(dest => {
//       const oficioEncontrado = oficios.find(o => o.id_oficios === dest.id_oficio);
//       return {
//         ...dest,
//         id_oficios: oficioEncontrado?.id_oficios ?? dest.id_oficios,
//         oficio: oficioEncontrado?.oficio ?? dest.oficio,
//         text_oficio: oficioEncontrado?.text_oficio ?? dest.text_oficio,
//         tipo_oficio: oficioEncontrado?.tipo_oficio ?? dest.tipo_oficio,
//         text_tipo: oficioEncontrado?.text_tipo ?? dest.text_tipo,
//         folio: oficioEncontrado?.folio ?? dest.folio,
//         numero_oficio: oficioEncontrado?.numero_oficio ?? dest.numero_oficio,
//         fecha_hora: oficioEncontrado?.fecha_hora ?? dest.fecha_hora,
//         caso_cop: oficioEncontrado?.caso_cop ?? dest.caso_cop,
//         asunto: oficioEncontrado?.asunto ?? dest.asunto,
//         contenido: oficioEncontrado?.contenido ?? dest.contenido,
//         archivo_oficio: oficioEncontrado?.archivo_oficio ?? dest.archivo_oficio,
//         otro: oficioEncontrado?.otro ?? dest.otro,
//         id_estatusgestion_oficios: oficioEncontrado?.id_estatusgestion_oficios ?? dest.id_estatusgestion_oficios,
//         activo: oficioEncontrado?.activo ?? dest.activo
//       };
//     });


    
//    //  return res.json(resultado);

//     res.json(resultado);


//   } catch (error) {
//     console.error("Error al obtener gestión de oficios:", error);
//     return res.status(500).json({ error: "Error interno del servidor" });
//   }
>>>>>>> 0cc160d239c80f679b2a0734af2c9e2a4bf3c65e
};



//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const ccp_destinatario = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_cat_destinatario, id_gestion_oficios } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_destinatario.findOne({ where: { id_cat_destinatario: id_cat_destinatario, id_gestion_oficios: id_gestion_oficios } });
   console.log(req.params);

   if (params) {

      try {
         let ccp = params.dataValues.con_copia;

         if (ccp == 0) {
            ccp = 1;
         }
         else {
            ccp = 0;
         }


         const resultado: any = await dbcat_destinatario.update({
            con_copia: ccp,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_gestion_oficios: id_gestion_oficios, id_cat_destinatario: id_cat_destinatario
            },
         });
         res.json("1");
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
         msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
      });
   }
}

export const actualizarEstatusDestinatario = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_gestion_oficios, id_direccion, id_area, estatus } = req.params;


   const params = await dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, id_area: id_area } });

   //1 es cuando julio ya subio el pdf y ya le dio asignacion al area correspondiente
   //2 es cuando el area correcpondiente (detinatario ) ya vio el     oficio
   //3 es cuando el destinatario ya sello ( de recibido )  el oficio
   //4 es cuando se asigno al tecnico para su conocimiento
   // 5 es cuando lo firmo el coordinador


   const estatusActual = parseInt(params?.dataValues.estatus);
   let estatusfront = parseInt(estatus);

   if (estatusfront > estatusActual) {

      if (params) {
         try {
            const resultado: any = await dbcat_destinatario.update({
               estatus: estatus,
               createdAt: time,
               updatedAt: time,
            }, {
               where: {
                  id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, id_area: id_area
               },
            });
            res.json("1");
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
            msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
         });
      }
   }
   else {
      res.json("1");
   }
}

export const getEstatusDestinatario = async (req: Request, res: Response) => {


   //1 es cuando julio ya subio el pdf y ya le dio asignacion al area correspondiente
   //2 es cuando el area correcpondiente (detinatario ) ya vio el     oficio
   //3 es cuando el destinatario ya sello ( de recibido )  el oficio
   //4 es cuando se asigno al tecnico para su conocimiento
   // 5 es cuando lo firmo el coordinador


   const time = timeNow();
   const { id_gestion_oficios, id_direccion, id_area } = req.params;
   try {
      const params = await dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, id_area: id_area } });
      return res.json(params)

   } catch (error) {
      return res.json(error)
   }


}