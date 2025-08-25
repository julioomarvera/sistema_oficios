"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbasignacion = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbasignacion = connection_1.default.define('ws_asignacion', {
    id_asignacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario_quien_asigna: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_gestion_oficios: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_oficio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    id_direccion_asignacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_area_asignacion: {
        type: sequelize_1.DataTypes.TINYINT,
    },
    numero_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_secretaria: {
        type: sequelize_1.DataTypes.STRING,
    },
    foto_empleado_secretaria: {
        type: sequelize_1.DataTypes.STRING,
    },
    numero_empledo_asignacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    text_direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    text_area: {
        type: sequelize_1.DataTypes.STRING,
    },
    text_nombre_empleado_asignacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
    },
    fecha_terminacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_asignacion: {
        type: sequelize_1.DataTypes.STRING,
    },
    instrucciones: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    estatus_oficio: {
        type: sequelize_1.DataTypes.TINYINT,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
