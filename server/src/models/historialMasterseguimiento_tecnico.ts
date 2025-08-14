import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialMasterseguimiento_tecnico = sequelize.define('ws_historialMasterseguimiento_tecnico' ,{ 
  id_historialMaster:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  id_seguimiento_tecnico:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  id_tecnico:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_gestion_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_oficio:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_direcion_firmante:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_direccion_firmante:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_area_firmante:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_area_firmante:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_empleado_firmante:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_direccion_asignacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_direccion_asignacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_area_asignacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  text_area_asignacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_empleado_asignacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  fecha_asignacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  estatus_seguimiento:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  observaciones:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  porcentaje_seguimiento:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  fecha_contestacion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  evidencia:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  documento_oficio:{ 
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