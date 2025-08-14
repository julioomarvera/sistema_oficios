import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const dbcat_destinatario = sequelize.define('ws_cat_destinatario', {
  id_usuario: {
    type: DataTypes.INTEGER,
  },
  id_cat_destinatario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_gestion_oficios: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_direccion: {
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
  estatus: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_estatusregistro_destinatario: {
    type: DataTypes.INTEGER,
  },
  respuesta: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  id_asignacion: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  sello_digital: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  con_copia:{
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  activo: {
    type: DataTypes.TINYINT,
  },
}) 
