import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const dbtecnico = sequelize.define('ws_tecnico', {
  id_usuario: {
    type: DataTypes.INTEGER,
  },
  id_tecnico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_gestion_oficio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_oficio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  nombre_tecnico: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero_empleado_tecnico: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  foto_tecnico: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  numero_oficio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_direcion_firmante: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  text_direccion_firmante: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_area_firmante: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  text_area_firmante: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero_empleado_firmante: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_direccion_asignacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  text_direccion_asignacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_area_asignacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  text_area_asignacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  numero_empleado_asignacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_asignacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estatus_seguimiento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  porcentaje_seguimiento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_contestacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  evidencia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  documento_oficio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_estatusseguimiento_tecnico: {
    type: DataTypes.INTEGER,
  },
  activo: {
    type: DataTypes.TINYINT,
  },
}) 
