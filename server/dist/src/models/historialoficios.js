"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialoficios = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialoficios = connection_1.default.define('ws_historialoficios', {
    historial_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    accion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_oficios: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    oficio: {
        type: sequelize_1.DataTypes.INTEGER,
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
});
