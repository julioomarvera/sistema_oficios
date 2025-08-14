import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatusseguimiento_tecnico = sequelize.define('ws_estatusseguimiento_tecnico' ,{ 
  id_estatusseguimiento_tecnico:{ 
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
