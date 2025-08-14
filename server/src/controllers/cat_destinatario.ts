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
   const { id_registro_destinatario, id_usuario, id_gestion_oficios, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus, id_estatusregistro_destinatario, con_copia, PaginaActual, finalizado } = req.body;
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
//Traer todos los Parametros ----------------------------------------------------------------------> 
export const get_id_gestion_oficiosByArea = async (req: Request, res: Response) => {
  const { id_direccion, id_area, estatus } = req.params;

  try {
    const destinatarios = await dbcat_destinatario.findAll({
      where: {
        activo: 1,
        id_direccion,
        id_area,
        estatus: estatus // aquí aplicas el filtro directamente
      },
      attributes: ['id_gestion_oficios']
    });

    const ids = destinatarios.map((d: any) => d.id_gestion_oficios);

    if (ids.length === 0) return res.json([]);

    const oficios = await dbgestion_oficios.findAll({
      where: {
        id_gestion_oficios: ids,
        activo: 1
      },
      include: [
        {
          model: dboficios,
          attributes: []
        }
      ],
      attributes: [
        'id_gestion_oficios',
        'descripcion',
        'createdAt',
        [Sequelize.col('ws_oficio.numero_oficio'), 'numero_oficio'],
        [Sequelize.col('ws_oficio.asunto'), 'asunto'],
        [Sequelize.literal(`${estatus}`), 'estatus'] // opcional si quieres devolverlo explícitamente
      ],
      raw: true,
      nest: false
    });

    return res.json(oficios);
  } catch (error) {
    console.error('Error al filtrar por estatus:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
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
   const { id_gestion_oficios, id_direccion, id_area} = req.params;
   try {
      const params = await dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, id_area: id_area } });
      return res.json(params)

   } catch (error) {
      return res.json(error)
   }


}