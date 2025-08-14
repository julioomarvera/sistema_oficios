import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatusregistro_destinatario = sequelize.define('ws_estatusregistro_destinatario' ,{ 
  id_estatusregistro_destinatario:{ 
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
