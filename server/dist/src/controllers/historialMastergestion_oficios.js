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
exports.delhistorialMastergestion_oficios = exports.updatehistorialMastergestion_oficios = exports.newhistorialMastergestion_oficios = exports.getRegByIdhistorialMastergestion_oficios = exports.getAllhistorialMastergestion_oficios = exports.timeNow = void 0;
const historialMastergestion_oficios_1 = require("../models/historialMastergestion_oficios");
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
const getAllhistorialMastergestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listgestion_oficios = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.findAll({ where: { activo: 1 } });
    res.json(listgestion_oficios);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMastergestion_oficios = getAllhistorialMastergestion_oficios;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMastergestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findgestion_oficios = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.findOne({ where: { id_oficios: id } });
    try {
        if (findgestion_oficios) {
            if (id_usuario != null) {
            }
            return res.json(findgestion_oficios);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los gestion_oficios. ',
            error
        });
    }
    console.log(findgestion_oficios);
});
exports.getRegByIdhistorialMastergestion_oficios = getRegByIdhistorialMastergestion_oficios;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMastergestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_gestion_oficios);
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
exports.newhistorialMastergestion_oficios = newhistorialMastergestion_oficios;
//Actualizar el parametro con Id de : id_oficios--------------------------------------------------------------------------> 
const updatehistorialMastergestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMastergestion_oficios, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.findOne({ where: { id_historialMastergestion_oficios: id_historialMastergestion_oficios } });
    if (params) {
        try {
            const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMastergestion_oficios: id_historialMastergestion_oficios
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
            msg: 'Registro de la tabla : gestion_oficios  ya almacenado',
        });
    }
});
exports.updatehistorialMastergestion_oficios = updatehistorialMastergestion_oficios;
//Eliminar un Parametro gestion_oficios--------------------------------------------------------------------------> 
const delhistorialMastergestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.findOne({ where: { id_historialMastergestion_oficios: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMastergestion_oficios_1.dbhistorialMastergestion_oficios.update({
            activo: 0,
        }, {
            where: {
                id_historialMastergestion_oficios: id
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
exports.delhistorialMastergestion_oficios = delhistorialMastergestion_oficios;
