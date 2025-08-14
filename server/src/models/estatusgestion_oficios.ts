import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbestatusgestion_oficios = sequelize.define('ws_estatusgestion_oficios' ,{ 
  id_estatusgestion_oficios:{ 
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
