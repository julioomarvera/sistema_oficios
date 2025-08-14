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
exports.delws_rolles = exports.updws_rolles = exports.newws_rolles = exports.getRegByIdws_rolles = exports.getAllws_rolles = exports.timeNow = void 0;
const rolles_1 = require("../models/rolles");
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
const getAllws_rolles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listws_rolles = yield rolles_1.dbrolles.findAll({ where: { activo: 1 } });
    res.json(listws_rolles);
});
exports.getAllws_rolles = getAllws_rolles;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdws_rolles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const findws_rolles = yield rolles_1.dbrolles.findOne({ where: { id_roll: id } });
    try {
        if (findws_rolles) {
            return res.json(findws_rolles);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los ws_rolles. ',
            error
        });
    }
    console.log(findws_rolles);
});
exports.getRegByIdws_rolles = getRegByIdws_rolles;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newws_rolles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { descripcion, crear, ver, editar, eliminar, activo } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield rolles_1.dbrolles.findOne({ where: { descripcion: descripcion } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : ws_rolles  ya almacenado',
        });
    }
    try {
        const resultado = yield rolles_1.dbrolles.create({
            descripcion, crear, ver, editar, eliminar,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        res.json({
            msg: `ws_rolles '$descripcion\' registrado exitosamente`,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newws_rolles = newws_rolles;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updws_rolles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_roll, descripcion, crear, ver, editar, eliminar, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield rolles_1.dbrolles.findOne({ where: { id_roll: id_roll } });
    if (params) {
        try {
            const resultado = yield rolles_1.dbrolles.update({
                id_roll: id_roll,
                descripcion: descripcion,
                crear: crear,
                ver: ver,
                editar: editar,
                eliminar: eliminar,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_roll: id_roll
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
            msg: 'Registro de la tabla : ws_rolles  ya almacenado',
        });
    }
});
exports.updws_rolles = updws_rolles;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delws_rolles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield rolles_1.dbrolles.findOne({ where: { id_roll: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield rolles_1.dbrolles.destroy({
            where: {
                id_roll: id
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
exports.delws_rolles = delws_rolles;
