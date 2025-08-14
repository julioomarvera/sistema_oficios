import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbusers_opdm } from './users_opdm'; 

export const dbusuarios_opdm = sequelize.define('ws_usuarios_opdm' ,{ 
  id_usuarios_opdm:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_users_opdm:{ 
    type:DataTypes.INTEGER, 
    allowNull:true 
  },
    PaginaActual:{ 
    type:DataTypes.STRING, 
  },    
  maximoPaginas:{ 
    type:DataTypes.TINYINT, 
  },    
  finalizado:{ 
    type:DataTypes.TINYINT, 
  },    
  estatus:{ 
    type:DataTypes.INTEGER, 
  },    
  descripcion:{ 
    type:DataTypes.STRING, 
  },    
  activo:{ 
    type:DataTypes.TINYINT, 
  },    
}) 
 dbusuarios_opdm.belongsTo( dbusers_opdm,{foreignKey : 'id_users_opdm'});
