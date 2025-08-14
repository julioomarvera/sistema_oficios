import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatususuarios_opdm = sequelize.define('ws_estatususuarios_opdm' ,{ 
  id_estatususuarios_opdm:{ 
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
