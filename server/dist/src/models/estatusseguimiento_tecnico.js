"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbestatusseguimiento_tecnico = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbestatusseguimiento_tecnico = connection_1.default.define('ws_estatusseguimiento_tecnico', {
    id_estatusseguimiento_tecnico: {
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
