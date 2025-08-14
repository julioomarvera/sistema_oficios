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
exports.DelHistorialregistro_quien_firma = exports.UpdHistorialestatusregistro_quien_firma = exports.NewHistorialregistro_quien_firma = exports.HistorialgetRegByIdregistro_quien_firma = exports.HistorialgetAllregistro_quien_firma = exports.delestatusregistro_quien_firma = exports.updateestatusregistro_quien_firma = exports.newestatusregistro_quien_firma = exports.getRegByIdestatusregistro_quien_firma = exports.getAllestatusregistro_quien_firma = exports.timeNow = void 0;
const estatusregistro_quien_firma_1 = require("../models/estatusregistro_quien_firma");
const historialestatusregistro_quien_firma_1 = require("../models/historialestatusregistro_quien_firma");
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
const getAllestatusregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listregistro_quien_firma = yield estatusregistro_quien_firma_1.dbestatusregistro_quien_firma.findAll({ where: { activo: 1 } });
    res.json(listregistro_quien_firma);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllregistro_quien_firma)(id_usuario);
    }
});
exports.getAllestatusregistro_quien_firma = getAllestatusregistro_quien_firma;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatusregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findregistro_quien_firma = yield estatusregistro_quien_firma_1.dbestatusregistro_quien_firma.findOne({ where: { id_estatusregistro_quien_firma: id } });
    try {
        if (findregistro_quien_firma) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdregistro_quien_firma)(id_usuario, id);
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
exports.getRegByIdestatusregistro_quien_firma = getRegByIdestatusregistro_quien_firma;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatusregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatusregistro_quien_firma_1.dbestatusregistro_quien_firma.create({
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
        (0, exports.NewHistorialregistro_quien_firma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatusregistro_quien_firma = newestatusregistro_quien_firma;
//Actualizar el parametro con Id de : id_cat_firmante--------------------------------------------------------------------------> 
const updateestatusregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatusregistro_quien_firma, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatusregistro_quien_firma_1.dbestatusregistro_quien_firma.findOne({ where: { id_estatusregistro_quien_firma: id_estatusregistro_quien_firma } });
    if (params) {
        try {
            const resultado = yield estatusregistro_quien_firma_1.dbestatusregistro_quien_firma.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatusregistro_quien_firma: id_estatusregistro_quien_firma
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatusregistro_quien_firma)(id_usuario, id_estatusregistro_quien_firma);
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
exports.updateestatusregistro_quien_firma = updateestatusregistro_quien_firma;
//Eliminar un Parametro registro_quien_firma--------------------------------------------------------------------------> 
const delestatusregistro_quien_firma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatusregistro_quien_firma_1.dbestatusregistro_quien_firma.findOne({ where: { id_estatusregistro_quien_firma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatusregistro_quien_firma_1.dbestatusregistro_quien_firma.update({
            activo: 0,
        }, {
            where: {
                id_estatusregistro_quien_firma: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialregistro_quien_firma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatusregistro_quien_firma = delestatusregistro_quien_firma;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllregistro_quien_firma = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_quien_firma_1.dbhistorialestatusregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : registro_quien_firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllregistro_quien_firma = HistorialgetAllregistro_quien_firma;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdregistro_quien_firma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_quien_firma_1.dbhistorialestatusregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: registro_quien_firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdregistro_quien_firma = HistorialgetRegByIdregistro_quien_firma;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialregistro_quien_firma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_quien_firma_1.dbhistorialestatusregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: registro_quien_firma',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialregistro_quien_firma = NewHistorialregistro_quien_firma;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatusregistro_quien_firma = (id_usuario, id_cat_firmante) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_quien_firma_1.dbhistorialestatusregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: registro_quien_firma',
            id_cat_firmante,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatusregistro_quien_firma = UpdHistorialestatusregistro_quien_firma;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialregistro_quien_firma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_quien_firma_1.dbhistorialestatusregistro_quien_firma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: registro_quien_firma',
            id_cat_firmante: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialregistro_quien_firma = DelHistorialregistro_quien_firma;
