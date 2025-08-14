import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { json } from 'sequelize';
import { dbcat_direcciones } from '../models/cat_direcciones';
import { dbhistorialcat_direcciones } from '../models/historialcat_direcciones';
import { dbcat_areas } from '../models/cat_areas';
import { Op } from 'sequelize';
import { dbcat_empleados } from '../models/cat_empleados';

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
export const getAreaByDireccion = async (req: Request, res: Response) => {
   const { id } = req.params;
   console.log(id);
   let listcat_areas: any = '';
   listcat_areas = await dbcat_areas.findAll({
      where: {
         activo: 1,
         id_direccion: id
      },
      order: [
         ['descripcion', 'ASC']
      ]
   });
   res.json(listcat_areas);

}

export const getAreaByArea = async (req: Request, res: Response) => {
   const { id } = req.params;
   console.log(id);
   let listcat_areas: any = '';
   listcat_areas = await dbcat_areas.findAll({
      where: {
         activo: 1,
         id_cat_areas: id
      },
      order: [
         ['descripcion', 'ASC']
      ]
   });
   res.json(listcat_areas);
}



export const getDireccionByNameArea = async (req: Request, res: Response) => {
   const { area } = req.params;
   console.log("Área a buscar:", area);

   try {
      const listcat_areas = await dbcat_areas.findOne({
         where: {
            activo: 1,
            descripcion: {
               [Op.like]: `%${area}%` // 👈 Comodines antes y después para buscar contenido parcial
            }
         },
         order: [['descripcion', 'ASC']]
      });

      if (listcat_areas != null) {
         const id_direccion = listcat_areas.dataValues.id_direccion;
         const id_area = listcat_areas.dataValues.id_cat_areas;
         if (id_direccion != "" && id_area != "") {
            let listcat_empleados: any = '';
            listcat_empleados = await dbcat_empleados.findOne({ where: { activo: 1, direccion: id_direccion, area: id_area } });
            if (listcat_empleados != null) {
               const nombreJefe = listcat_empleados.dataValues.nombreJefe;
               if (nombreJefe != "") {
                  let list_encargado: any = '';
                  list_encargado = await dbcat_empleados.findOne({ where: { activo: 1, nombreJefe: nombreJefe } });
                  res.json(list_encargado);
               }
            }
         }
      }
   } catch (error) {
      console.error("Error al buscar áreas:", error);
      res.status(500).json({ error: 'Error al buscar áreas por nombre' });
   }
};



