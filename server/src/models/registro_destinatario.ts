import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbcat_destinatario } from './cat_destinatario'; 

export const dbregistro_destinatario = sequelize.define('ws_registro_destinatario' ,{ 
  id_registro_destinatario:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_cat_destinatario:{ 
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
 dbregistro_destinatario.belongsTo( dbcat_destinatario,{foreignKey : 'id_cat_destinatario'});
