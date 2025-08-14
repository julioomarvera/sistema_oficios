"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbmenu = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbmenu = connection_1.default.define('ws_menu', {
    id_menu: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
