import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dbcat_numero_oficios } from '../models/cat_numero_oficios';
import { dbhistorialcat_numero_oficios } from '../models/historialcat_numero_oficios';

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
export const getAllcat_numero_oficios = async (req: Request, res: Response) => {
   const { id_usuario } = req.params;
   const listcat_numero_oficios = await dbcat_numero_oficios.findAll({ where: { activo: 1 } });
   res.json(listcat_numero_oficios);
   if (id_usuario != null) {
      HistorialgetAllcat_numero_oficios(id_usuario);
   }
}
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcat_numero_oficios = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   const findcat_numero_oficios = await dbcat_numero_oficios.findOne({ where: { id_cat_numero_oficios: id } });
   try {
      if (findcat_numero_oficios) {
         if (id_usuario != null) {
            HistorialgetRegByIdcat_numero_oficios(id_usuario, id);
         }
         return res.json(findcat_numero_oficios)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_numero_oficios. ',
         error
      });
   }
   console.log(findcat_numero_oficios);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcat_numero_oficios = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_catalogo, id_usuario, descripcion, PaginaActual, finalizado } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbcat_numero_oficios.findOne({ where: { descripcion: descripcion } });
   if (params) {
      return res.status(404).json({
         msg: 'Registro de la tabla : cat_numero_oficios  ya almacenado',
      });
   }
   try {
      const resultado: any = await dbcat_numero_oficios.create({
         descripcion,
         activo: 1,
         createdAt: time,
         updatedAt: time,
      }).then();
      const id = (resultado.dataValues.id_cat_numero_oficios);
      res.json({
         msg: `cat_numero_oficios registro almacenado exitosamente`,
      })
      NewHistorialcat_numero_oficios(id_usuario, id, descripcion);

   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updcat_numero_oficios = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario, id_cat_numero_oficios, descripcion } = req.body;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_numero_oficios.findOne({ where: { id_cat_numero_oficios: id_cat_numero_oficios } });
   if (params) {
      try {
         const resultado: any = await dbcat_numero_oficios.update({
            id_cat_numero_oficios: id_cat_numero_oficios,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_cat_numero_oficios: id_cat_numero_oficios
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         UpdHistorialcat_numero_oficios(id_usuario, id_cat_numero_oficios, descripcion);
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
         msg: 'Registro de la tabla : cat_numero_oficios  ya almacenado',
      });
   }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delcat_numero_oficios = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcat_numero_oficios.findOne({ where: { id_cat_numero_oficios: id } });
   const id_cat_numero_oficios = findParam?.dataValues.id_cat_numero_oficios;
   const descripcion = findParam?.dataValues.descripcion;
   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbcat_numero_oficios.destroy({
         where: {
            id_cat_numero_oficios: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialcat_numero_oficios(id_usuario, id_cat_numero_oficios, descripcion);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcat_numero_oficios = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_numero_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : cat_numero_oficios',
         id_cat_numero_oficios: '', descripcion: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcat_numero_oficios = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_numero_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: cat_numero_oficios',
         id_cat_numero_oficios: id, descripcion: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcat_numero_oficios = async (id_usuario: any, id: any, descripcion: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_numero_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: cat_numero_oficios',
         id_cat_numero_oficios: id, descripcion: descripcion,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcat_numero_oficios = async (id_usuario: any, id: any, descripcion: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_numero_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: cat_numero_oficios',
         id_cat_numero_oficios: id, descripcion: descripcion,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcat_numero_oficios = async (id_usuario: any, id: any, descripcion: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_numero_oficios.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: cat_numero_oficios',
         id_cat_numero_oficios: id, descripcion: descripcion,
      }).then();
   }
   catch (error) {
   }
}

export const get_seguimiento_numero_oficios = async (req: Request, res: Response) => {
   const { id_usuario } = req.params;

   try {
      // Buscar el último registro activo ordenado por ID descendente
      const ultimoRegistro = await dbcat_numero_oficios.findOne({
         where: { activo: 1 },
         attributes: ['id_cat_numero_oficios'],
         order: [['id_cat_numero_oficios', 'DESC']]
      });

      // Obtener el ID o devolver 1 si no hay registros
      const idUltimo = ultimoRegistro ? ultimoRegistro.get('id_cat_numero_oficios') as number : 1;

      // Enviar el ID como respuesta
      res.json( idUltimo );

      // Guardar historial si se proporcionó el id_usuario
      if (id_usuario != null) {
         HistorialgetAllcat_numero_oficios(id_usuario);
      }

   } catch (error) {
      console.error('Error al obtener el último registro:', error);
      res.status(500).json({ error: 'Error del servidor' });
   }
};
