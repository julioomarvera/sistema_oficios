import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialMastercatalogo_areas = sequelize.define('ws_historialMastercatalogo_areas' ,{ 
  id_historialMaster:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  id_catalogo_areas:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  id_cat_areas:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_direccion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_direccion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  descripcion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  estatus:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },                         
  accion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },

})