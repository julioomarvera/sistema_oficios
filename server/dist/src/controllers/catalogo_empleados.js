"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActualDesactivadoMasterHistorialcatalogo_empleados = exports.ActualDesactivadoHistorialcatalogo_empleados = exports.actualizarDesactivadocatalogo_empleados = exports.actualizarEstatusDescripcioncatalogo_empleados = exports.DelMasterHistorialcatalogo_empleados = exports.actualizarHistorialMastercatalogo_empleados = exports.NewHistorialMastercatalogo_empleados = exports.DelHistorialcatalogo_empleados = exports.UpdHistorialcatalogo_empleadosid_cat_empleados = exports.NewHistorialcatalogo_empleados = exports.HistorialgetRegByIdcatalogo_empleados = exports.HistorialgetAllcatalogo_empleados = exports.delcatalogo_empleados = exports.updcatalogo_empleados_id_cat_empleados = exports.newcatalogo_empleados = exports.getRegByIdcatalogo_empleados = exports.getAllcatalogo_empleados = exports.timeNow = void 0;
const catalogo_empleados_1 = require("../models/catalogo_empleados");
const historialcatalogo_empleados_1 = require("../models/historialcatalogo_empleados");
const historialMastercatalogo_empleados_1 = require("../models/historialMastercatalogo_empleados");
const { Sequelize, DataTypes } = require('sequelize');
const cat_empleados_1 = require("../models/cat_empleados");
//extraer la hora para el sistema //-------------------------------------------------------------> 
const timeNow = () => {
    const now = new Date(); // Jul 2021 Friday 
    const fecha = (now.toLocaleString('en-US', { timeZone: 'America/Mexico_City', dateStyle: 'short', timeStyle: 'short' }));
    let d = new Date();
    let add30Minutes = new Date(
    // add 30 minutes  
    d.getFullYear(), d.getMonth(), d.getDate(), d.getUTCHours(), (d.getMinutes()), // add 30 minutes, 
    d.getSeconds(), d.getMilliseconds());
    // ISO formatted UTC timestamp 
    // timezone is always zero UTC offset, as denoted by the suffix 'Z' 
    let isoString = add30Minutes.toISOString();
    // MySQL formatted UTC timestamp: YYYY-MM-DD HH:MM:SS 
    let mySqlTimestamp = isoString.slice(0, 19).replace('T', ' ');
    return isoString;
};
exports.timeNow = timeNow;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getAllcatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol, estatus, activo } = req.params;
    let listcatalogo_empleados = '';
    if (id_rol == "1") {
        if (activo == "2") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo, estatus: estatus },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    else {
        if (activo == "2") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { id_usuario: id_usuario },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus == "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus == "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo, id_usuario: id_usuario },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "1" && estatus != "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
        else if (activo == "0" && estatus != "0") {
            listcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findAll({
                where: { activo: activo, estatus: estatus, id_usuario: id_usuario },
                include: [{
                        model: cat_empleados_1.dbcat_empleados,
                    }],
                attributes: [
                    'id_catalogo_empleados',
                    'id_usuario',
                    'finalizado',
                    'estatus',
                    'descripcion',
                    'activo',
                    'createdAt',
                    [Sequelize.col('ws_cat_empleado.id_cat_empleados'), 'id_cat_empleados'],
                    [Sequelize.col('ws_cat_empleado.id_usuario'), 'id_usuario'],
                    [Sequelize.col('ws_cat_empleado.nombre_completo'), 'nombre_completo'],
                    [Sequelize.col('ws_cat_empleado.numero_empleado'), 'numero_empleado'],
                    [Sequelize.col('ws_cat_empleado.cargo'), 'cargo'],
                    [Sequelize.col('ws_cat_empleado.direccion'), 'direccion'],
                    [Sequelize.col('ws_cat_empleado.direccion_texto'), 'direccion_texto'],
                    [Sequelize.col('ws_cat_empleado.subdireccion'), 'subdireccion'],
                    [Sequelize.col('ws_cat_empleado.area'), 'area'],
                    [Sequelize.col('ws_cat_empleado.area_texto'), 'area_texto'],
                    [Sequelize.col('ws_cat_empleado.nombreJefe'), 'nombreJefe'],
                    [Sequelize.col('ws_cat_empleado.cargoJefe'), 'cargoJefe'],
                    [Sequelize.col('ws_cat_empleado.correo_institucional'), 'correo_institucional'],
                    [Sequelize.col('ws_cat_empleado.telefono_opdm'), 'telefono_opdm'],
                    [Sequelize.col('ws_cat_empleado.url'), 'url'],
                    [Sequelize.col('ws_cat_empleado.codigo_qr'), 'codigo_qr'],
                    [Sequelize.col('ws_cat_empleado.foto'), 'foto']
                ],
                raw: true,
                nest: false,
            });
        }
    }
    res.json(listcatalogo_empleados);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcatalogo_empleados)(id_usuario);
    }
});
exports.getAllcatalogo_empleados = getAllcatalogo_empleados;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcatalogo_empleados = yield catalogo_empleados_1.dbcatalogo_empleados.findOne({ where: { id_catalogo_empleados: id } });
    try {
        if (findcatalogo_empleados) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcatalogo_empleados)(id_usuario, id);
            }
            return res.json(findcatalogo_empleados);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_empleados. ',
            error
        });
    }
    console.log(findcatalogo_empleados);
});
exports.getRegByIdcatalogo_empleados = getRegByIdcatalogo_empleados;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario } = req.params;
    try {
        const resultado = yield catalogo_empleados_1.dbcatalogo_empleados.create({
            id_usuario: id_usuario,
            estatus: 1,
            activo: 0,
            PaginaActual: '/index/nuevocat_empleados',
            finalizado: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_catalogo_empleados);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialcatalogo_empleados)(id_usuario, id);
        (0, exports.NewHistorialMastercatalogo_empleados)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcatalogo_empleados = newcatalogo_empleados;
//Actualizar el parametro con Id de : id_cat_empleados--------------------------------------------------------------------------> 
const updcatalogo_empleados_id_cat_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_catalogo_empleados, id_cat_empleados, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield catalogo_empleados_1.dbcatalogo_empleados.findOne({ where: { id_catalogo_empleados: id_catalogo_empleados } });
    if (params) {
        try {
            const resultado = yield catalogo_empleados_1.dbcatalogo_empleados.update({
                id_usuario: id_usuario,
                id_cat_empleados: id_cat_empleados,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_catalogo_empleados: id_catalogo_empleados
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcatalogo_empleadosid_cat_empleados)(id_usuario, id_cat_empleados);
        }
        catch (error) {
            res.status(404).json({
                msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
                error
            });
        }
    }
    else {
        return res.status(404).json({
            msg: 'Registro de la tabla : catalogo_empleados  ya almacenado',
        });
    }
});
exports.updcatalogo_empleados_id_cat_empleados = updcatalogo_empleados_id_cat_empleados;
//Eliminar un Parametro catalogo_empleados--------------------------------------------------------------------------> 
const delcatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield catalogo_empleados_1.dbcatalogo_empleados.findOne({ where: { id_catalogo_empleados: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield catalogo_empleados_1.dbcatalogo_empleados.update({
            activo: 0,
        }, {
            where: {
                id_catalogo_empleados: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcatalogo_empleados)(id_usuario, id);
        (0, exports.DelMasterHistorialcatalogo_empleados)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcatalogo_empleados = delcatalogo_empleados;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcatalogo_empleados = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_empleados_1.dbhistorialcatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : catalogo_empleados',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcatalogo_empleados = HistorialgetAllcatalogo_empleados;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcatalogo_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_empleados_1.dbhistorialcatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: catalogo_empleados',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcatalogo_empleados = HistorialgetRegByIdcatalogo_empleados;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcatalogo_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_empleados_1.dbhistorialcatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_empleados',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcatalogo_empleados = NewHistorialcatalogo_empleados;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcatalogo_empleadosid_cat_empleados = (id_usuario, id_cat_empleados) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_empleados_1.dbhistorialcatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: catalogo_empleados',
            id_cat_empleados,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcatalogo_empleadosid_cat_empleados = UpdHistorialcatalogo_empleadosid_cat_empleados;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcatalogo_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_empleados_1.dbhistorialcatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: catalogo_empleados',
            id_cat_empleados: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcatalogo_empleados = DelHistorialcatalogo_empleados;
//almacenar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
const time = (0, exports.timeNow)();
const NewHistorialMastercatalogo_empleados = (id_catalogo_empleados, id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield historialMastercatalogo_empleados_1.dbhistorialMastercatalogo_empleados.create({
            id_usuario: id_usuario,
            id_catalogo_empleados: id_catalogo_empleados,
            estatus: 1,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMastercatalogo_empleados = NewHistorialMastercatalogo_empleados;
//Actualizar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
const actualizarHistorialMastercatalogo_empleados = (id_usuario, id_catalogo_empleados, estatus, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_empleados_1.dbhistorialMastercatalogo_empleados.create({
            id_usuario: id_usuario,
            id_catalogo_empleados,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMastercatalogo_empleados = actualizarHistorialMastercatalogo_empleados;
//Desactivar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
const DelMasterHistorialcatalogo_empleados = (id_usuario, id_catalogo_empleados) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_empleados_1.dbhistorialMastercatalogo_empleados.create({
            id_usuario: id_usuario,
            id_catalogo_empleados: id_catalogo_empleados,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialcatalogo_empleados = DelMasterHistorialcatalogo_empleados;
//Actualizar el estatus y la descripcion --------------------------------------------------------------------------> 
const actualizarEstatusDescripcioncatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo_empleados, id_usuario, estatus, descripcion } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield catalogo_empleados_1.dbcatalogo_empleados.findOne({ where: { id_catalogo_empleados: id_catalogo_empleados } });
    if (params) {
        try {
            const resultado = yield catalogo_empleados_1.dbcatalogo_empleados.update({
                estatus: estatus,
                descripcion: descripcion,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_catalogo_empleados: id_catalogo_empleados
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.actualizarHistorialMastercatalogo_empleados)(id_usuario, id_catalogo_empleados, estatus, descripcion);
        }
        catch (error) {
            res.status(404).json({
                msg: 'Ocurrio un inconveniente al tratar de actualizar el registro',
                error
            });
        }
    }
    else {
        return res.status(404).json({
            msg: 'Registro de la tabla : catalogo_empleados  ya almacenado',
        });
    }
});
exports.actualizarEstatusDescripcioncatalogo_empleados = actualizarEstatusDescripcioncatalogo_empleados;
const actualizarDesactivadocatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield catalogo_empleados_1.dbcatalogo_empleados.findOne({ where: { id_catalogo_empleados: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield catalogo_empleados_1.dbcatalogo_empleados.update({
            activo: 1,
        }, {
            where: {
                id_catalogo_empleados: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.ActualDesactivadoHistorialcatalogo_empleados)(id_usuario, id);
        (0, exports.ActualDesactivadoMasterHistorialcatalogo_empleados)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.actualizarDesactivadocatalogo_empleados = actualizarDesactivadocatalogo_empleados;
// ActualDesactivadoHistoria ----------------------------------------------------------------------> 
const ActualDesactivadoHistorialcatalogo_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcatalogo_empleados_1.dbhistorialcatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario cambio el estatus de desactivado a activado :' + id,
            id_cat_empleados: id,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoHistorialcatalogo_empleados = ActualDesactivadoHistorialcatalogo_empleados;
//Desactivar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
const ActualDesactivadoMasterHistorialcatalogo_empleados = (id_usuario, id_catalogo_empleados) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_empleados_1.dbhistorialMastercatalogo_empleados.create({
            id_usuario: id_usuario,
            id_catalogo_empleados: id_catalogo_empleados,
            activo: 1,
            accion: 'El usuario cambio el estatus de desactivado a activado' + id_catalogo_empleados,
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.ActualDesactivadoMasterHistorialcatalogo_empleados = ActualDesactivadoMasterHistorialcatalogo_empleados;
