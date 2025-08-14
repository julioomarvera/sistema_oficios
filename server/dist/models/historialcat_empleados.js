"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbhistorialcat_empleados = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbhistorialcat_empleados = connection_1.default.define('ws_historialcat_empleados', {
    historial_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    accion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_cat_empleados: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    nombre_completo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    cargo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    direccion_texto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    subdireccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    area_texto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombreJefe: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cargoJefe: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    correo_institucional: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    telefono_opdm: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    codigo_qr: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
