"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbtecnico = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbtecnico = connection_1.default.define('ws_tecnico', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_tecnico: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_gestion_oficio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    id_oficio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    numero_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_direcion_firmante: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    text_direccion_firmante: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_area_firmante: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    text_area_firmante: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_firmante: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_direccion_asignacion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    text_direccion_asignacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_area_asignacion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    text_area_asignacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_asignacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_asignacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estatus_seguimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    observaciones: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    porcentaje_seguimiento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_contestacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    evidencia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    documento_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_estatusseguimiento_tecnico: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
