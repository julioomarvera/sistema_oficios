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
exports.delhistorialMasterseguimiento_tecnico = exports.updatehistorialMasterseguimiento_tecnico = exports.newhistorialMasterseguimiento_tecnico = exports.getRegByIdhistorialMasterseguimiento_tecnico = exports.getAllhistorialMasterseguimiento_tecnico = exports.timeNow = void 0;
const historialMasterseguimiento_tecnico_1 = require("../models/historialMasterseguimiento_tecnico");
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
const getAllhistorialMasterseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listseguimiento_tecnico = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.findAll({ where: { activo: 1 } });
    res.json(listseguimiento_tecnico);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMasterseguimiento_tecnico = getAllhistorialMasterseguimiento_tecnico;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMasterseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findseguimiento_tecnico = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.findOne({ where: { id_tecnico: id } });
    try {
        if (findseguimiento_tecnico) {
            if (id_usuario != null) {
            }
            return res.json(findseguimiento_tecnico);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los seguimiento_tecnico. ',
            error
        });
    }
    console.log(findseguimiento_tecnico);
});
exports.getRegByIdhistorialMasterseguimiento_tecnico = getRegByIdhistorialMasterseguimiento_tecnico;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMasterseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_seguimiento_tecnico);
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
exports.newhistorialMasterseguimiento_tecnico = newhistorialMasterseguimiento_tecnico;
//Actualizar el parametro con Id de : id_tecnico--------------------------------------------------------------------------> 
const updatehistorialMasterseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMasterseguimiento_tecnico, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.findOne({ where: { id_historialMasterseguimiento_tecnico: id_historialMasterseguimiento_tecnico } });
    if (params) {
        try {
            const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMasterseguimiento_tecnico: id_historialMasterseguimiento_tecnico
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
            msg: 'Registro de la tabla : seguimiento_tecnico  ya almacenado',
        });
    }
});
exports.updatehistorialMasterseguimiento_tecnico = updatehistorialMasterseguimiento_tecnico;
//Eliminar un Parametro seguimiento_tecnico--------------------------------------------------------------------------> 
const delhistorialMasterseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.findOne({ where: { id_historialMasterseguimiento_tecnico: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMasterseguimiento_tecnico_1.dbhistorialMasterseguimiento_tecnico.update({
            activo: 0,
        }, {
            where: {
                id_historialMasterseguimiento_tecnico: id
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
exports.delhistorialMasterseguimiento_tecnico = delhistorialMasterseguimiento_tecnico;
