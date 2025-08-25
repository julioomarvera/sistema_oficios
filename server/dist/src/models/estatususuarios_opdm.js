"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbestatususuarios_opdm = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbestatususuarios_opdm = connection_1.default.define('ws_estatususuarios_opdm', {
    id_estatususuarios_opdm: {
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
