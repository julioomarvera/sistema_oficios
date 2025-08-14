import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbcat_firmante } from './cat_firmante'; 

export const dbregistro_quien_firma = sequelize.define('ws_registro_quien_firma' ,{ 
  id_registro_quien_firma:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_cat_firmante:{ 
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
 dbregistro_quien_firma.belongsTo( dbcat_firmante,{foreignKey : 'id_cat_firmante'});
