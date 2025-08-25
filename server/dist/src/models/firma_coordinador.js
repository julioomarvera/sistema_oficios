"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbfirma_coordinador = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.dbfirma_coordinador = connection_1.default.define('ws_firma_coordinador', {
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_firma_coordinador: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_gestion_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_oficios: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_direccion_coordinador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_direccion_coordinador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_area_coordinador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_area_coordinador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_direccion_peticion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    text_direccion_peticion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_area_peticion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    area_text_peticion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_coordinador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_empleado_coordinador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    foto_empleado_coordinador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_peticion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_empleado_peticion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    foto_empleado_peticion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_secretaria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_secretaria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    foto_secretario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_empleado_tecnico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    nombre_tecnico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    foto_tecnico: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    numero_contestacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    archivo_oficio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    archivo_sello: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    archivo_evidencia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    archivo_contestacion_pdf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    archivo_contestacion_digital: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    asunto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    descripcion_contestacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    visto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_contestacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    fecha_terminacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    tiempo_efectivo_contestacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    otro: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    id_estatusfirma: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    activo: {
        type: sequelize_1.DataTypes.TINYINT,
    },
});
