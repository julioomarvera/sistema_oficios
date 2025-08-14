import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
const { Sequelize, DataTypes } = require('sequelize');
import { dbasignacion } from '../models/asignacion';
import { dbcat_empleados } from '../models/cat_empleados';
import { Op } from 'sequelize';
import { dboficios } from '../models/oficios';
import { dbusers_opdm } from '../models/users_opdm';


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

//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const new_asignacion = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario_quien_asigna, id_gestion_oficios,
      id_oficio, id_direccion_asignacion,
      id_area_asignacion, numero_empledo_asignacion,
      text_direccion, text_area, text_nombre_empleado_asignacion, foto,
      fecha_asignacion, estatus_oficio, instrucciones } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbasignacion.findOne({ where: { id_gestion_oficios: id_gestion_oficios, numero_empledo_asignacion: numero_empledo_asignacion, activo: 1 } });
   if (params) {
      return res.status(404).json({
         msg: 'El usuario ' + numero_empledo_asignacion + ' ya fue registrado para este oficio',
      });
   }
   try {
      const resultado: any = await dbasignacion.create({
         id_usuario_quien_asigna: id_usuario_quien_asigna,
         id_gestion_oficios: id_gestion_oficios,
         id_oficio: id_oficio,
         id_direccion_asignacion: id_direccion_asignacion,
         id_area_asignacion: id_area_asignacion,
         numero_empledo_asignacion: numero_empledo_asignacion,
         text_direccion: text_direccion,
         text_area: text_area,
         text_nombre_empleado_asignacion: text_nombre_empleado_asignacion,
         foto: foto,
         fecha_asignacion: fecha_asignacion,
         estatus_oficio: estatus_oficio,
         instrucciones: instrucciones,
         activo: 1,
         createdAt: time,
         updatedAt: time,
      }).then();
      const id = (resultado.dataValues.id_cat_areas);
      res.json({
         msg: `cat_areas registro almacenado exitosamente`,
      })
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}

//Traer todos los Parametros ----------------------------------------------------------------------> 
// export const getAllcat_empleadosByDireccionAreas = async (req: Request, res: Response) => {
//    const { id_gestion_oficios, id_direccion, id_area } = req.params;

//    try {

//       const asignados = await dbasignacion.findAll({
//          where: { id_gestion_oficios: id_gestion_oficios, activo: 1 },
//          attributes: ['numero_empledo_asignacion'] // Asumiendo que esta columna existe
//       });

//       // Extraer solo los IDs
//       const idsAsignados = asignados.map((a: any) => a.numero_empledo_asignacion);


//       const listcat_empleados = await dbcat_empleados.findAll({
//          where: {
//             activo: 1,
//             direccion: id_direccion,
//             area: id_area,
//             numero_empleado: {
//                [Op.notIn]: idsAsignados // 👈 Aquí excluimos los asignados
//             }
//          }
//       });

//       res.json(listcat_empleados);
//    } catch (error) {
//       console.error('Error al obtener empleados:', error);
//       res.status(500).json({ error: 'Error al obtener empleados' });
//    }

// }

export const getAllcat_empleadosByDireccionAreas = async (req: Request, res: Response) => {
   const { id_gestion_oficios, id_direccion, id_area } = req.params;

   try {
      // Obtener empleados activos en esa dirección y área
      const empleados = await dbcat_empleados.findAll({
         where: {
            activo: 1,
            direccion: id_direccion,
            area: id_area
         }
      });

      // Para cada empleado, contar sus asignaciones activas en esa gestión
      const empleadosConAsignaciones = await Promise.all(
         empleados.map(async (empleado: any) => {
            const total_tramites = await dbasignacion.count({
               where: {
                  numero_empledo_asignacion: empleado.numero_empleado,
                  id_gestion_oficios,
                  activo: 1
               }
            });

            return {
               ...empleado.dataValues,
               total_tramites
            };
         })
      );

      res.json(empleadosConAsignaciones);

   } catch (error) {
      console.error('Error al obtener empleados con trámites:', error);
      res.status(500).json({ error: 'Error al obtener empleados con trámites' });
   }
}


//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getEncargadoArea = async (req: Request, res: Response) => {
   const { id_direccion, id_area } = req.params;
   let listcat_empleados: any = '';
   listcat_empleados = await dbcat_empleados.findOne({ where: { activo: 1, direccion: id_direccion, area: id_area } });
   res.json(listcat_empleados);
}




//Traer todos los  ----------------------------------------------------------------------> 
export const getAllcat_empleadosByid_gestion_oficios = async (req: Request, res: Response) => {
   const { id_gestion_oficios } = req.params;
   let listcat_empleados: any = '';
   listcat_empleados = await dbasignacion.findAll({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios } });
   res.json(listcat_empleados);
}

