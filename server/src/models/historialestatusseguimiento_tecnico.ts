import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialestatusseguimiento_tecnico = sequelize.define('ws_historialestatusseguimiento_tecnico' ,{ 
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
  id_tecnico:{ 
    type:DataTypes.INTEGER, 
    allowNull:true 
  },
  
})