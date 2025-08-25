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
exports.DelHistorialcatalogo_areas = exports.UpdHistorialestatuscatalogo_areas = exports.NewHistorialcatalogo_areas = exports.HistorialgetRegByIdcatalogo_areas = exports.HistorialgetAllcatalogo_areas = exports.delestatuscatalogo_areas = exports.updateestatuscatalogo_areas = exports.newestatuscatalogo_areas = exports.getRegByIdestatuscatalogo_areas = exports.getAllestatuscatalogo_areas = exports.timeNow = void 0;
const estatuscatalogo_areas_1 = require("../models/estatuscatalogo_areas");
const historialestatuscatalogo_areas_1 = require("../models/historialestatuscatalogo_areas");
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
const getAllestatuscatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listcatalogo_areas = yield estatuscatalogo_areas_1.dbestatuscatalogo_areas.findAll({ where: { activo: 1 } });
    res.json(listcatalogo_areas);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcatalogo_areas)(id_usuario);
    }
});
exports.getAllestatuscatalogo_areas = getAllestatuscatalogo_areas;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatuscatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcatalogo_areas = yield estatuscatalogo_areas_1.dbestatuscatalogo_areas.findOne({ where: { id_estatuscatalogo_areas: id } });
    try {
        if (findcatalogo_areas) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcatalogo_areas)(id_usuario, id);
            }
            return res.json(findcatalogo_areas);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_areas. ',
            error
        });
    }
    console.log(findcatalogo_areas);
});
exports.getRegByIdestatuscatalogo_areas = getRegByIdestatuscatalogo_areas;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatuscatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatuscatalogo_areas_1.dbestatuscatalogo_areas.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_catalogo_areas);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialcatalogo_areas)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatuscatalogo_areas = newestatuscatalogo_areas;
//Actualizar el parametro con Id de : id_cat_areas--------------------------------------------------------------------------> 
const updateestatuscatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatuscatalogo_areas, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatuscatalogo_areas_1.dbestatuscatalogo_areas.findOne({ where: { id_estatuscatalogo_areas: id_estatuscatalogo_areas } });
    if (params) {
        try {
            const resultado = yield estatuscatalogo_areas_1.dbestatuscatalogo_areas.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatuscatalogo_areas: id_estatuscatalogo_areas
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatuscatalogo_areas)(id_usuario, id_estatuscatalogo_areas);
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
            msg: 'Registro de la tabla : catalogo_areas  ya almacenado',
        });
    }
});
exports.updateestatuscatalogo_areas = updateestatuscatalogo_areas;
//Eliminar un Parametro catalogo_areas--------------------------------------------------------------------------> 
const delestatuscatalogo_areas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatuscatalogo_areas_1.dbestatuscatalogo_areas.findOne({ where: { id_estatuscatalogo_areas: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatuscatalogo_areas_1.dbestatuscatalogo_areas.update({
            activo: 0,
        }, {
            where: {
                id_estatuscatalogo_areas: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcatalogo_areas)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatuscatalogo_areas = delestatuscatalogo_areas;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcatalogo_areas = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_areas_1.dbhistorialestatuscatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : catalogo_areas',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcatalogo_areas = HistorialgetAllcatalogo_areas;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcatalogo_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_areas_1.dbhistorialestatuscatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: catalogo_areas',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcatalogo_areas = HistorialgetRegByIdcatalogo_areas;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcatalogo_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_areas_1.dbhistorialestatuscatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_areas',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcatalogo_areas = NewHistorialcatalogo_areas;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatuscatalogo_areas = (id_usuario, id_cat_areas) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_areas_1.dbhistorialestatuscatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: catalogo_areas',
            id_cat_areas,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatuscatalogo_areas = UpdHistorialestatuscatalogo_areas;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcatalogo_areas = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_areas_1.dbhistorialestatuscatalogo_areas.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: catalogo_areas',
            id_cat_areas: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcatalogo_areas = DelHistorialcatalogo_areas;
