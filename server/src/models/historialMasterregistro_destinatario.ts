import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialMasterregistro_destinatario = sequelize.define('ws_historialMasterregistro_destinatario' ,{ 
  id_historialMaster:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  id_registro_destinatario:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  id_cat_destinatario:{ 
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
  area_texto:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_empledo:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_nombre_empleado:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  foto:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  estatus:{ 
    type:DataTypes.STRING, 
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