//Eliminar un Parametro evidencia_sello--------------------------------------------------------------------------> 
export const deleteAsignacion = async (req: Request, res: Response) => {
   const { id_usuario, id_gestion_oficios, numero_empleado } = req.params;
   console.log(req.params);

   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbasignacion.findOne({ where: { id_gestion_oficios: id_gestion_oficios, numero_empledo_asignacion: numero_empleado } });

   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbasignacion.update({
         activo: 0,
      }, {
         where: {
            id_gestion_oficios: id_gestion_oficios, numero_empledo_asignacion: numero_empleado
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      // DelHistorialevidencia_sello(id_usuario,id); 
      // DelMasterHistorialevidencia_sello(id_usuario,id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}

export const getOficiosByNumeroEmpleado = async (req: Request, res: Response) => {
   const { numero_empleado, id_direccion, id_area, estatus_seguimiento, roll } = req.params;
   console.log(req.params);

   // Construir condiciones dinámicas
   const baseWhere: any = {
      activo: 1,
      id_direccion_asignacion: id_direccion,
      id_area_asignacion: id_area,
   };

   if (roll === "4") {
      baseWhere.numero_empledo_asignacion = numero_empleado;
   }

   if (estatus_seguimiento !== "5") {
      baseWhere.estatus_oficio = estatus_seguimiento;
   }

   try {
      // Paso 1: Obtener asignaciones
      const asignados = await dbasignacion.findAll({
         where: baseWhere,
         attributes: ['id_oficio', 'id_asignacion', 'estatus_oficio']
      });

      console.log(asignados);

      // Paso 2: Extraer IDs de oficio
      const id_oficios = asignados.map((a: any) => a.id_oficio);

      // Paso 3: Obtener oficios
      const oficios = await dboficios.findAll({
         where: {
            activo: 1,
            id_oficios: id_oficios
         }
      });

      // Paso 4: Combinar datos
      const resultado = oficios.map((oficio: any) => {
         const asignacion = asignados.find((a: any) => a.id_oficio === oficio.id_oficios);
         return {
            ...oficio.dataValues,
            id_asignacion: asignacion?.get('id_asignacion') ?? null,
            estatus_oficio: asignacion?.get('estatus_oficio') ?? null,
         };
      });

      res.json(resultado);
   } catch (error) {
      console.error('Error al obtener empleados:', error);
      res.status(500).json({ error: 'Error al obtener empleados' });
   }
};

export const update_firmante_instrucciones = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_asignacion, numero_empledo_asignacion, nuevaIntruccion } = req.body;
   console.log(req.body);

   //Validamos si existe el parametro en la base de datos 
   const params = await dbasignacion.findOne({ where: { id_asignacion: id_asignacion, numero_empledo_asignacion: numero_empledo_asignacion } });
   if (params) {
      try {
         const resultado: any = await dbasignacion.update({
            instrucciones: nuevaIntruccion
         }, {
            where: {
               id_asignacion: id_asignacion, numero_empledo_asignacion: numero_empledo_asignacion,
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
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
         msg: 'Registro de la tabla : dbasignacion  ya almacenado',
      });
   }
}

export const getInfo_quien_solicito = async (req: Request, res: Response) => {
   const { id_gestion_oficios, numero_tecnico_asignado } = req.params;
   try {
      const asignacion = await dbasignacion.findOne({
         where: {
            activo: 1,
            id_gestion_oficios: id_gestion_oficios,
            numero_empledo_asignacion: numero_tecnico_asignado
         },
      });

      const id_usuario_quien_asigna = asignacion?.dataValues.id_usuario_quien_asigna;
      if (id_usuario_quien_asigna != "") {
         const list_user = await dbusers_opdm.findOne({
            where: {
               activo: 1,
               id_users_opdm: id_usuario_quien_asigna
            },
         });
         res.json(list_user);
      }

   } catch (error) {
      console.error('Error al obtener empleados:', error);
      res.status(500).json({ error: 'Error al obtener empleados' });
   }
}


export const getInstrucciones = async (req: Request, res: Response) => {
   const { id_gestion_oficios } = req.params;
   try {
      const instrucciones = await dbasignacion.findOne({
         where: {
            activo: 1,
            id_gestion_oficios: id_gestion_oficios,
         },
      });
      res.json(instrucciones);
   } catch (error) {
      console.error('Error al obtener empleados:', error);
      res.status(500).json({ error: 'Error al obtener empleados' });
   }
} 