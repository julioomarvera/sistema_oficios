"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialMasterevidencia_sello = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialMasterevidencia_sello = connection_1.default.define('ws_historialMasterevidencia_sello', {
    id_historialMaster: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_evidencia_sello: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    id_sello: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_gestion_oficios: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_documento_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_documento_sello_digital: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_documento_sello: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    accion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
