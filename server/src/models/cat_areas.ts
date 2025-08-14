import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbcat_areas = sequelize.define('ws_cat_areas' ,{ 
   id_usuario:{ 
     type:DataTypes.INTEGER, 
   },      
   id_cat_areas:{ 
     type:DataTypes.INTEGER, 
     primaryKey:true,        
     autoIncrement:true,     
   },                      
   id_direccion:{ 
     type:DataTypes.INTEGER, 
     allowNull: true, 
   },                      
   text_direccion:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   descripcion:{ 
     type:DataTypes.STRING, 
     allowNull: true, 
   },                      
   id_estatuscatalogo_areas:{ 
     type:DataTypes.INTEGER, 
   },      
   activo:{ 
     type:DataTypes.TINYINT, 
   },      
}) 
