import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbtecnico } from './tecnico'; 

export const dbseguimiento_tecnico = sequelize.define('ws_seguimiento_tecnico' ,{ 
  id_seguimiento_tecnico:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_tecnico:{ 
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
 dbseguimiento_tecnico.belongsTo( dbtecnico,{foreignKey : 'id_tecnico'});
