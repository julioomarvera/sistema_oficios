"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbevidencia_sello = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const sello_1 = require("./sello");
exports.dbevidencia_sello = connection_1.default.define('ws_evidencia_sello', {
    id_evidencia_sello: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_sello: {
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
exports.dbevidencia_sello.belongsTo(sello_1.dbsello, { foreignKey: 'id_sello' });
