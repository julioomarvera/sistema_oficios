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
exports.delhistorialMasterusuarios_opdm = exports.updatehistorialMasterusuarios_opdm = exports.newhistorialMasterusuarios_opdm = exports.getRegByIdhistorialMasterusuarios_opdm = exports.getAllhistorialMasterusuarios_opdm = exports.timeNow = void 0;
const historialMasterusuarios_opdm_1 = require("../models/historialMasterusuarios_opdm");
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
const getAllhistorialMasterusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listusuarios_opdm = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.findAll({ where: { activo: 1 } });
    res.json(listusuarios_opdm);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMasterusuarios_opdm = getAllhistorialMasterusuarios_opdm;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMasterusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findusuarios_opdm = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.findOne({ where: { id_users_opdm: id } });
    try {
        if (findusuarios_opdm) {
            if (id_usuario != null) {
            }
            return res.json(findusuarios_opdm);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los usuarios_opdm. ',
            error
        });
    }
    console.log(findusuarios_opdm);
});
exports.getRegByIdhistorialMasterusuarios_opdm = getRegByIdhistorialMasterusuarios_opdm;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMasterusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_usuarios_opdm);
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
exports.newhistorialMasterusuarios_opdm = newhistorialMasterusuarios_opdm;
//Actualizar el parametro con Id de : id_users_opdm--------------------------------------------------------------------------> 
const updatehistorialMasterusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMasterusuarios_opdm, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.findOne({ where: { id_historialMasterusuarios_opdm: id_historialMasterusuarios_opdm } });
    if (params) {
        try {
            const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMasterusuarios_opdm: id_historialMasterusuarios_opdm
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
            msg: 'Registro de la tabla : usuarios_opdm  ya almacenado',
        });
    }
});
exports.updatehistorialMasterusuarios_opdm = updatehistorialMasterusuarios_opdm;
//Eliminar un Parametro usuarios_opdm--------------------------------------------------------------------------> 
const delhistorialMasterusuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.findOne({ where: { id_historialMasterusuarios_opdm: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMasterusuarios_opdm_1.dbhistorialMasterusuarios_opdm.update({
            activo: 0,
        }, {
            where: {
                id_historialMasterusuarios_opdm: id
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
exports.delhistorialMasterusuarios_opdm = delhistorialMasterusuarios_opdm;
