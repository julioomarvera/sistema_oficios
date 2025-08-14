import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbmenu = sequelize.define('ws_menu' ,{ 
   id_menu:{ 
     type:DataTypes.INTEGER, 
     primaryKey:true,        
     autoIncrement:true,     
   },                      
   id_roll:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   titulo:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   direccion_url:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   activo:{ 
     type:DataTypes.TINYINT, 
   },      
}) 
