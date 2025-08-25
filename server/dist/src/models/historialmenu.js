"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialmenu = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialmenu = connection_1.default.define('ws_historialmenu', {
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
    id_menu: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    id_roll: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
