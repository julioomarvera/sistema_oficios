import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbcat_areas } from './cat_areas'; 

export const dbcatalogo_areas = sequelize.define('ws_catalogo_areas' ,{ 
  id_catalogo_areas:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_cat_areas:{ 
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
 dbcatalogo_areas.belongsTo( dbcat_areas,{foreignKey : 'id_cat_areas'});
