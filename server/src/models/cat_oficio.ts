import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbcat_oficio = sequelize.define('ws_cat_oficio' ,{ 
   id_cat_oficio:{ 
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
