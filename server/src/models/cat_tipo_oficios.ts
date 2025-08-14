import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbcat_tipo_oficios = sequelize.define('ws_cat_tipo_oficios' ,{ 
   id_cat_tipo_oficios:{ 
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
