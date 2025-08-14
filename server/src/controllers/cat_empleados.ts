import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dbcat_empleados } from '../models/cat_empleados';
import { dbcatalogo_empleados } from '../models/catalogo_empleados';
import { dbhistorialcat_empleados } from '../models/historialcat_empleados';
import { dbhistorialMastercatalogo_empleados } from '../models/historialMastercatalogo_empleados';
import { dbcat_direcciones } from '../models/cat_direcciones';
import { dbcat_areas } from '../models/cat_areas';

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
export const getAllcat_empleados = async (req: Request, res: Response) => {
   const { id_usuario, id_rol } = req.params;
   let listcat_empleados: any = '';
   if (id_rol == "1") {
      listcat_empleados = await dbcat_empleados.findAll({ where: { activo: 1 } });
   }
   else {
      listcat_empleados = await dbcat_empleados.findAll({ where: { activo: 1, id_usuario: id_usuario } });
   }
   res.json(listcat_empleados);
   if (id_usuario != null) {
      HistorialgetAllcat_empleados(id_usuario);
   }
}

//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdcat_empleados = async (req: Request, res: Response) => {
   const { id, id_usuario, id_rol } = req.params;
   const findcat_empleados = await dbcat_empleados.findOne({ where: { id_cat_empleados: id } });
   try {
      if (findcat_empleados) {
         if (id_usuario != null) {
            HistorialgetRegByIdcat_empleados(id_usuario, id);
         }
         return res.json(findcat_empleados)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_empleados. ',
         error
      });
   }
   console.log(findcat_empleados);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newcat_empleados = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_catalogo_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto, id_estatuscatalogo_empleados, PaginaActual, finalizado } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbcat_empleados.findOne({ where: { id_usuario: id_usuario } });
   if (params) {
      return res.status(404).json({
         msg: 'Registro de la tabla : cat_empleados  ya almacenado',
      });
   }
   try {
      const resultado: any = await dbcat_empleados.create({
         id_usuario: id_usuario,
         nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto,
         id_estatuscatalogo_empleados: id_estatuscatalogo_empleados,
         activo: 1,
         createdAt: time,
         updatedAt: time,
      }).then();
      const id = (resultado.dataValues.id_cat_empleados);
      res.json({
         msg: `cat_empleados registro almacenado exitosamente`,
      })
      NewHistorialcat_empleados(id, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
      actualizarcatalogo_empleados(id_catalogo_empleados, id, PaginaActual, finalizado);
      actualizarEstadoActivocatalogo_empleados(id_catalogo_empleados);
      NewHistorialMastercatalogo_empleados(id, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);

   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updcat_empleados = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario, id_cat_empleados, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto, id_estatuscatalogo_empleados } = req.body;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbcat_empleados.findOne({ where: { id_cat_empleados: id_cat_empleados } });
   if (params) {
      try {
         const resultado: any = await dbcat_empleados.update({
            id_usuario: id_usuario,
            id_cat_empleados: id_cat_empleados,
            nombre_completo: nombre_completo,
            numero_empleado: numero_empleado,
            cargo: cargo,
            direccion: direccion,
            direccion_texto: direccion_texto,
            subdireccion: subdireccion,
            area: area,
            area_texto: area_texto,
            nombreJefe: nombreJefe,
            cargoJefe: cargoJefe,
            correo_institucional: correo_institucional,
            telefono_opdm: telefono_opdm,
            url: url,
            codigo_qr: codigo_qr,
            foto: foto,
            id_estatuscatalogo_empleados: id_estatuscatalogo_empleados,
            activo: 1,
            createdAt: time,
            updatedAt: time,
         }, {
            where: {
               id_cat_empleados: id_cat_empleados
            },
         });
         res.json({
            msg: `Registro actualizado exitosamente.`
         })
         UpdHistorialcat_empleados(id_cat_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
         actualizarHistorialMastercatalogo_empleados(id_cat_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
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
         msg: 'Registro de la tabla : cat_empleados  ya almacenado',
      });
   }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delcat_empleados = async (req: Request, res: Response) => {
   const { id } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbcat_empleados.findOne({ where: { id_cat_empleados: id } });
   const id_cat_empleados = findParam?.dataValues.id_cat_empleados;
   const id_usuario = findParam?.dataValues.id_usuario;
   const nombre_completo = findParam?.dataValues.nombre_completo;
   const numero_empleado = findParam?.dataValues.numero_empleado;
   const cargo = findParam?.dataValues.cargo;
   const direccion = findParam?.dataValues.direccion;
   const direccion_texto = findParam?.dataValues.direccion_texto;
   const subdireccion = findParam?.dataValues.subdireccion;
   const area = findParam?.dataValues.area;
   const area_texto = findParam?.dataValues.area_texto;
   const nombreJefe = findParam?.dataValues.nombreJefe;
   const cargoJefe = findParam?.dataValues.cargoJefe;
   const correo_institucional = findParam?.dataValues.correo_institucional;
   const telefono_opdm = findParam?.dataValues.telefono_opdm;
   const url = findParam?.dataValues.url;
   const codigo_qr = findParam?.dataValues.codigo_qr;
   const foto = findParam?.dataValues.foto;
   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbcat_empleados.destroy({
         where: {
            id_cat_empleados: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialcat_empleados(id_usuario, id_cat_empleados, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
      DelMasterHistorialcat_empleados(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllcat_empleados = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_empleados.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : cat_empleados',
         id_cat_empleados: '', nombre_completo: '', numero_empleado: '', cargo: '', direccion: '', direccion_texto: '', subdireccion: '', area: '', area_texto: '', nombreJefe: '', cargoJefe: '', correo_institucional: '', telefono_opdm: '', url: '', codigo_qr: '', foto: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdcat_empleados = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_empleados.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: cat_empleados',
         id_cat_empleados: id, nombre_completo: '', numero_empleado: '', cargo: '', direccion: '', direccion_texto: '', subdireccion: '', area: '', area_texto: '', nombreJefe: '', cargoJefe: '', correo_institucional: '', telefono_opdm: '', url: '', codigo_qr: '', foto: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialcat_empleados = async (id: any, id_usuario: any, nombre_completo: any, numero_empleado: any, cargo: any, direccion: any, direccion_texto: any, subdireccion: any, area: any, area_texto: any, nombreJefe: any, cargoJefe: any, correo_institucional: any, telefono_opdm: any, url: any, codigo_qr: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_empleados.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: cat_empleados',
         id_cat_empleados: id, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialcat_empleados = async (id: any, id_usuario: any, nombre_completo: any, numero_empleado: any, cargo: any, direccion: any, direccion_texto: any, subdireccion: any, area: any, area_texto: any, nombreJefe: any, cargoJefe: any, correo_institucional: any, telefono_opdm: any, url: any, codigo_qr: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_empleados.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: cat_empleados',
         id_cat_empleados: id, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialcat_empleados = async (id: any, id_usuario: any, nombre_completo: any, numero_empleado: any, cargo: any, direccion: any, direccion_texto: any, subdireccion: any, area: any, area_texto: any, nombreJefe: any, cargoJefe: any, correo_institucional: any, telefono_opdm: any, url: any, codigo_qr: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialcat_empleados.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: cat_empleados',
         id_cat_empleados: id, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
      }).then();
   }
   catch (error) {
   }
}
//actualizar en la tabla catalogo_empleados ----------------------------------------------------------------------> 
export const actualizarcatalogo_empleados = async (id_catalogo_empleados: any, id: any, PaginaActual: any, finalizado: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbcatalogo_empleados.update({
         id_cat_empleados: id,
         PaginaActual: PaginaActual,
         finalizado: finalizado,
      }, {
         where: {
            id_catalogo_empleados: id_catalogo_empleados
         },
      }).then();
   }
   catch (error) {
   }
}
//almacenar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
export const NewHistorialMastercatalogo_empleados = async (id_cat_empleados: any, id_usuario: any, nombre_completo: any, numero_empleado: any, cargo: any, direccion: any, direccion_texto: any, subdireccion: any, area: any, area_texto: any, nombreJefe: any, cargoJefe: any, correo_institucional: any, telefono_opdm: any, url: any, codigo_qr: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastercatalogo_empleados.create({
         id_usuario: id_usuario,
         id_cat_empleados: id_cat_empleados, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
         activo: 1,
         accion: 'El usuario dio de alta el registro',
      }).then();
   }
   catch (error) {
   }
}
//Actualizar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
export const actualizarHistorialMastercatalogo_empleados = async (id_cat_empleados: any, id_usuario: any, nombre_completo: any, numero_empleado: any, cargo: any, direccion: any, direccion_texto: any, subdireccion: any, area: any, area_texto: any, nombreJefe: any, cargoJefe: any, correo_institucional: any, telefono_opdm: any, url: any, codigo_qr: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastercatalogo_empleados.create({
         id_usuario: id_usuario,
         id_cat_empleados: id_cat_empleados, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
         activo: 1,
         accion: 'El usuario actualizo el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Desactivar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
export const DelMasterHistorialcat_empleados = async (id_usuario: any, id_cat_empleados: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMastercatalogo_empleados.create({
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
//actualizar Estado Activo en la tabla catalogo_empleados ----------------------------------------------------------------------> 
export const actualizarEstadoActivocatalogo_empleados = async (id_catalogo_empleados: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbcatalogo_empleados.update({
         activo: 1,
      }, {
         where: {
            id_catalogo_empleados: id_catalogo_empleados
         },
      }).then();
   }
   catch (error) {
   }
}
//Traer todos los Parametros ----------------------------------------------------------------------> 
export const get_coordinador_empleados = async (req: Request, res: Response) => {
   const { id } = req.params;
   let listcat_empleados: any = '';
   let listcat_empleados_jefe: any = '';
   listcat_empleados = await dbcat_empleados.findOne({ where: { activo: 1, numero_empleado: id } });
   const nombreCoordinador = listcat_empleados.dataValues.nombreJefe;
   const nombreEmpleado    = listcat_empleados.dataValues.nombre_completo

   if (nombreCoordinador != "") {
      if(nombreEmpleado != nombreCoordinador){
         listcat_empleados_jefe = await dbcat_empleados.findOne({ where: { activo: 1, nombre_completo: nombreCoordinador } });
      }
   }

 res.json(listcat_empleados_jefe);
} 

//Traer todos los Parametros ----------------------------------------------------------------------> 
export const getAllcat_empleadosByDireccionAreas = async (req: Request, res: Response) => {
   const { id_direccion, id_area } = req.params;
   let listcat_empleados: any = '';
   listcat_empleados = await dbcat_empleados.findAll({ where: { activo: 1, direccion: id_direccion,area:id_area } });
   res.json(listcat_empleados);

} 
