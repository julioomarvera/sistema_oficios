import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialestatusgestion_oficios = sequelize.define('ws_historialestatusgestion_oficios' ,{ 
  historial_id:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  accion:{ 
    type:DataTypes.STRING, 
    allowNull: false, 
  },               
  id_oficios:{ 
    type:DataTypes.INTEGER, 
    allowNull:true 
  },
  
})