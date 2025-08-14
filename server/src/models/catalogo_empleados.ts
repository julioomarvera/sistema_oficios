import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 
import { dbcat_empleados } from './cat_empleados'; 

export const dbcatalogo_empleados = sequelize.define('ws_catalogo_empleados' ,{ 
  id_catalogo_empleados:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,        
    autoIncrement:true,     
  },                      
  id_usuario:{ 
    type:DataTypes.INTEGER, 
  },    
  id_cat_empleados:{ 
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
 dbcatalogo_empleados.belongsTo( dbcat_empleados,{foreignKey : 'id_cat_empleados'});
