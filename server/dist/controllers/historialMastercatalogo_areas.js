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
exports.delhistorialMastercatalogo_areas = exports.updatehistorialMastercatalogo_areas = exports.newhistorialMastercatalogo_areas = exports.getRegByIdhistorialMastercatalogo_areas = exports.getAllhistorialMastercatalogo_areas = exports.timeNow = void 0;
const historialMastercatalogo_areas_1 = require("../models/historialMastercatalogo_areas");
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
const getAllhistorialMastercatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listcatalogo_areas = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.findAll({ where: { activo: 1 } });
    res.json(listcatalogo_areas);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMastercatalogo_areas = getAllhistorialMastercatalogo_areas;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMastercatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcatalogo_areas = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.findOne({ where: { id_cat_areas: id } });
    try {
        if (findcatalogo_areas) {
            if (id_usuario != null) {
            }
            return res.json(findcatalogo_areas);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_areas. ',
            error
        });
    }
    console.log(findcatalogo_areas);
});
exports.getRegByIdhistorialMastercatalogo_areas = getRegByIdhistorialMastercatalogo_areas;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMastercatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_catalogo_areas);
        res.json({
            msg: id,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newhistorialMastercatalogo_areas = newhistorialMastercatalogo_areas;
//Actualizar el parametro con Id de : id_cat_areas--------------------------------------------------------------------------> 
const updatehistorialMastercatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMastercatalogo_areas, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.findOne({ where: { id_historialMastercatalogo_areas: id_historialMastercatalogo_areas } });
    if (params) {
        try {
            const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMastercatalogo_areas: id_historialMastercatalogo_areas
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
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
            msg: 'Registro de la tabla : catalogo_areas  ya almacenado',
        });
    }
});
exports.updatehistorialMastercatalogo_areas = updatehistorialMastercatalogo_areas;
//Eliminar un Parametro catalogo_areas--------------------------------------------------------------------------> 
const delhistorialMastercatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.findOne({ where: { id_historialMastercatalogo_areas: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.update({
            activo: 0,
        }, {
            where: {
                id_historialMastercatalogo_areas: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delhistorialMastercatalogo_areas = delhistorialMastercatalogo_areas;
