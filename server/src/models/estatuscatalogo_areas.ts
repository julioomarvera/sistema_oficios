import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatuscatalogo_areas = sequelize.define('ws_estatuscatalogo_areas' ,{ 
  id_estatuscatalogo_areas:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  descripcion:{ 
    type:DataTypes.STRING, 
  },    
  activo:{ 
    type:DataTypes.TINYINT, 
  },    
}) 
