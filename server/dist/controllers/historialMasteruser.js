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
exports.delhistorialMasteruser = exports.updatehistorialMasteruser = exports.newhistorialMasteruser = exports.getRegByIdhistorialMasteruser = exports.getAllhistorialMasteruser = exports.timeNow = void 0;
const historialMasteruser_1 = require("../models/historialMasteruser");
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
const getAllhistorialMasteruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listuser = yield historialMasteruser_1.dbhistorialMasteruser.findAll({ where: { activo: 1 } });
    res.json(listuser);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMasteruser = getAllhistorialMasteruser;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMasteruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const finduser = yield historialMasteruser_1.dbhistorialMasteruser.findOne({ where: { id_users: id } });
    try {
        if (finduser) {
            if (id_usuario != null) {
            }
            return res.json(finduser);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los user. ',
            error
        });
    }
    console.log(finduser);
});
exports.getRegByIdhistorialMasteruser = getRegByIdhistorialMasteruser;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMasteruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_user);
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
exports.newhistorialMasteruser = newhistorialMasteruser;
//Actualizar el parametro con Id de : id_users--------------------------------------------------------------------------> 
const updatehistorialMasteruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMasteruser, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMasteruser_1.dbhistorialMasteruser.findOne({ where: { id_historialMasteruser: id_historialMasteruser } });
    if (params) {
        try {
            const resultado = yield historialMasteruser_1.dbhistorialMasteruser.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMasteruser: id_historialMasteruser
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
            msg: 'Registro de la tabla : user  ya almacenado',
        });
    }
});
exports.updatehistorialMasteruser = updatehistorialMasteruser;
//Eliminar un Parametro user--------------------------------------------------------------------------> 
const delhistorialMasteruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMasteruser_1.dbhistorialMasteruser.findOne({ where: { id_historialMasteruser: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMasteruser_1.dbhistorialMasteruser.update({
            activo: 0,
        }, {
            where: {
                id_historialMasteruser: id
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
exports.delhistorialMasteruser = delhistorialMasteruser;
