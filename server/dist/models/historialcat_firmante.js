"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialcat_firmante = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialcat_firmante = connection_1.default.define('ws_historialcat_firmante', {
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
    id_cat_firmante: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    id_direccion: {
        type: sequelize_1.DataTypes.INTEGER,
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
    area_texto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empledo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_nombre_empleado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    otro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
