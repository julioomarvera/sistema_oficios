import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialMastergestion_oficios = sequelize.define('ws_historialMastergestion_oficios' ,{ 
  id_historialMaster:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  id_gestion_oficios:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  id_oficios:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  tipo_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_tipo:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  fecha_hora:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  caso_cop:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  asunto:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  contenido:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  archivo_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  otro:{ 
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