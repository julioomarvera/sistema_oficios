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
exports.delhistorialMasterfirma = exports.updatehistorialMasterfirma = exports.newhistorialMasterfirma = exports.getRegByIdhistorialMasterfirma = exports.getAllhistorialMasterfirma = exports.timeNow = void 0;
const historialMasterfirma_1 = require("../models/historialMasterfirma");
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
const getAllhistorialMasterfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listfirma = yield historialMasterfirma_1.dbhistorialMasterfirma.findAll({ where: { activo: 1 } });
    res.json(listfirma);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMasterfirma = getAllhistorialMasterfirma;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMasterfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findfirma = yield historialMasterfirma_1.dbhistorialMasterfirma.findOne({ where: { id_firma_coordinador: id } });
    try {
        if (findfirma) {
            if (id_usuario != null) {
            }
            return res.json(findfirma);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los firma. ',
            error
        });
    }
    console.log(findfirma);
});
exports.getRegByIdhistorialMasterfirma = getRegByIdhistorialMasterfirma;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMasterfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_firma);
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
exports.newhistorialMasterfirma = newhistorialMasterfirma;
//Actualizar el parametro con Id de : id_firma_coordinador--------------------------------------------------------------------------> 
const updatehistorialMasterfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMasterfirma, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMasterfirma_1.dbhistorialMasterfirma.findOne({ where: { id_historialMasterfirma: id_historialMasterfirma } });
    if (params) {
        try {
            const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMasterfirma: id_historialMasterfirma
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
            msg: 'Registro de la tabla : firma  ya almacenado',
        });
    }
});
exports.updatehistorialMasterfirma = updatehistorialMasterfirma;
//Eliminar un Parametro firma--------------------------------------------------------------------------> 
const delhistorialMasterfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMasterfirma_1.dbhistorialMasterfirma.findOne({ where: { id_historialMasterfirma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.update({
            activo: 0,
        }, {
            where: {
                id_historialMasterfirma: id
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
exports.delhistorialMasterfirma = delhistorialMasterfirma;
