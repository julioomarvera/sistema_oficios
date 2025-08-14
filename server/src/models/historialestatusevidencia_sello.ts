import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialestatusevidencia_sello = sequelize.define('ws_historialestatusevidencia_sello' ,{ 
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
  id_sello:{ 
    type:DataTypes.INTEGER, 
    allowNull:true 
  },
  
})