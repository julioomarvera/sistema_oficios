import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const dbcat_firmante = sequelize.define('ws_cat_firmante', {
  id_usuario: {
    type: DataTypes.INTEGER,
  },
  id_cat_firmante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_direccion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_gestion_oficios: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  text_direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_area: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area_texto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero_empledo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  text_nombre_empleado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_oficio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_estatusregistro_quien_firma: {
    type: DataTypes.INTEGER,
  },

  activo: {
    type: DataTypes.TINYINT,
  },
}) 
