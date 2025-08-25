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
exports.actualizarEstadoActivocatalogo_areas = exports.DelMasterHistorialcat_areas = exports.actualizarHistorialMastercatalogo_areas = exports.NewHistorialMastercatalogo_areas = exports.actualizarcatalogo_areas = exports.DelHistorialcat_areas = exports.UpdHistorialcat_areas = exports.NewHistorialcat_areas = exports.HistorialgetRegByIdcat_areas = exports.HistorialgetAllcat_areas = exports.delcat_areas = exports.updcat_areas = exports.newcat_areas = exports.getRegByIdcat_areas = exports.getAllcat_areas = exports.timeNow = void 0;
const cat_areas_1 = require("../models/cat_areas");
const catalogo_areas_1 = require("../models/catalogo_areas");
const historialcat_areas_1 = require("../models/historialcat_areas");
const historialMastercatalogo_areas_1 = require("../models/historialMastercatalogo_areas");
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
const getAllcat_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listcat_areas = '';
    if (id_rol == "1") {
        listcat_areas = yield cat_areas_1.dbcat_areas.findAll({ where: { activo: 1 } });
    }
    else {
        listcat_areas = yield cat_areas_1.dbcat_areas.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listcat_areas);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_areas)(id_usuario);
    }
});
exports.getAllcat_areas = getAllcat_areas;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findcat_areas = yield cat_areas_1.dbcat_areas.findOne({ where: { id_cat_areas: id } });
    try {
        if (findcat_areas) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_areas)(id_usuario, id);
            }
            return res.json(findcat_areas);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_areas. ',
            error
        });
    }
    console.log(findcat_areas);
});
exports.getRegByIdcat_areas = getRegByIdcat_areas;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo_areas, id_usuario, id_direccion, text_direccion, descripcion, id_estatuscatalogo_areas, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_areas_1.dbcat_areas.findOne({ where: { id_direccion: id_direccion } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_areas  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_areas_1.dbcat_areas.create({
            id_usuario: id_usuario,
            id_direccion, text_direccion, descripcion,
            id_estatuscatalogo_areas: id_estatuscatalogo_areas,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_areas);
        res.json({
            msg: `cat_areas registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialcat_areas)(id_usuario, id, id_direccion, text_direccion, descripcion);
        (0, exports.actualizarcatalogo_areas)(id_catalogo_areas, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivocatalogo_areas)(id_catalogo_areas);
        (0, exports.NewHistorialMastercatalogo_areas)(id_usuario, id, id_direccion, text_direccion, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_areas = newcat_areas;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_areas, id_direccion, text_direccion, descripcion, id_estatuscatalogo_areas } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_areas_1.dbcat_areas.findOne({ where: { id_cat_areas: id_cat_areas } });
    if (params) {
        try {
            const resultado = yield cat_areas_1.dbcat_areas.update({
                id_usuario: id_usuario,
                id_cat_areas: id_cat_areas,
                id_direccion: id_direccion,
                text_direccion: text_direccion,
                descripcion: descripcion,
                id_estatuscatalogo_areas: id_estatuscatalogo_areas,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_areas: id_cat_areas
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_areas)(id_usuario, id_cat_areas, id_direccion, text_direccion, descripcion);
            (0, exports.actualizarHistorialMastercatalogo_areas)(id_usuario, id_cat_areas, id_direccion, text_direccion, descripcion);
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
            msg: 'Registro de la tabla : cat_areas  ya almacenado',
        });
    }
});
exports.updcat_areas = updcat_areas;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_areas_1.dbcat_areas.findOne({ where: { id_cat_areas: id } });
    const id_cat_areas = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_areas;
    const id_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion;
    const text_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion;
    const descripcion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.descripcion;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_areas_1.dbcat_areas.destroy({
            where: {
                id_cat_areas: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_areas)(id_usuario, id_cat_areas, id_direccion, text_direccion, descripcion);
        (0, exports.DelMasterHistorialcat_areas)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_areas = delcat_areas;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_areas = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_areas_1.dbhistorialcat_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_areas',
            id_cat_areas: '', id_direccion: '', text_direccion: '', descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_areas = HistorialgetAllcat_areas;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_areas_1.dbhistorialcat_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_areas',
            id_cat_areas: id, id_direccion: '', text_direccion: '', descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_areas = HistorialgetRegByIdcat_areas;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_areas = (id_usuario, id, id_direccion, text_direccion, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_areas_1.dbhistorialcat_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_areas',
            id_cat_areas: id, id_direccion: id_direccion, text_direccion: text_direccion, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_areas = NewHistorialcat_areas;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_areas = (id_usuario, id, id_direccion, text_direccion, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_areas_1.dbhistorialcat_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_areas',
            id_cat_areas: id, id_direccion: id_direccion, text_direccion: text_direccion, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_areas = UpdHistorialcat_areas;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_areas = (id_usuario, id, id_direccion, text_direccion, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_areas_1.dbhistorialcat_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_areas',
            id_cat_areas: id, id_direccion: id_direccion, text_direccion: text_direccion, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_areas = DelHistorialcat_areas;
//actualizar en la tabla catalogo_areas ----------------------------------------------------------------------> 
const actualizarcatalogo_areas = (id_catalogo_areas, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield catalogo_areas_1.dbcatalogo_areas.update({
            id_cat_areas: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_catalogo_areas: id_catalogo_areas
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarcatalogo_areas = actualizarcatalogo_areas;
//almacenar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
const NewHistorialMastercatalogo_areas = (id_usuario, id_cat_areas, id_direccion, text_direccion, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            id_cat_areas: id_cat_areas, id_direccion: id_direccion, text_direccion: text_direccion, descripcion: descripcion,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMastercatalogo_areas = NewHistorialMastercatalogo_areas;
//Actualizar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
const actualizarHistorialMastercatalogo_areas = (id_usuario, id_cat_areas, id_direccion, text_direccion, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            id_cat_areas: id_cat_areas, id_direccion: id_direccion, text_direccion: text_direccion, descripcion: descripcion,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMastercatalogo_areas = actualizarHistorialMastercatalogo_areas;
//Desactivar en la tabla Historial Master catalogo_areas ----------------------------------------------------------------------> 
const DelMasterHistorialcat_areas = (id_usuario, id_cat_areas) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_areas_1.dbhistorialMastercatalogo_areas.create({
            id_usuario: id_usuario,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialcat_areas = DelMasterHistorialcat_areas;
//actualizar Estado Activo en la tabla catalogo_areas ----------------------------------------------------------------------> 
const actualizarEstadoActivocatalogo_areas = (id_catalogo_areas) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield catalogo_areas_1.dbcatalogo_areas.update({
            activo: 1,
        }, {
            where: {
                id_catalogo_areas: id_catalogo_areas
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivocatalogo_areas = actualizarEstadoActivocatalogo_areas;
