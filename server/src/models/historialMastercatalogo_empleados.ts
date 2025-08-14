import { DataTypes } from 'sequelize'; 
import  sequelize    from '../db/connection'; 

export const dbhistorialMastercatalogo_empleados = sequelize.define('ws_historialMastercatalogo_empleados' ,{ 
  id_historialMaster:{ 
    type:DataTypes.INTEGER, 
    primaryKey:true,       
    autoIncrement:true,     
  },               
  id_usuario:{ 
    type:DataTypes.INTEGER, 
    allowNull: false, 
  },               
  id_catalogo_empleados:{ 
    type:DataTypes.INTEGER, 
    allowNull: true, 
  },               
  id_cat_empleados:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },                           
  nombre_completo:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  numero_empleado:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  cargo:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  direccion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  direccion_texto:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  subdireccion:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  area:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  area_texto:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  nombreJefe:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  cargoJefe:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  correo_institucional:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  telefono_opdm:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  url:{ 
    type:DataTypes.STRING, 
    allowNull: true, 
  },               
  codigo_qr:{ 
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