"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialMastergestion_oficios = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialMastergestion_oficios = connection_1.default.define('ws_historialMastergestion_oficios', {
    id_historialMaster: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_gestion_oficios: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    id_oficios: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    tipo_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_hora: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    caso_cop: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    asunto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    contenido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    archivo_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    otro: {
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
