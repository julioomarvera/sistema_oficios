import { Request, Response } from 'express'; 
import bcrypt from 'bcrypt';      
import jwt from 'jsonwebtoken';   
import { json } from 'sequelize'; 
import { dbmenu } from '../models/menu'; 
import { dbhistorialmenu } from '../models/historialmenu'; 

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
export const getAllmenu = async (req: Request, res: Response) => { 
   const { id_usuario,id_roll } = req.params; 
   const listmenu    = await  dbmenu.findAll({where: {activo : 1, id_roll : id_roll}}); 
   res.json(listmenu); 
   if(id_usuario != null){ 
     HistorialgetAllmenu(id_usuario); 
   } 
} 
//Traer Parametro By Id  ----------------------------------------------------------------------> 
export const getRegByIdmenu = async (req: Request, res: Response) => { 
   const { id, id_usuario } = req.params; 
   const findmenu = await dbmenu.findOne({ where: { id_menu: id }}); 
   try { 
      if (findmenu) { 
         if(id_usuario != null){ 
             HistorialgetRegByIdmenu(id_usuario,id); 
         } 
         return res.json(findmenu) 
      } 
   } 
   catch (error) { 
      res.status(404).json({ 
         msg: 'Ocurrió un inconveniente al tratar de listar la información de los menu. ', 
         error 
      }); 
   }    
   console.log(findmenu);   
}
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
export const newmenu = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario,  id_roll,titulo,direccion_url } = req.body; 
   //Validamos si ya existe el Parametro en la base de datos 
   const params = await dbmenu.findOne({ where: { id_roll : id_roll } }); 
   if (params) { 
      return res.status(404).json({ 
         msg: 'Registro de la tabla : menu  ya almacenado', 
      }); 
   } 
   try { 
      const resultado: any = await  dbmenu.create({ 
         id_roll,titulo,direccion_url ,
         activo:1 ,
         createdAt:time, 
         updatedAt:time, 
      }).then(); 
      const id = (resultado.dataValues.id_menu); 
      res.json({ 
         msg: `menu registro almacenado exitosamente`, 
      }) 
      NewHistorialmenu(id_usuario,id,id_roll,titulo,direccion_url); 
      
   }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
         error 
      }); 
   }
}
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
export const updmenu = async (req: Request, res: Response) => { 
   const time = timeNow(); 
   const{id_usuario, id_menu,id_roll,titulo,direccion_url } = req.body; 
   //Validamos si existe el parametro en la base de datos 
   const params = await dbmenu.findOne({ where: { id_menu: id_menu } }); 
      if (params) { 
         try { 
            const resultado: any = await  dbmenu.update({ 
                id_menu:id_menu, 
                id_roll:id_roll, 
                titulo:titulo, 
                direccion_url:direccion_url, 
               activo:1,
               createdAt:time, 
               updatedAt:time, 
            }, { 
            where: { 
              id_menu : id_menu 
            }, 
         }); 
           res.json({ 
            msg: `Registro actualizado exitosamente.` 
         }) 
         UpdHistorialmenu(id_usuario,id_menu,id_roll,titulo,direccion_url); 
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
       msg: 'Registro de la tabla : menu  ya almacenado', 
    }); 
  }
}
//Eliminar un Parametro --------------------------------------------------------------------------> 
export const delmenu = async (req: Request, res: Response) => { 
   const { id,id_usuario } = req.params; 
   //Validamos si existe el parametro en la base de datos 
   const findParam = await dbmenu.findOne({ where: { id_menu : id } }); 
   const id_menu = findParam?.dataValues.id_menu;
   const id_roll = findParam?.dataValues.id_roll;
   const titulo = findParam?.dataValues.titulo;
   const direccion_url = findParam?.dataValues.direccion_url;
      if (!findParam) { 
      return res.status(404).json({ 
         msg: 'Parametro no encontrado.', 
      }); 
   }
   try {
      const resultado: any = await dbmenu.destroy({
         where: {
            id_menu : id 
         },
      });
      res.json({ 
         msg: `Parametro eliminado exitosamente`, 
      }) 
      DelHistorialmenu(id_usuario,id_menu,id_roll,titulo,direccion_url); 
         }
   catch (error) {
      res.status(404).json({
         msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
         error 
      });
   }
}
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
export const HistorialgetAllmenu = async (id_usuario:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialmenu.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó todos los registros de la tabla : menu',
         id_menu: '',id_roll: '',titulo: '',direccion_url: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
export const HistorialgetRegByIdmenu = async (id_usuario:any,id:any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialmenu.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario consultó un registro de la tabla: menu',
         id_menu: id,id_roll: '',titulo: '',direccion_url: '' ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
export const NewHistorialmenu = async (id_usuario:any,id:any,id_roll: any,titulo: any,direccion_url: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialmenu.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario inserto un nuevo registro de la tabla: menu',
         id_menu: id,id_roll:id_roll,titulo:titulo,direccion_url:direccion_url ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
export const UpdHistorialmenu = async (id_usuario:any,id:any,id_roll: any,titulo: any,direccion_url: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialmenu.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Actualizo un registro de la tabla: menu',
         id_menu: id,id_roll:id_roll,titulo:titulo,direccion_url:direccion_url ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
//Delete HISTORIAL ----------------------------------------------------------------------> 
export const DelHistorialmenu = async (id_usuario:any,id:any,id_roll: any,titulo: any,direccion_url: any) => { 
   const time = timeNow();  
   try { 
          const resultado: any = await  dbhistorialmenu.create({ 
          id_usuario: id_usuario,
          accion: 'El usuario Elimino un registro de la tabla: menu',
          id_menu: id,id_roll:id_roll,titulo:titulo,direccion_url:direccion_url ,
         }).then(); 
   } 
   catch (error) { 
   }    
}
