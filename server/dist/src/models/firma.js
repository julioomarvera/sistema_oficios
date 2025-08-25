"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbfirma = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const firma_coordinador_1 = require("./firma_coordinador");
exports.dbfirma = connection_1.default.define('ws_firma', {
    id_firma: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_firma_coordinador: {
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
exports.dbfirma.belongsTo(firma_coordinador_1.dbfirma_coordinador, { foreignKey: 'id_firma_coordinador' });
