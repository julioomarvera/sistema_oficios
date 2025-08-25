import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbfirma_coordinador } from './firma_coordinador'; 

export const dbfirma = sequelize.define('ws_firma' ,{ 
  id_firma:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_firma_coordinador:{ 
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
 dbfirma.belongsTo( dbfirma_coordinador,{foreignKey : 'id_firma_coordinador'});
