import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dboficios } from './oficios'; 
import { dbcat_destinatario } from './cat_destinatario';

export const dbgestion_oficios = sequelize.define('ws_gestion_oficios' ,{ 
  id_gestion_oficios:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_oficios:{ 
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
  createdAt:{
    type:DataTypes.DATE,
    allowNull:true 
  }
}) 
 dbgestion_oficios.belongsTo( dboficios,{foreignKey : 'id_oficios'});

