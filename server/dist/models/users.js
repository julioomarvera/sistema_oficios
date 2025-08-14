"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbusers = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbusers = connection_1.default.define('ws_users', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_users: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_roll: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    clave: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    apepa: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    apema: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    genero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fec_ingreso: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    imp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    edit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    elim: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nuev: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    img: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    texto_direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    texto_area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_estatususer: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
