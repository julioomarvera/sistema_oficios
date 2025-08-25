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
exports.getDireccionByNameArea = exports.getAreaByArea = exports.getAreaByDireccion = exports.timeNow = void 0;
const cat_areas_1 = require("../models/cat_areas");
const sequelize_1 = require("sequelize");
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
const getAreaByDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    let listcat_areas = '';
    listcat_areas = yield cat_areas_1.dbcat_areas.findAll({
        where: {
            activo: 1,
            id_direccion: id
        },
        order: [
            ['descripcion', 'ASC']
        ]
    });
    res.json(listcat_areas);
});
exports.getAreaByDireccion = getAreaByDireccion;
const getAreaByArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    let listcat_areas = '';
    listcat_areas = yield cat_areas_1.dbcat_areas.findAll({
        where: {
            activo: 1,
            id_cat_areas: id
        },
        order: [
            ['descripcion', 'ASC']
        ]
    });
    res.json(listcat_areas);
});
exports.getAreaByArea = getAreaByArea;
const getDireccionByNameArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { area } = req.params;
    console.log("Área a buscar:", area);
    try {
        const listcat_areas = yield cat_areas_1.dbcat_areas.findOne({
            where: {
                activo: 1,
                descripcion: {
                    [sequelize_1.Op.like]: `%${area}%` // 👈 Comodines antes y después para buscar contenido parcial
                }
            },
            order: [['descripcion', 'ASC']]
        });
        if (listcat_areas != null) {
            const id_direccion = listcat_areas.dataValues.id_direccion;
            const id_area = listcat_areas.dataValues.id_cat_areas;
            if (id_direccion != "" && id_area != "") {
                let listcat_empleados = '';
                listcat_empleados = yield cat_empleados_1.dbcat_empleados.findOne({ where: { activo: 1, direccion: id_direccion, area: id_area } });
                if (listcat_empleados != null) {
                    const nombreJefe = listcat_empleados.dataValues.nombreJefe;
                    if (nombreJefe != "") {
                        let list_encargado = '';
                        list_encargado = yield cat_empleados_1.dbcat_empleados.findOne({ where: { activo: 1, nombreJefe: nombreJefe } });
                        res.json(list_encargado);
                    }
                }
            }
        }
    }
    catch (error) {
        console.error("Error al buscar áreas:", error);
        res.status(500).json({ error: 'Error al buscar áreas por nombre' });
    }
});
exports.getDireccionByNameArea = getDireccionByNameArea;
