import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbsello } from './sello'; 

export const dbevidencia_sello = sequelize.define('ws_evidencia_sello' ,{ 
  id_evidencia_sello:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_sello:{ 
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
 dbevidencia_sello.belongsTo( dbsello,{foreignKey : 'id_sello'});
