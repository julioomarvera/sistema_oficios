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
exports.DelHistorialcat_direcciones = exports.UpdHistorialcat_direcciones = exports.NewHistorialcat_direcciones = exports.HistorialgetRegByIdcat_direcciones = exports.HistorialgetAllcat_direcciones = exports.delcat_direcciones = exports.updcat_direcciones = exports.newcat_direcciones = exports.getRegByIdcat_direcciones = exports.getAllcat_direcciones = exports.timeNow = void 0;
const cat_direcciones_1 = require("../models/cat_direcciones");
const historialcat_direcciones_1 = require("../models/historialcat_direcciones");
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
const getAllcat_direcciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listcat_direcciones = yield cat_direcciones_1.dbcat_direcciones.findAll({
        where: { activo: 1 },
        order: [
            ['descripcion', 'ASC']
        ]
    });
    res.json(listcat_direcciones);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_direcciones)(id_usuario);
    }
});
exports.getAllcat_direcciones = getAllcat_direcciones;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_direcciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcat_direcciones = yield cat_direcciones_1.dbcat_direcciones.findOne({ where: { id_cat_direcciones: id } });
    try {
        if (findcat_direcciones) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_direcciones)(id_usuario, id);
            }
            return res.json(findcat_direcciones);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_direcciones. ',
            error
        });
    }
    console.log(findcat_direcciones);
});
exports.getRegByIdcat_direcciones = getRegByIdcat_direcciones;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_direcciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo, id_usuario, descripcion, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_direcciones_1.dbcat_direcciones.findOne({ where: { descripcion: descripcion } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_direcciones  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_direcciones_1.dbcat_direcciones.create({
            descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_direcciones);
        res.json({
            msg: `cat_direcciones registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialcat_direcciones)(id_usuario, id, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_direcciones = newcat_direcciones;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_direcciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_direcciones, descripcion } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_direcciones_1.dbcat_direcciones.findOne({ where: { id_cat_direcciones: id_cat_direcciones } });
    if (params) {
        try {
            const resultado = yield cat_direcciones_1.dbcat_direcciones.update({
                id_cat_direcciones: id_cat_direcciones,
                descripcion: descripcion,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_direcciones: id_cat_direcciones
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_direcciones)(id_usuario, id_cat_direcciones, descripcion);
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
            msg: 'Registro de la tabla : cat_direcciones  ya almacenado',
        });
    }
});
exports.updcat_direcciones = updcat_direcciones;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_direcciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_direcciones_1.dbcat_direcciones.findOne({ where: { id_cat_direcciones: id } });
    const id_cat_direcciones = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_direcciones;
    const descripcion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.descripcion;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_direcciones_1.dbcat_direcciones.destroy({
            where: {
                id_cat_direcciones: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_direcciones)(id_usuario, id_cat_direcciones, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_direcciones = delcat_direcciones;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_direcciones = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_direcciones_1.dbhistorialcat_direcciones.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_direcciones',
            id_cat_direcciones: '', descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_direcciones = HistorialgetAllcat_direcciones;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_direcciones = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_direcciones_1.dbhistorialcat_direcciones.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_direcciones',
            id_cat_direcciones: id, descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_direcciones = HistorialgetRegByIdcat_direcciones;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_direcciones = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_direcciones_1.dbhistorialcat_direcciones.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_direcciones',
            id_cat_direcciones: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_direcciones = NewHistorialcat_direcciones;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_direcciones = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_direcciones_1.dbhistorialcat_direcciones.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_direcciones',
            id_cat_direcciones: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_direcciones = UpdHistorialcat_direcciones;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_direcciones = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_direcciones_1.dbhistorialcat_direcciones.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_direcciones',
            id_cat_direcciones: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_direcciones = DelHistorialcat_direcciones;
