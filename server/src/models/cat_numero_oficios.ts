import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbcat_numero_oficios = sequelize.define('ws_cat_numero_oficios' ,{ 
   id_cat_numero_oficios:{ 
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
