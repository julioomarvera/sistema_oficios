"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbcat_oficio = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbcat_oficio = connection_1.default.define('ws_cat_oficio', {
    id_cat_oficio: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
