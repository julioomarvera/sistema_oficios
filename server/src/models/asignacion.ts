import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';


export const dbasignacion = sequelize.define('ws_asignacion', {
    id_asignacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario_quien_asigna: {
        type: DataTypes.INTEGER,
    },
    id_gestion_oficios: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_oficio: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_direccion_asignacion: {
        type: DataTypes.STRING,
    },
    id_area_asignacion: {
        type: DataTypes.TINYINT,
    },
    numero_oficio:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_secretaria:{
        type: DataTypes.STRING,
    },
    foto_empleado_secretaria:{
        type: DataTypes.STRING,
    },
    numero_empledo_asignacion: {
        type: DataTypes.STRING,
    },
    text_direccion: {
        type: DataTypes.STRING,
    },
    text_area: {
        type: DataTypes.STRING,
    },
    text_nombre_empleado_asignacion: {
        type: DataTypes.STRING,
    },
    foto: {
        type: DataTypes.STRING,
    },
    fecha_terminacion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_asignacion: {
        type: DataTypes.STRING,
    },
    instrucciones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estatus_oficio: {
        type: DataTypes.TINYINT,
    },
    activo: {
        type: DataTypes.TINYINT,
    },
})

