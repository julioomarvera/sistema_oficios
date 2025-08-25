"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbcat_areas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbcat_areas = connection_1.default.define('ws_cat_areas', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_cat_areas: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_direccion: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    text_direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_estatuscatalogo_areas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
