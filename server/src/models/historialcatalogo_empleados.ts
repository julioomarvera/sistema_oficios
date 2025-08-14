import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialcatalogo_empleados = sequelize.define('ws_historialcatalogo_empleados' ,{ 
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
  id_cat_empleados:{ 
    type:DataTypes.INTEGER, 
    allowNull:true 
  },
  
})