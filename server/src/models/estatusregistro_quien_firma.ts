import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatusregistro_quien_firma = sequelize.define('ws_estatusregistro_quien_firma' ,{ 
  id_estatusregistro_quien_firma:{ 
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
