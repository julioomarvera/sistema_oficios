import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dbusers_opdm } from '../models/users_opdm';
import { dbusuarios_opdm } from '../models/usuarios_opdm';
import { dbhistorialusers_opdm } from '../models/historialusers_opdm';
import { dbhistorialMasterusuarios_opdm } from '../models/historialMasterusuarios_opdm';
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
export const getAllusers_opdm = async (req: Request, res: Response) => {
   const { id_usuario, id_rol } = req.params;
   let listusers_opdm: any = '';
   if (id_rol == "1") {
      listusers_opdm = await dbusers_opdm.findAll({ where: { activo: 1 } });
   }
   else {
      listusers_opdm = await dbusers_opdm.findAll({ where: { activo: 1, id_usuario: id_usuario } });
   }
   res.json(listusers_opdm);
   if (id_usuario != null) {
      HistorialgetAllusers_opdm(id_usuario);
   }
}
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdusers_opdm = async (req: Request, res: Response) => {
   const { id, id_usuario, id_rol } = req.params;
   const findusers_opdm = await dbusers_opdm.findOne({ where: { id_users_opdm: id } });
   try {
      if (findusers_opdm) {
         if (id_usuario != null) {
            HistorialgetRegByIdusers_opdm(id_usuario, id);
         }
         return res.json(findusers_opdm)
      }
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los users_opdm. ',
         error
      });
   }
   console.log(findusers_opdm);
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newusers_opdm = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuarios_opdm, id_usuario, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, id_estatususuarios_opdm, PaginaActual, finalizado } = req.body;
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbusers_opdm.findOne({ where: { numero_empleado: numero_empleado } });
   if (params) {
      return res.status(404).json({
         msg: 'Registro de la tabla : empleado  ya almacenado',
      });
   }
   try {

      const hashedPassword = await bcrypt.hash(clave, 10);
      const resultado: any = await dbusers_opdm.create({
         id_usuario: id_usuario,
         id_roll, usuario, clave: hashedPassword, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, cambioContrasenia: 0,
         id_estatususuarios_opdm: id_estatususuarios_opdm,
         activo: 1,
         createdAt: time,
         updatedAt: time,
      }).then();
      const id = (resultado.dataValues.id_users_opdm);
      res.json({
         msg: `users_opdm registro almacenado exitosamente`,
      })
      NewHistorialusers_opdm(id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
      actualizarusuarios_opdm(id_usuarios_opdm, id, PaginaActual, finalizado);
      actualizarEstadoActivousuarios_opdm(id_usuarios_opdm);
      NewHistorialMasterusuarios_opdm(id_usuario, id, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);

   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error
      });
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updusers_opdm = async (req: Request, res: Response) => {
   const time = timeNow();
   const { id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto, id_estatususuarios_opdm, banderaCambioContrasenia } = req.body;
   //Validamos si existe el parametro en la base de datos 
   const params = await dbusers_opdm.findOne({ where: { id_users_opdm: id_users_opdm } });
   if (params) {
      if (banderaCambioContrasenia == true) { //significa que no hay cambio de contraseña
         try {
            const resultado: any = await dbusers_opdm.update({
               id_usuario: id_usuario,
               id_users_opdm: id_users_opdm,
               id_roll: id_roll,
               nombre: nombre,
               apepa: apepa,
               apema: apema,
               genero: genero,
               correo: correo,
               telefono: telefono,
               fec_ingreso: fec_ingreso,
               imp: imp,
               edit: edit,
               elim: elim,
               nuev: nuev,
               img: img,
               id_direccion: id_direccion,
               texto_direccion: texto_direccion,
               id_area: id_area,
               texto_area: texto_area,
               numero_empleado: numero_empleado,
               foto: foto,
               id_estatususuarios_opdm: id_estatususuarios_opdm,
               activo: 1,
               createdAt: time,
               updatedAt: time,
              
            }, {
               where: {
                  id_users_opdm: id_users_opdm
               },
            });
            res.json({
               msg: `Registro actualizado exitosamente.`
            })
            UpdHistorialusers_opdm(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
            actualizarHistorialMasterusuarios_opdm(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
         }
         catch (error) {
            res.status(404).json({
               msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
               error
            });
         }
      }
      else { // es por que el usuario si quiere cambiar la contraseña
         try {
            const hashedPassword = await bcrypt.hash(clave, 10);
            const resultado: any = await dbusers_opdm.update({
               id_usuario: id_usuario,
               id_users_opdm: id_users_opdm,
               id_roll: id_roll,
               usuario: usuario,
               clave:hashedPassword,
               nombre: nombre,
               apepa: apepa,
               apema: apema,
               genero: genero,
               correo: correo,
               telefono: telefono,
               fec_ingreso: fec_ingreso,
               imp: imp,
               edit: edit,
               elim: elim,
               nuev: nuev,
               img: img,
               id_direccion: id_direccion,
               texto_direccion: texto_direccion,
               id_area: id_area,
               texto_area: texto_area,
               numero_empleado: numero_empleado,
               foto: foto,
               id_estatususuarios_opdm: id_estatususuarios_opdm,
               activo: 1,
               createdAt: time,
               updatedAt: time,
               cambioContrasenia:0
            }, {
               where: {
                  id_users_opdm: id_users_opdm
               },
            });
            res.json({
               msg: `Registro actualizado exitosamente.`
            })
            UpdHistorialusers_opdm(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
            actualizarHistorialMasterusuarios_opdm(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
         }
         catch (error) {
            res.status(404).json({
               msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
               error
            });
         }
      }
   }
   else {
      return res.status(404).json({
         msg: 'Registro de la tabla : users_opdm  ya almacenado',
      });
   }


}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delusers_opdm = async (req: Request, res: Response) => {
   const { id, id_usuario } = req.params;
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbusers_opdm.findOne({ where: { id_users_opdm: id } });
   const id_users_opdm = findParam?.dataValues.id_users_opdm;
   const id_roll = findParam?.dataValues.id_roll;
   const usuario = findParam?.dataValues.usuario;
   const clave = findParam?.dataValues.clave;
   const nombre = findParam?.dataValues.nombre;
   const apepa = findParam?.dataValues.apepa;
   const apema = findParam?.dataValues.apema;
   const genero = findParam?.dataValues.genero;
   const correo = findParam?.dataValues.correo;
   const telefono = findParam?.dataValues.telefono;
   const fec_ingreso = findParam?.dataValues.fec_ingreso;
   const imp = findParam?.dataValues.imp;
   const edit = findParam?.dataValues.edit;
   const elim = findParam?.dataValues.elim;
   const nuev = findParam?.dataValues.nuev;
   const img = findParam?.dataValues.img;
   const id_direccion = findParam?.dataValues.id_direccion;
   const texto_direccion = findParam?.dataValues.texto_direccion;
   const id_area = findParam?.dataValues.id_area;
   const texto_area = findParam?.dataValues.texto_area;
   const numero_empleado = findParam?.dataValues.numero_empleado;
   const foto = findParam?.dataValues.foto;
   if (!findParam) {
      return res.status(404).json({
         msg: 'Parametro no encontrado.',
      });
   }
   try {
      const resultado: any = await dbusers_opdm.destroy({
         where: {
            id_users_opdm: id
         },
      });
      res.json({
         msg: `Parametro eliminado exitosamente`,
      })
      DelHistorialusers_opdm(id_usuario, id_users_opdm, id_roll, usuario, clave, nombre, apepa, apema, genero, correo, telefono, fec_ingreso, imp, edit, elim, nuev, img, id_direccion, texto_direccion, id_area, texto_area, numero_empleado, foto);
      DelMasterHistorialusers_opdm(id_usuario, id);
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllusers_opdm = async (id_usuario: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialusers_opdm.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó todos los registros de la tabla : users_opdm',
         id_users_opdm: '', id_roll: '', usuario: '', clave: '', nombre: '', apepa: '', apema: '', genero: '', correo: '', telefono: '', fec_ingreso: '', imp: '', edit: '', elim: '', nuev: '', img: '', id_direccion: '', texto_direccion: '', id_area: '', texto_area: '', numero_empleado: '', foto: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdusers_opdm = async (id_usuario: any, id: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialusers_opdm.create({
         id_usuario: id_usuario,
         accion: 'El usuario consultó un registro de la tabla: users_opdm',
         id_users_opdm: id, id_roll: '', usuario: '', clave: '', nombre: '', apepa: '', apema: '', genero: '', correo: '', telefono: '', fec_ingreso: '', imp: '', edit: '', elim: '', nuev: '', img: '', id_direccion: '', texto_direccion: '', id_area: '', texto_area: '', numero_empleado: '', foto: '',
      }).then();
   }
   catch (error) {
   }
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialusers_opdm = async (id_usuario: any, id: any, id_roll: any, usuario: any, clave: any, nombre: any, apepa: any, apema: any, genero: any, correo: any, telefono: any, fec_ingreso: any, imp: any, edit: any, elim: any, nuev: any, img: any, id_direccion: any, texto_direccion: any, id_area: any, texto_area: any, numero_empleado: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialusers_opdm.create({
         id_usuario: id_usuario,
         accion: 'El usuario inserto un nuevo registro de la tabla: users_opdm',
         id_users_opdm: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
      }).then();
   }
   catch (error) {
   }
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialusers_opdm = async (id_usuario: any, id: any, id_roll: any, usuario: any, clave: any, nombre: any, apepa: any, apema: any, genero: any, correo: any, telefono: any, fec_ingreso: any, imp: any, edit: any, elim: any, nuev: any, img: any, id_direccion: any, texto_direccion: any, id_area: any, texto_area: any, numero_empleado: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialusers_opdm.create({
         id_usuario: id_usuario,
         accion: 'El usuario Actualizo un registro de la tabla: users_opdm',
         id_users_opdm: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
      }).then();
   }
   catch (error) {
   }
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialusers_opdm = async (id_usuario: any, id: any, id_roll: any, usuario: any, clave: any, nombre: any, apepa: any, apema: any, genero: any, correo: any, telefono: any, fec_ingreso: any, imp: any, edit: any, elim: any, nuev: any, img: any, id_direccion: any, texto_direccion: any, id_area: any, texto_area: any, numero_empleado: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialusers_opdm.create({
         id_usuario: id_usuario,
         accion: 'El usuario Elimino un registro de la tabla: users_opdm',
         id_users_opdm: id, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
      }).then();
   }
   catch (error) {
   }
}
//actualizar en la tabla usuarios_opdm ----------------------------------------------------------------------> 
export const actualizarusuarios_opdm = async (id_usuarios_opdm: any, id: any, PaginaActual: any, finalizado: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbusuarios_opdm.update({
         id_users_opdm: id,
         PaginaActual: PaginaActual,
         finalizado: 1,
         activo: 1,
      }, {
         where: {
            id_usuarios_opdm: id_usuarios_opdm
         },
      }).then();
   }
   catch (error) {
   }
}
//almacenar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
export const NewHistorialMasterusuarios_opdm = async (id_usuario: any, id_users_opdm: any, id_roll: any, usuario: any, clave: any, nombre: any, apepa: any, apema: any, genero: any, correo: any, telefono: any, fec_ingreso: any, imp: any, edit: any, elim: any, nuev: any, img: any, id_direccion: any, texto_direccion: any, id_area: any, texto_area: any, numero_empleado: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterusuarios_opdm.create({
         id_usuario: id_usuario,
         id_users_opdm: id_users_opdm, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
         activo: 1,
         accion: 'El usuario dio de alta el registro',
      }).then();
   }
   catch (error) {
   }
}
//Actualizar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
export const actualizarHistorialMasterusuarios_opdm = async (id_usuario: any, id_users_opdm: any, id_roll: any, usuario: any, clave: any, nombre: any, apepa: any, apema: any, genero: any, correo: any, telefono: any, fec_ingreso: any, imp: any, edit: any, elim: any, nuev: any, img: any, id_direccion: any, texto_direccion: any, id_area: any, texto_area: any, numero_empleado: any, foto: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterusuarios_opdm.create({
         id_usuario: id_usuario,
         id_users_opdm: id_users_opdm, id_roll: id_roll, usuario: usuario, clave: clave, nombre: nombre, apepa: apepa, apema: apema, genero: genero, correo: correo, telefono: telefono, fec_ingreso: fec_ingreso, imp: imp, edit: edit, elim: elim, nuev: nuev, img: img, id_direccion: id_direccion, texto_direccion: texto_direccion, id_area: id_area, texto_area: texto_area, numero_empleado: numero_empleado, foto: foto,
         activo: 1,
         accion: 'El usuario actualizo el registro',
         createdAt: time,
         updatedAt: time,
      }).then();
   }
   catch (error) {
   }
}
//Desactivar en la tabla Historial Master usuarios_opdm ----------------------------------------------------------------------> 
export const DelMasterHistorialusers_opdm = async (id_usuario: any, id_users_opdm: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbhistorialMasterusuarios_opdm.create({
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
//actualizar Estado Activo en la tabla usuarios_opdm ----------------------------------------------------------------------> 
export const actualizarEstadoActivousuarios_opdm = async (id_usuarios_opdm: any) => {
   const time = timeNow();
   try {
      const resultado: any = await dbusuarios_opdm.update({
         activo: 1,
      }, {
         where: {
            id_usuarios_opdm: id_usuarios_opdm
         },
      }).then();
   }
   catch (error) {
   }
}


export const loginUser = async (req: Request, res: Response) => {
   const { usuario, clave } = req.body;
   //Validamos si el usuario existe en la base de datos
   const user: any = await dbusers_opdm.findOne({ where: { usuario: usuario } });
   if (!user) {
      return res.status(400).json({
         msq: `El Usuario no existe ${usuario} en la base de datos`
      })
   }
   //validamos el password
   const passwordValid = await bcrypt.compare(clave, user.clave)
   if (!passwordValid) {
      return res.status(400).json({
         msq: `El  password es incorrecto`
      })
   }
   const token = jwt.sign({
      usuario: user.usuario,
      imp: user.imp,
      edit: user.edit,
      elim: user.elim,
      nuev: user.nuev,
      img: user.img,
      activo: user.activo,
   }, process.env.SECRET_KEY || 'julio', {
   });
   //expiresIn:'60000'

   // })
   //generamos el token
   const userInfo = ({
      id_usuario: user.id_users_opdm,
      id_roll: user.id_roll,
      usuario: user.nombre + " " + user.apepa + " " + user.apema,
      imp: user.imp,
      edit: user.edit,
      elim: user.elim,
      nuev: user.nuev,
      img: user.img,
      activo: user.activo,
      telefono: user.telefono,
      token: token,
      id_direcion: user.id_direccion,
      text_direccion: user.texto_direccion,
      id_area: user.id_area,
      text_area: user.texto_area,
      numero_empleado: user.numero_empleado,
      foto: user.foto,
      cambioContrasenia: user.cambioContrasenia,
   })
   console.log(userInfo);
   res.json(userInfo);
}



export const validatPass = async (req: Request, res: Response) => {
   const { numero_empleado, clave } = req.body;
   //Validamos si el usuario existe en la base de datos
   const user: any = await dbusers_opdm.findOne({ where: { numero_empleado: numero_empleado } });
   if (!user) {
      res.json(`El Usuario con número de empledo ${numero_empleado}no existe en la base de datos`);
   }
   //validamos el password
   const passwordValid = await bcrypt.compare(clave, user.clave)
   if (!passwordValid) {
      res.json(`El  password es incorrecto`);
   }
   else {
      res.json(1);
   }
}

export const actualizarPass = async (req: Request, res: Response) => {
   const { numero_empleado, clave } = req.body;
   const user: any = await dbusers_opdm.findOne({ where: { numero_empleado: numero_empleado } });
   if (!user) {
      res.json(`El Usuario con número de empledo ${numero_empleado}no existe en la base de datos`);
   }
   else {
      try {
         const hashedPassword = await bcrypt.hash(clave, 10);
         const resultado: any = await dbusers_opdm.update({
            cambioContrasenia: 1,
            clave: hashedPassword,
         }, {
            where: {
               numero_empleado: numero_empleado,
            },
         }).then();
         res.json(1);
      }
      catch (error) {
      }

   }
}