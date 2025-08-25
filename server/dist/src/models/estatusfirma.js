"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbestatusfirma = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbestatusfirma = connection_1.default.define('ws_estatusfirma', {
    id_estatusfirma: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
