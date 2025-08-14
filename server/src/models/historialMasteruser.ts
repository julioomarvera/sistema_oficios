import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialMasteruser = sequelize.define('ws_historialMasteruser' ,{ 
  id_historialMaster:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  id_user:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  id_users:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_roll:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  usuario:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  clave:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  nombre:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  apepa:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  apema:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  genero:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  correo:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  telefono:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  fec_ingreso:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  imp:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  edit:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  elim:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  nuev:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  img:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_direccion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  texto_direccion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  id_area:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  texto_area:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_empleado:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  foto:{ 
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