import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbfirma_coordinador } from '../models/firma_coordinador'; 
import { dbfirma } from '../models/firma'; 
import { dbhistorialfirma_coordinador } from '../models/historialfirma_coordinador'; 
import { dbhistorialMasterfirma } from '../models/historialMasterfirma'; 

//extraer la hora para el sistema //-------------------------------------------------------------> 

export const timeNow = () => { 
   const now = new Date(); // Jul 2021 Friday 
   const fecha = (now.toLocaleString('en-US', { timeZone: 'America/Mexico_City', dateStyle: 'short', timeStyle: 'short'}));
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
export const getAllfirma_coordinador = async (req: Request, res: Response) => { 
   const { id_usuario,id_rol } = req.params; 
   let listfirma_coordinador :any = ''; 
  if(id_rol == "1"){ 
    listfirma_coordinador    = await  dbfirma_coordinador.findAll({where: {activo : 1}}); 
  } 
  else{ 
    listfirma_coordinador    = await  dbfirma_coordinador.findAll({where: {activo : 1, id_usuario : id_usuario}}); 
  } 
   res.json(listfirma_coordinador); 
   if(id_usuario != null){ 
     HistorialgetAllfirma_coordinador(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdfirma_coordinador = async (req: Request, res: Response) => { 
   const { id, id_usuario,id_rol } = req.params; 
   const findfirma_coordinador = await dbfirma_coordinador.findOne({ where: { id_firma_coordinador: id }}); 
   try { 
      if (findfirma_coordinador) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdfirma_coordinador(id_usuario,id); 
         } 
         return res.json(findfirma_coordinador) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los firma_coordinador. ', 
         error 
      }); 
   }    
   console.log(findfirma_coordinador);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newfirma_coordinador = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_firma,id_usuario,  id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro ,id_estatusfirma, PaginaActual,finalizado} = req.body; 
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbfirma_coordinador.findOne({ where: { id_gestion_oficio : id_gestion_oficio } }); 
   if (params) { 
      return res.status(404).json({ 
         msg: 'Registro de la tabla : firma_coordinador  ya almacenado', 
      }); 
   } 
   try { 
      const resultado: any = await  dbfirma_coordinador.create({ 
         id_usuario:id_usuario,
         id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro ,
         id_estatusfirma : id_estatusfirma ,
         activo:1 ,
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_firma_coordinador); 
      res.json({ 
         msg: `firma_coordinador registro almacenado exitosamente`, 
      }) 
      NewHistorialfirma_coordinador(id_usuario,id,id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro); 
      actualizarfirma(id_firma,id,PaginaActual,finalizado); 
      actualizarEstadoActivofirma(id_firma); 
      NewHistorialMasterfirma(id_usuario,id,id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro); 
      
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updfirma_coordinador = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_firma_coordinador,id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro,id_estatusfirma } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbfirma_coordinador.findOne({ where: { id_firma_coordinador: id_firma_coordinador } }); 
      if (params) { 
         try { 
            const resultado: any = await  dbfirma_coordinador.update({ 
               id_usuario:id_usuario,
                id_firma_coordinador:id_firma_coordinador, 
                id_gestion_oficio:id_gestion_oficio, 
                id_oficios:id_oficios, 
                id_direccion_coordinador:id_direccion_coordinador, 
                text_direccion_coordinador:text_direccion_coordinador, 
                id_area_coordinador:id_area_coordinador, 
                text_area_coordinador:text_area_coordinador, 
                id_direccion_peticion:id_direccion_peticion, 
                text_direccion_peticion:text_direccion_peticion, 
                id_area_peticion:id_area_peticion, 
                area_text_peticion:area_text_peticion, 
                numero_empleado_coordinador:numero_empleado_coordinador, 
                nombre_empleado_coordinador:nombre_empleado_coordinador, 
                foto_empleado_coordinador:foto_empleado_coordinador, 
                numero_empleado_peticion:numero_empleado_peticion, 
                nombre_empleado_peticion:nombre_empleado_peticion, 
                foto_empleado_peticion:foto_empleado_peticion, 
                numero_empleado_secretaria:numero_empleado_secretaria, 
                nombre_secretaria:nombre_secretaria, 
                foto_secretario:foto_secretario, 
                numero_empleado_tecnico:numero_empleado_tecnico, 
                nombre_tecnico:nombre_tecnico, 
                foto_tecnico:foto_tecnico, 
                numero_oficio:numero_oficio, 
                numero_contestacion:numero_contestacion, 
                archivo_oficio:archivo_oficio, 
                archivo_sello:archivo_sello, 
                archivo_evidencia:archivo_evidencia, 
                archivo_contestacion_pdf:archivo_contestacion_pdf, 
                archivo_contestacion_digital:archivo_contestacion_digital, 
                asunto:asunto, 
                descripcion_contestacion:descripcion_contestacion, 
                visto:visto, 
                fecha_contestacion:fecha_contestacion, 
                fecha_terminacion:fecha_terminacion, 
                tiempo_efectivo_contestacion:tiempo_efectivo_contestacion, 
                otro:otro, 
               id_estatusfirma : id_estatusfirma ,
               activo:1,
               createdAt:time, 
               updatedAt:time, 
            }, { 
            where: { 
              id_firma_coordinador : id_firma_coordinador 
            }, 
         }); 
           res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialfirma_coordinador(id_usuario,id_firma_coordinador,id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro); 
         actualizarHistorialMasterfirma(id_usuario,id_firma_coordinador,id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro); 
               }
      catch (error) {
         res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
            error 
         }); 
      }
    } 
    else{ 
       return res.status(404).json({ 
       msg: 'Registro de la tabla : firma_coordinador  ya almacenado', 
    }); 
  }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delfirma_coordinador = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbfirma_coordinador.findOne({ where: { id_firma_coordinador : id } }); 
   const id_firma_coordinador = findParam?.dataValues.id_firma_coordinador;
   const id_gestion_oficio = findParam?.dataValues.id_gestion_oficio;
   const id_oficios = findParam?.dataValues.id_oficios;
   const id_direccion_coordinador = findParam?.dataValues.id_direccion_coordinador;
   const text_direccion_coordinador = findParam?.dataValues.text_direccion_coordinador;
   const id_area_coordinador = findParam?.dataValues.id_area_coordinador;
   const text_area_coordinador = findParam?.dataValues.text_area_coordinador;
   const id_direccion_peticion = findParam?.dataValues.id_direccion_peticion;
   const text_direccion_peticion = findParam?.dataValues.text_direccion_peticion;
   const id_area_peticion = findParam?.dataValues.id_area_peticion;
   const area_text_peticion = findParam?.dataValues.area_text_peticion;
   const numero_empleado_coordinador = findParam?.dataValues.numero_empleado_coordinador;
   const nombre_empleado_coordinador = findParam?.dataValues.nombre_empleado_coordinador;
   const foto_empleado_coordinador = findParam?.dataValues.foto_empleado_coordinador;
   const numero_empleado_peticion = findParam?.dataValues.numero_empleado_peticion;
   const nombre_empleado_peticion = findParam?.dataValues.nombre_empleado_peticion;
   const foto_empleado_peticion = findParam?.dataValues.foto_empleado_peticion;
   const numero_empleado_secretaria = findParam?.dataValues.numero_empleado_secretaria;
   const nombre_secretaria = findParam?.dataValues.nombre_secretaria;
   const foto_secretario = findParam?.dataValues.foto_secretario;
   const numero_empleado_tecnico = findParam?.dataValues.numero_empleado_tecnico;
   const nombre_tecnico = findParam?.dataValues.nombre_tecnico;
   const foto_tecnico = findParam?.dataValues.foto_tecnico;
   const numero_oficio = findParam?.dataValues.numero_oficio;
   const numero_contestacion = findParam?.dataValues.numero_contestacion;
   const archivo_oficio = findParam?.dataValues.archivo_oficio;
   const archivo_sello = findParam?.dataValues.archivo_sello;
   const archivo_evidencia = findParam?.dataValues.archivo_evidencia;
   const archivo_contestacion_pdf = findParam?.dataValues.archivo_contestacion_pdf;
   const archivo_contestacion_digital = findParam?.dataValues.archivo_contestacion_digital;
   const asunto = findParam?.dataValues.asunto;
   const descripcion_contestacion = findParam?.dataValues.descripcion_contestacion;
   const visto = findParam?.dataValues.visto;
   const fecha_contestacion = findParam?.dataValues.fecha_contestacion;
   const fecha_terminacion = findParam?.dataValues.fecha_terminacion;
   const tiempo_efectivo_contestacion = findParam?.dataValues.tiempo_efectivo_contestacion;
   const otro = findParam?.dataValues.otro;
      if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbfirma_coordinador.destroy({
         where: {
            id_firma_coordinador : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialfirma_coordinador(id_usuario,id_firma_coordinador,id_gestion_oficio,id_oficios,id_direccion_coordinador,text_direccion_coordinador,id_area_coordinador,text_area_coordinador,id_direccion_peticion,text_direccion_peticion,id_area_peticion,area_text_peticion,numero_empleado_coordinador,nombre_empleado_coordinador,foto_empleado_coordinador,numero_empleado_peticion,nombre_empleado_peticion,foto_empleado_peticion,numero_empleado_secretaria,nombre_secretaria,foto_secretario,numero_empleado_tecnico,nombre_tecnico,foto_tecnico,numero_oficio,numero_contestacion,archivo_oficio,archivo_sello,archivo_evidencia,archivo_contestacion_pdf,archivo_contestacion_digital,asunto,descripcion_contestacion,visto,fecha_contestacion,fecha_terminacion,tiempo_efectivo_contestacion,otro); 
      DelMasterHistorialfirma_coordinador(id_usuario,id); 
         }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllfirma_coordinador = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma_coordinador.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : firma_coordinador',
         id_firma_coordinador: '',id_gestion_oficio: '',id_oficios: '',id_direccion_coordinador: '',text_direccion_coordinador: '',id_area_coordinador: '',text_area_coordinador: '',id_direccion_peticion: '',text_direccion_peticion: '',id_area_peticion: '',area_text_peticion: '',numero_empleado_coordinador: '',nombre_empleado_coordinador: '',foto_empleado_coordinador: '',numero_empleado_peticion: '',nombre_empleado_peticion: '',foto_empleado_peticion: '',numero_empleado_secretaria: '',nombre_secretaria: '',foto_secretario: '',numero_empleado_tecnico: '',nombre_tecnico: '',foto_tecnico: '',numero_oficio: '',numero_contestacion: '',archivo_oficio: '',archivo_sello: '',archivo_evidencia: '',archivo_contestacion_pdf: '',archivo_contestacion_digital: '',asunto: '',descripcion_contestacion: '',visto: '',fecha_contestacion: '',fecha_terminacion: '',tiempo_efectivo_contestacion: '',otro: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdfirma_coordinador = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma_coordinador.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó un registro de la tabla: firma_coordinador',
         id_firma_coordinador: id,id_gestion_oficio: '',id_oficios: '',id_direccion_coordinador: '',text_direccion_coordinador: '',id_area_coordinador: '',text_area_coordinador: '',id_direccion_peticion: '',text_direccion_peticion: '',id_area_peticion: '',area_text_peticion: '',numero_empleado_coordinador: '',nombre_empleado_coordinador: '',foto_empleado_coordinador: '',numero_empleado_peticion: '',nombre_empleado_peticion: '',foto_empleado_peticion: '',numero_empleado_secretaria: '',nombre_secretaria: '',foto_secretario: '',numero_empleado_tecnico: '',nombre_tecnico: '',foto_tecnico: '',numero_oficio: '',numero_contestacion: '',archivo_oficio: '',archivo_sello: '',archivo_evidencia: '',archivo_contestacion_pdf: '',archivo_contestacion_digital: '',asunto: '',descripcion_contestacion: '',visto: '',fecha_contestacion: '',fecha_terminacion: '',tiempo_efectivo_contestacion: '',otro: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialfirma_coordinador = async (id_usuario:any,id:any,id_gestion_oficio: any,id_oficios: any,id_direccion_coordinador: any,text_direccion_coordinador: any,id_area_coordinador: any,text_area_coordinador: any,id_direccion_peticion: any,text_direccion_peticion: any,id_area_peticion: any,area_text_peticion: any,numero_empleado_coordinador: any,nombre_empleado_coordinador: any,foto_empleado_coordinador: any,numero_empleado_peticion: any,nombre_empleado_peticion: any,foto_empleado_peticion: any,numero_empleado_secretaria: any,nombre_secretaria: any,foto_secretario: any,numero_empleado_tecnico: any,nombre_tecnico: any,foto_tecnico: any,numero_oficio: any,numero_contestacion: any,archivo_oficio: any,archivo_sello: any,archivo_evidencia: any,archivo_contestacion_pdf: any,archivo_contestacion_digital: any,asunto: any,descripcion_contestacion: any,visto: any,fecha_contestacion: any,fecha_terminacion: any,tiempo_efectivo_contestacion: any,otro: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma_coordinador.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario inserto un nuevo registro de la tabla: firma_coordinador',
         id_firma_coordinador: id,id_gestion_oficio:id_gestion_oficio,id_oficios:id_oficios,id_direccion_coordinador:id_direccion_coordinador,text_direccion_coordinador:text_direccion_coordinador,id_area_coordinador:id_area_coordinador,text_area_coordinador:text_area_coordinador,id_direccion_peticion:id_direccion_peticion,text_direccion_peticion:text_direccion_peticion,id_area_peticion:id_area_peticion,area_text_peticion:area_text_peticion,numero_empleado_coordinador:numero_empleado_coordinador,nombre_empleado_coordinador:nombre_empleado_coordinador,foto_empleado_coordinador:foto_empleado_coordinador,numero_empleado_peticion:numero_empleado_peticion,nombre_empleado_peticion:nombre_empleado_peticion,foto_empleado_peticion:foto_empleado_peticion,numero_empleado_secretaria:numero_empleado_secretaria,nombre_secretaria:nombre_secretaria,foto_secretario:foto_secretario,numero_empleado_tecnico:numero_empleado_tecnico,nombre_tecnico:nombre_tecnico,foto_tecnico:foto_tecnico,numero_oficio:numero_oficio,numero_contestacion:numero_contestacion,archivo_oficio:archivo_oficio,archivo_sello:archivo_sello,archivo_evidencia:archivo_evidencia,archivo_contestacion_pdf:archivo_contestacion_pdf,archivo_contestacion_digital:archivo_contestacion_digital,asunto:asunto,descripcion_contestacion:descripcion_contestacion,visto:visto,fecha_contestacion:fecha_contestacion,fecha_terminacion:fecha_terminacion,tiempo_efectivo_contestacion:tiempo_efectivo_contestacion,otro:otro ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialfirma_coordinador = async (id_usuario:any,id:any,id_gestion_oficio: any,id_oficios: any,id_direccion_coordinador: any,text_direccion_coordinador: any,id_area_coordinador: any,text_area_coordinador: any,id_direccion_peticion: any,text_direccion_peticion: any,id_area_peticion: any,area_text_peticion: any,numero_empleado_coordinador: any,nombre_empleado_coordinador: any,foto_empleado_coordinador: any,numero_empleado_peticion: any,nombre_empleado_peticion: any,foto_empleado_peticion: any,numero_empleado_secretaria: any,nombre_secretaria: any,foto_secretario: any,numero_empleado_tecnico: any,nombre_tecnico: any,foto_tecnico: any,numero_oficio: any,numero_contestacion: any,archivo_oficio: any,archivo_sello: any,archivo_evidencia: any,archivo_contestacion_pdf: any,archivo_contestacion_digital: any,asunto: any,descripcion_contestacion: any,visto: any,fecha_contestacion: any,fecha_terminacion: any,tiempo_efectivo_contestacion: any,otro: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma_coordinador.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Actualizo un registro de la tabla: firma_coordinador',
         id_firma_coordinador: id,id_gestion_oficio:id_gestion_oficio,id_oficios:id_oficios,id_direccion_coordinador:id_direccion_coordinador,text_direccion_coordinador:text_direccion_coordinador,id_area_coordinador:id_area_coordinador,text_area_coordinador:text_area_coordinador,id_direccion_peticion:id_direccion_peticion,text_direccion_peticion:text_direccion_peticion,id_area_peticion:id_area_peticion,area_text_peticion:area_text_peticion,numero_empleado_coordinador:numero_empleado_coordinador,nombre_empleado_coordinador:nombre_empleado_coordinador,foto_empleado_coordinador:foto_empleado_coordinador,numero_empleado_peticion:numero_empleado_peticion,nombre_empleado_peticion:nombre_empleado_peticion,foto_empleado_peticion:foto_empleado_peticion,numero_empleado_secretaria:numero_empleado_secretaria,nombre_secretaria:nombre_secretaria,foto_secretario:foto_secretario,numero_empleado_tecnico:numero_empleado_tecnico,nombre_tecnico:nombre_tecnico,foto_tecnico:foto_tecnico,numero_oficio:numero_oficio,numero_contestacion:numero_contestacion,archivo_oficio:archivo_oficio,archivo_sello:archivo_sello,archivo_evidencia:archivo_evidencia,archivo_contestacion_pdf:archivo_contestacion_pdf,archivo_contestacion_digital:archivo_contestacion_digital,asunto:asunto,descripcion_contestacion:descripcion_contestacion,visto:visto,fecha_contestacion:fecha_contestacion,fecha_terminacion:fecha_terminacion,tiempo_efectivo_contestacion:tiempo_efectivo_contestacion,otro:otro ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialfirma_coordinador = async (id_usuario:any,id:any,id_gestion_oficio: any,id_oficios: any,id_direccion_coordinador: any,text_direccion_coordinador: any,id_area_coordinador: any,text_area_coordinador: any,id_direccion_peticion: any,text_direccion_peticion: any,id_area_peticion: any,area_text_peticion: any,numero_empleado_coordinador: any,nombre_empleado_coordinador: any,foto_empleado_coordinador: any,numero_empleado_peticion: any,nombre_empleado_peticion: any,foto_empleado_peticion: any,numero_empleado_secretaria: any,nombre_secretaria: any,foto_secretario: any,numero_empleado_tecnico: any,nombre_tecnico: any,foto_tecnico: any,numero_oficio: any,numero_contestacion: any,archivo_oficio: any,archivo_sello: any,archivo_evidencia: any,archivo_contestacion_pdf: any,archivo_contestacion_digital: any,asunto: any,descripcion_contestacion: any,visto: any,fecha_contestacion: any,fecha_terminacion: any,tiempo_efectivo_contestacion: any,otro: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialfirma_coordinador.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: firma_coordinador',
          id_firma_coordinador: id,id_gestion_oficio:id_gestion_oficio,id_oficios:id_oficios,id_direccion_coordinador:id_direccion_coordinador,text_direccion_coordinador:text_direccion_coordinador,id_area_coordinador:id_area_coordinador,text_area_coordinador:text_area_coordinador,id_direccion_peticion:id_direccion_peticion,text_direccion_peticion:text_direccion_peticion,id_area_peticion:id_area_peticion,area_text_peticion:area_text_peticion,numero_empleado_coordinador:numero_empleado_coordinador,nombre_empleado_coordinador:nombre_empleado_coordinador,foto_empleado_coordinador:foto_empleado_coordinador,numero_empleado_peticion:numero_empleado_peticion,nombre_empleado_peticion:nombre_empleado_peticion,foto_empleado_peticion:foto_empleado_peticion,numero_empleado_secretaria:numero_empleado_secretaria,nombre_secretaria:nombre_secretaria,foto_secretario:foto_secretario,numero_empleado_tecnico:numero_empleado_tecnico,nombre_tecnico:nombre_tecnico,foto_tecnico:foto_tecnico,numero_oficio:numero_oficio,numero_contestacion:numero_contestacion,archivo_oficio:archivo_oficio,archivo_sello:archivo_sello,archivo_evidencia:archivo_evidencia,archivo_contestacion_pdf:archivo_contestacion_pdf,archivo_contestacion_digital:archivo_contestacion_digital,asunto:asunto,descripcion_contestacion:descripcion_contestacion,visto:visto,fecha_contestacion:fecha_contestacion,fecha_terminacion:fecha_terminacion,tiempo_efectivo_contestacion:tiempo_efectivo_contestacion,otro:otro ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//actualizar en la tabla firma ----------------------------------------------------------------------> 
export const actualizarfirma = async (id_firma : any , id:any, PaginaActual:any, finalizado:any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbfirma.update({ 
       id_firma_coordinador   : id,
       PaginaActual : PaginaActual,
       finalizado   : finalizado,
      },{ 
         where :{
           id_firma : id_firma
         }, 
      }).then();  
   }
   catch (error) { 
   }    
}
//almacenar en la tabla Historial Master firma ----------------------------------------------------------------------> 
   export const NewHistorialMasterfirma = async (id_usuario:any,id_firma_coordinador: any,id_gestion_oficio: any,id_oficios: any,id_direccion_coordinador: any,text_direccion_coordinador: any,id_area_coordinador: any,text_area_coordinador: any,id_direccion_peticion: any,text_direccion_peticion: any,id_area_peticion: any,area_text_peticion: any,numero_empleado_coordinador: any,nombre_empleado_coordinador: any,foto_empleado_coordinador: any,numero_empleado_peticion: any,nombre_empleado_peticion: any,foto_empleado_peticion: any,numero_empleado_secretaria: any,nombre_secretaria: any,foto_secretario: any,numero_empleado_tecnico: any,nombre_tecnico: any,foto_tecnico: any,numero_oficio: any,numero_contestacion: any,archivo_oficio: any,archivo_sello: any,archivo_evidencia: any,archivo_contestacion_pdf: any,archivo_contestacion_digital: any,asunto: any,descripcion_contestacion: any,visto: any,fecha_contestacion: any,fecha_terminacion: any,tiempo_efectivo_contestacion: any,otro: any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterfirma.create({ 
            id_usuario:id_usuario,
          id_firma_coordinador:id_firma_coordinador,id_gestion_oficio:id_gestion_oficio,id_oficios:id_oficios,id_direccion_coordinador:id_direccion_coordinador,text_direccion_coordinador:text_direccion_coordinador,id_area_coordinador:id_area_coordinador,text_area_coordinador:text_area_coordinador,id_direccion_peticion:id_direccion_peticion,text_direccion_peticion:text_direccion_peticion,id_area_peticion:id_area_peticion,area_text_peticion:area_text_peticion,numero_empleado_coordinador:numero_empleado_coordinador,nombre_empleado_coordinador:nombre_empleado_coordinador,foto_empleado_coordinador:foto_empleado_coordinador,numero_empleado_peticion:numero_empleado_peticion,nombre_empleado_peticion:nombre_empleado_peticion,foto_empleado_peticion:foto_empleado_peticion,numero_empleado_secretaria:numero_empleado_secretaria,nombre_secretaria:nombre_secretaria,foto_secretario:foto_secretario,numero_empleado_tecnico:numero_empleado_tecnico,nombre_tecnico:nombre_tecnico,foto_tecnico:foto_tecnico,numero_oficio:numero_oficio,numero_contestacion:numero_contestacion,archivo_oficio:archivo_oficio,archivo_sello:archivo_sello,archivo_evidencia:archivo_evidencia,archivo_contestacion_pdf:archivo_contestacion_pdf,archivo_contestacion_digital:archivo_contestacion_digital,asunto:asunto,descripcion_contestacion:descripcion_contestacion,visto:visto,fecha_contestacion:fecha_contestacion,fecha_terminacion:fecha_terminacion,tiempo_efectivo_contestacion:tiempo_efectivo_contestacion,otro:otro ,
          activo:1,
          accion:'El usuario dio de alta el registro',
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar en la tabla Historial Master firma ----------------------------------------------------------------------> 
   export const actualizarHistorialMasterfirma= async (id_usuario: any,id_firma_coordinador: any,id_gestion_oficio: any,id_oficios: any,id_direccion_coordinador: any,text_direccion_coordinador: any,id_area_coordinador: any,text_area_coordinador: any,id_direccion_peticion: any,text_direccion_peticion: any,id_area_peticion: any,area_text_peticion: any,numero_empleado_coordinador: any,nombre_empleado_coordinador: any,foto_empleado_coordinador: any,numero_empleado_peticion: any,nombre_empleado_peticion: any,foto_empleado_peticion: any,numero_empleado_secretaria: any,nombre_secretaria: any,foto_secretario: any,numero_empleado_tecnico: any,nombre_tecnico: any,foto_tecnico: any,numero_oficio: any,numero_contestacion: any,archivo_oficio: any,archivo_sello: any,archivo_evidencia: any,archivo_contestacion_pdf: any,archivo_contestacion_digital: any,asunto: any,descripcion_contestacion: any,visto: any,fecha_contestacion: any,fecha_terminacion: any,tiempo_efectivo_contestacion: any,otro: any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterfirma.create({ 
            id_usuario:id_usuario,
          id_firma_coordinador:id_firma_coordinador,id_gestion_oficio:id_gestion_oficio,id_oficios:id_oficios,id_direccion_coordinador:id_direccion_coordinador,text_direccion_coordinador:text_direccion_coordinador,id_area_coordinador:id_area_coordinador,text_area_coordinador:text_area_coordinador,id_direccion_peticion:id_direccion_peticion,text_direccion_peticion:text_direccion_peticion,id_area_peticion:id_area_peticion,area_text_peticion:area_text_peticion,numero_empleado_coordinador:numero_empleado_coordinador,nombre_empleado_coordinador:nombre_empleado_coordinador,foto_empleado_coordinador:foto_empleado_coordinador,numero_empleado_peticion:numero_empleado_peticion,nombre_empleado_peticion:nombre_empleado_peticion,foto_empleado_peticion:foto_empleado_peticion,numero_empleado_secretaria:numero_empleado_secretaria,nombre_secretaria:nombre_secretaria,foto_secretario:foto_secretario,numero_empleado_tecnico:numero_empleado_tecnico,nombre_tecnico:nombre_tecnico,foto_tecnico:foto_tecnico,numero_oficio:numero_oficio,numero_contestacion:numero_contestacion,archivo_oficio:archivo_oficio,archivo_sello:archivo_sello,archivo_evidencia:archivo_evidencia,archivo_contestacion_pdf:archivo_contestacion_pdf,archivo_contestacion_digital:archivo_contestacion_digital,asunto:asunto,descripcion_contestacion:descripcion_contestacion,visto:visto,fecha_contestacion:fecha_contestacion,fecha_terminacion:fecha_terminacion,tiempo_efectivo_contestacion:tiempo_efectivo_contestacion,otro:otro ,
            activo:1,
            accion:'El usuario actualizo el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Desactivar en la tabla Historial Master firma ----------------------------------------------------------------------> 
   export const DelMasterHistorialfirma_coordinador= async (id_usuario: any ,id_firma_coordinador : any) => {  
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialMasterfirma.create({ 
            id_usuario:id_usuario,
            activo:0,
            accion:'El usuario elimino el registro',
            createdAt:time, 
            updatedAt:time, 
         }).then(); 
   } 
   catch (error) { 
   }    
}
//actualizar Estado Activo en la tabla firma ----------------------------------------------------------------------> 
export const actualizarEstadoActivofirma = async (id_firma : any) => { 
   const time = timeNow();  
   try { 
      const resultado: any = await  dbfirma.update({ 
       activo       : 1,
      },{ 
         where :{
           id_firma : id_firma
         }, 
      }).then();  
   }
   catch (error) { 
   }    
}
