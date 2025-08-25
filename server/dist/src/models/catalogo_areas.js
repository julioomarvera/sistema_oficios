"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbcatalogo_areas = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const cat_areas_1 = require("./cat_areas");
exports.dbcatalogo_areas = connection_1.default.define('ws_catalogo_areas', {
    id_catalogo_areas: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_cat_areas: {
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
exports.dbcatalogo_areas.belongsTo(cat_areas_1.dbcat_areas, { foreignKey: 'id_cat_areas' });
