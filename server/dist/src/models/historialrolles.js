"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialrolles = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialrolles = connection_1.default.define('ws_historialrolles', {
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
    id_roll: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    crear: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    ver: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    editar: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    eliminar: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
});
