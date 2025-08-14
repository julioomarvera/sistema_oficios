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
exports.DelHistorialcat_tipo_oficios = exports.UpdHistorialcat_tipo_oficios = exports.NewHistorialcat_tipo_oficios = exports.HistorialgetRegByIdcat_tipo_oficios = exports.HistorialgetAllcat_tipo_oficios = exports.delcat_tipo_oficios = exports.updcat_tipo_oficios = exports.newcat_tipo_oficios = exports.getRegByIdcat_tipo_oficios = exports.getAllcat_tipo_oficios = exports.timeNow = void 0;
const cat_tipo_oficios_1 = require("../models/cat_tipo_oficios");
const historialcat_tipo_oficios_1 = require("../models/historialcat_tipo_oficios");
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
const getAllcat_tipo_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listcat_tipo_oficios = yield cat_tipo_oficios_1.dbcat_tipo_oficios.findAll({ where: { activo: 1 } });
    res.json(listcat_tipo_oficios);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_tipo_oficios)(id_usuario);
    }
});
exports.getAllcat_tipo_oficios = getAllcat_tipo_oficios;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_tipo_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcat_tipo_oficios = yield cat_tipo_oficios_1.dbcat_tipo_oficios.findOne({ where: { id_cat_tipo_oficios: id } });
    try {
        if (findcat_tipo_oficios) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_tipo_oficios)(id_usuario, id);
            }
            return res.json(findcat_tipo_oficios);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_tipo_oficios. ',
            error
        });
    }
    console.log(findcat_tipo_oficios);
});
exports.getRegByIdcat_tipo_oficios = getRegByIdcat_tipo_oficios;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_tipo_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo, id_usuario, descripcion, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_tipo_oficios_1.dbcat_tipo_oficios.findOne({ where: { descripcion: descripcion } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_tipo_oficios  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_tipo_oficios_1.dbcat_tipo_oficios.create({
            descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_tipo_oficios);
        res.json({
            msg: `cat_tipo_oficios registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialcat_tipo_oficios)(id_usuario, id, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_tipo_oficios = newcat_tipo_oficios;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_tipo_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_tipo_oficios, descripcion } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_tipo_oficios_1.dbcat_tipo_oficios.findOne({ where: { id_cat_tipo_oficios: id_cat_tipo_oficios } });
    if (params) {
        try {
            const resultado = yield cat_tipo_oficios_1.dbcat_tipo_oficios.update({
                id_cat_tipo_oficios: id_cat_tipo_oficios,
                descripcion: descripcion,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_tipo_oficios: id_cat_tipo_oficios
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_tipo_oficios)(id_usuario, id_cat_tipo_oficios, descripcion);
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
            msg: 'Registro de la tabla : cat_tipo_oficios  ya almacenado',
        });
    }
});
exports.updcat_tipo_oficios = updcat_tipo_oficios;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_tipo_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_tipo_oficios_1.dbcat_tipo_oficios.findOne({ where: { id_cat_tipo_oficios: id } });
    const id_cat_tipo_oficios = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_tipo_oficios;
    const descripcion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.descripcion;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_tipo_oficios_1.dbcat_tipo_oficios.destroy({
            where: {
                id_cat_tipo_oficios: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_tipo_oficios)(id_usuario, id_cat_tipo_oficios, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_tipo_oficios = delcat_tipo_oficios;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_tipo_oficios = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_tipo_oficios_1.dbhistorialcat_tipo_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_tipo_oficios',
            id_cat_tipo_oficios: '', descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_tipo_oficios = HistorialgetAllcat_tipo_oficios;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_tipo_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_tipo_oficios_1.dbhistorialcat_tipo_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_tipo_oficios',
            id_cat_tipo_oficios: id, descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_tipo_oficios = HistorialgetRegByIdcat_tipo_oficios;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_tipo_oficios = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_tipo_oficios_1.dbhistorialcat_tipo_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_tipo_oficios',
            id_cat_tipo_oficios: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_tipo_oficios = NewHistorialcat_tipo_oficios;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_tipo_oficios = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_tipo_oficios_1.dbhistorialcat_tipo_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_tipo_oficios',
            id_cat_tipo_oficios: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_tipo_oficios = UpdHistorialcat_tipo_oficios;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_tipo_oficios = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_tipo_oficios_1.dbhistorialcat_tipo_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_tipo_oficios',
            id_cat_tipo_oficios: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_tipo_oficios = DelHistorialcat_tipo_oficios;
