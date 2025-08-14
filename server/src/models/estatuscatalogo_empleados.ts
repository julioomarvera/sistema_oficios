import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatuscatalogo_empleados = sequelize.define('ws_estatuscatalogo_empleados' ,{ 
  id_estatuscatalogo_empleados:{ 
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
