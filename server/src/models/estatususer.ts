import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatususer = sequelize.define('ws_estatususer' ,{ 
  id_estatususer:{ 
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
