"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialcat_numero_oficios = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialcat_numero_oficios = connection_1.default.define('ws_historialcat_numero_oficios', {
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
    id_cat_numero_oficios: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
