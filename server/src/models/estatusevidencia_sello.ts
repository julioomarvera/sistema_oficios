import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatusevidencia_sello = sequelize.define('ws_estatusevidencia_sello' ,{ 
  id_estatusevidencia_sello:{ 
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
