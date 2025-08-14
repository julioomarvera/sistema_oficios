import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbcat_direcciones = sequelize.define('ws_cat_direcciones' ,{ 
   id_cat_direcciones:{ 
     type:DataTypes.INTEGER, 
     primaryKey:true,        
     autoIncrement:true,     
   },                      
   descripcion:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   activo:{ 
     type:DataTypes.TINYINT, 
   },      
}) 
