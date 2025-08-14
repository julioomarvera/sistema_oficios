"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbusuarios_opdm = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const users_opdm_1 = require("./users_opdm");
exports.dbusuarios_opdm = connection_1.default.define('ws_usuarios_opdm', {
    id_usuarios_opdm: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_users_opdm: {
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
exports.dbusuarios_opdm.belongsTo(users_opdm_1.dbusers_opdm, { foreignKey: 'id_users_opdm' });
