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
exports.DelHistorialcat_oficio = exports.UpdHistorialcat_oficio = exports.NewHistorialcat_oficio = exports.HistorialgetRegByIdcat_oficio = exports.HistorialgetAllcat_oficio = exports.delcat_oficio = exports.updcat_oficio = exports.newcat_oficio = exports.getRegByIdcat_oficio = exports.getAllcat_oficio = exports.timeNow = void 0;
const cat_oficio_1 = require("../models/cat_oficio");
const historialcat_oficio_1 = require("../models/historialcat_oficio");
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
const getAllcat_oficio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listcat_oficio = yield cat_oficio_1.dbcat_oficio.findAll({ where: { activo: 1 } });
    res.json(listcat_oficio);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_oficio)(id_usuario);
    }
});
exports.getAllcat_oficio = getAllcat_oficio;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_oficio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcat_oficio = yield cat_oficio_1.dbcat_oficio.findOne({ where: { id_cat_oficio: id } });
    try {
        if (findcat_oficio) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_oficio)(id_usuario, id);
            }
            return res.json(findcat_oficio);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_oficio. ',
            error
        });
    }
    console.log(findcat_oficio);
});
exports.getRegByIdcat_oficio = getRegByIdcat_oficio;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_oficio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo, id_usuario, descripcion, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_oficio_1.dbcat_oficio.findOne({ where: { descripcion: descripcion } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_oficio  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_oficio_1.dbcat_oficio.create({
            descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_oficio);
        res.json({
            msg: `cat_oficio registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialcat_oficio)(id_usuario, id, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_oficio = newcat_oficio;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_oficio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_oficio, descripcion } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_oficio_1.dbcat_oficio.findOne({ where: { id_cat_oficio: id_cat_oficio } });
    if (params) {
        try {
            const resultado = yield cat_oficio_1.dbcat_oficio.update({
                id_cat_oficio: id_cat_oficio,
                descripcion: descripcion,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_oficio: id_cat_oficio
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_oficio)(id_usuario, id_cat_oficio, descripcion);
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
            msg: 'Registro de la tabla : cat_oficio  ya almacenado',
        });
    }
});
exports.updcat_oficio = updcat_oficio;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_oficio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_oficio_1.dbcat_oficio.findOne({ where: { id_cat_oficio: id } });
    const id_cat_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_oficio;
    const descripcion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.descripcion;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_oficio_1.dbcat_oficio.destroy({
            where: {
                id_cat_oficio: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_oficio)(id_usuario, id_cat_oficio, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_oficio = delcat_oficio;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_oficio = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_oficio_1.dbhistorialcat_oficio.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_oficio',
            id_cat_oficio: '', descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_oficio = HistorialgetAllcat_oficio;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_oficio = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_oficio_1.dbhistorialcat_oficio.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_oficio',
            id_cat_oficio: id, descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_oficio = HistorialgetRegByIdcat_oficio;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_oficio = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_oficio_1.dbhistorialcat_oficio.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_oficio',
            id_cat_oficio: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_oficio = NewHistorialcat_oficio;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_oficio = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_oficio_1.dbhistorialcat_oficio.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_oficio',
            id_cat_oficio: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_oficio = UpdHistorialcat_oficio;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_oficio = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_oficio_1.dbhistorialcat_oficio.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_oficio',
            id_cat_oficio: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_oficio = DelHistorialcat_oficio;
