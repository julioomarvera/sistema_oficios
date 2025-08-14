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
exports.delhistorialMasterregistro_quien_firma = exports.updatehistorialMasterregistro_quien_firma = exports.newhistorialMasterregistro_quien_firma = exports.getRegByIdhistorialMasterregistro_quien_firma = exports.getAllhistorialMasterregistro_quien_firma = exports.timeNow = void 0;
const historialMasterregistro_quien_firma_1 = require("../models/historialMasterregistro_quien_firma");
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
const getAllhistorialMasterregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listregistro_quien_firma = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.findAll({ where: { activo: 1 } });
    res.json(listregistro_quien_firma);
    if (id_usuario != null) {
    }
});
exports.getAllhistorialMasterregistro_quien_firma = getAllhistorialMasterregistro_quien_firma;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdhistorialMasterregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findregistro_quien_firma = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.findOne({ where: { id_cat_firmante: id } });
    try {
        if (findregistro_quien_firma) {
            if (id_usuario != null) {
            }
            return res.json(findregistro_quien_firma);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los registro_quien_firma. ',
            error
        });
    }
    console.log(findregistro_quien_firma);
});
exports.getRegByIdhistorialMasterregistro_quien_firma = getRegByIdhistorialMasterregistro_quien_firma;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newhistorialMasterregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_registro_quien_firma);
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
exports.newhistorialMasterregistro_quien_firma = newhistorialMasterregistro_quien_firma;
//Actualizar el parametro con Id de : id_cat_firmante--------------------------------------------------------------------------> 
const updatehistorialMasterregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_historialMasterregistro_quien_firma, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.findOne({ where: { id_historialMasterregistro_quien_firma: id_historialMasterregistro_quien_firma } });
    if (params) {
        try {
            const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_historialMasterregistro_quien_firma: id_historialMasterregistro_quien_firma
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
            msg: 'Registro de la tabla : registro_quien_firma  ya almacenado',
        });
    }
});
exports.updatehistorialMasterregistro_quien_firma = updatehistorialMasterregistro_quien_firma;
//Eliminar un Parametro registro_quien_firma--------------------------------------------------------------------------> 
const delhistorialMasterregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.findOne({ where: { id_historialMasterregistro_quien_firma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.update({
            activo: 0,
        }, {
            where: {
                id_historialMasterregistro_quien_firma: id
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
exports.delhistorialMasterregistro_quien_firma = delhistorialMasterregistro_quien_firma;
