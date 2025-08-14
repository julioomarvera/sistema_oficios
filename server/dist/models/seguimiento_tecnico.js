"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbseguimiento_tecnico = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tecnico_1 = require("./tecnico");
exports.dbseguimiento_tecnico = connection_1.default.define('ws_seguimiento_tecnico', {
    id_seguimiento_tecnico: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_tecnico: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    PaginaActual: {
        type: sequelize_1.DataTypes.STRING,
    },
    maximoPaginas: {
        type: sequelize_1.DataTypes.TINYINT,
    },
    finalizado: {
        type: sequelize_1.DataTypes.TINYINT,
    },
    estatus: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
exports.dbseguimiento_tecnico.belongsTo(tecnico_1.dbtecnico, { foreignKey: 'id_tecnico' });
