import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialMasterevidencia_sello = sequelize.define('ws_historialMasterevidencia_sello' ,{ 
  id_historialMaster:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  id_evidencia_sello:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  id_sello:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_gestion_oficios:{ 
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
  id_area:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_area:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  fecha_creacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  nombre_documento_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  nombre_documento_sello_digital:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  nombre_documento_sello:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  estatus:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  descripcion:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  accion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },

})