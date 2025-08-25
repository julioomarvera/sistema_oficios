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
exports.delhistorialMasterregistro_destinatario = exports.updatehistorialMasterregistro_destinatario = exports.newhistorialMasterregistro_destinatario = exports.getRegByIdhistorialMasterregistro_destinatario = exports.getAllhistorialMasterregistro_destinatario = exports.timeNow = void 0;
const historialMasterregistro_destinatario_1 = require("../models/historialMasterregistro_destinatario");
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
const getAllhistorialMasterregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listregistro_destinatario = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.findAll({ where: { activo: 1 } });
    res.json(listregistro_destinatario);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMasterregistro_destinatario = getAllhistorialMasterregistro_destinatario;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMasterregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findregistro_destinatario = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.findOne({ where: { id_cat_destinatario: id } });
    try {
        if (findregistro_destinatario) {
            if (id_usuario != null) {
            }
            return res.json(findregistro_destinatario);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los registro_destinatario. ',
            error
        });
    }
    console.log(findregistro_destinatario);
});
exports.getRegByIdhistorialMasterregistro_destinatario = getRegByIdhistorialMasterregistro_destinatario;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMasterregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_registro_destinatario);
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
exports.newhistorialMasterregistro_destinatario = newhistorialMasterregistro_destinatario;
//Actualizar el parametro con Id de : id_cat_destinatario--------------------------------------------------------------------------> 
const updatehistorialMasterregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMasterregistro_destinatario, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.findOne({ where: { id_historialMasterregistro_destinatario: id_historialMasterregistro_destinatario } });
    if (params) {
        try {
            const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMasterregistro_destinatario: id_historialMasterregistro_destinatario
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
            msg: 'Registro de la tabla : registro_destinatario  ya almacenado',
        });
    }
});
exports.updatehistorialMasterregistro_destinatario = updatehistorialMasterregistro_destinatario;
//Eliminar un Parametro registro_destinatario--------------------------------------------------------------------------> 
const delhistorialMasterregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.findOne({ where: { id_historialMasterregistro_destinatario: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.update({
            activo: 0,
        }, {
            where: {
                id_historialMasterregistro_destinatario: id
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
exports.delhistorialMasterregistro_destinatario = delhistorialMasterregistro_destinatario;
