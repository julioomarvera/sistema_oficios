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
exports.delhistorialMasterevidencia_sello = exports.updatehistorialMasterevidencia_sello = exports.newhistorialMasterevidencia_sello = exports.getRegByIdhistorialMasterevidencia_sello = exports.getAllhistorialMasterevidencia_sello = exports.timeNow = void 0;
const historialMasterevidencia_sello_1 = require("../models/historialMasterevidencia_sello");
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
const getAllhistorialMasterevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listevidencia_sello = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.findAll({ where: { activo: 1 } });
    res.json(listevidencia_sello);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMasterevidencia_sello = getAllhistorialMasterevidencia_sello;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMasterevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findevidencia_sello = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.findOne({ where: { id_sello: id } });
    try {
        if (findevidencia_sello) {
            if (id_usuario != null) {
            }
            return res.json(findevidencia_sello);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los evidencia_sello. ',
            error
        });
    }
    console.log(findevidencia_sello);
});
exports.getRegByIdhistorialMasterevidencia_sello = getRegByIdhistorialMasterevidencia_sello;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMasterevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_evidencia_sello);
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
exports.newhistorialMasterevidencia_sello = newhistorialMasterevidencia_sello;
//Actualizar el parametro con Id de : id_sello--------------------------------------------------------------------------> 
const updatehistorialMasterevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMasterevidencia_sello, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.findOne({ where: { id_historialMasterevidencia_sello: id_historialMasterevidencia_sello } });
    if (params) {
        try {
            const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMasterevidencia_sello: id_historialMasterevidencia_sello
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
            msg: 'Registro de la tabla : evidencia_sello  ya almacenado',
        });
    }
});
exports.updatehistorialMasterevidencia_sello = updatehistorialMasterevidencia_sello;
//Eliminar un Parametro evidencia_sello--------------------------------------------------------------------------> 
const delhistorialMasterevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.findOne({ where: { id_historialMasterevidencia_sello: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMasterevidencia_sello_1.dbhistorialMasterevidencia_sello.update({
            activo: 0,
        }, {
            where: {
                id_historialMasterevidencia_sello: id
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
exports.delhistorialMasterevidencia_sello = delhistorialMasterevidencia_sello;
