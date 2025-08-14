import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialusuarios_opdm = sequelize.define('ws_historialusuarios_opdm' ,{ 
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
  id_users_opdm:{ 
    type:DataTypes.INTEGER, 
    allowNull:true 
  },
  
})