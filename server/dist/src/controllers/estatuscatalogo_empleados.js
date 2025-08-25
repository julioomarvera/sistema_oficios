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
exports.DelHistorialcatalogo_empleados = exports.UpdHistorialestatuscatalogo_empleados = exports.NewHistorialcatalogo_empleados = exports.HistorialgetRegByIdcatalogo_empleados = exports.HistorialgetAllcatalogo_empleados = exports.delestatuscatalogo_empleados = exports.updateestatuscatalogo_empleados = exports.newestatuscatalogo_empleados = exports.getRegByIdestatuscatalogo_empleados = exports.getAllestatuscatalogo_empleados = exports.timeNow = void 0;
const estatuscatalogo_empleados_1 = require("../models/estatuscatalogo_empleados");
const historialestatuscatalogo_empleados_1 = require("../models/historialestatuscatalogo_empleados");
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
const getAllestatuscatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listcatalogo_empleados = yield estatuscatalogo_empleados_1.dbestatuscatalogo_empleados.findAll({ where: { activo: 1 } });
    res.json(listcatalogo_empleados);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcatalogo_empleados)(id_usuario);
    }
});
exports.getAllestatuscatalogo_empleados = getAllestatuscatalogo_empleados;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatuscatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcatalogo_empleados = yield estatuscatalogo_empleados_1.dbestatuscatalogo_empleados.findOne({ where: { id_estatuscatalogo_empleados: id } });
    try {
        if (findcatalogo_empleados) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcatalogo_empleados)(id_usuario, id);
            }
            return res.json(findcatalogo_empleados);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los catalogo_empleados. ',
            error
        });
    }
    console.log(findcatalogo_empleados);
});
exports.getRegByIdestatuscatalogo_empleados = getRegByIdestatuscatalogo_empleados;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatuscatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatuscatalogo_empleados_1.dbestatuscatalogo_empleados.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_catalogo_empleados);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialcatalogo_empleados)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatuscatalogo_empleados = newestatuscatalogo_empleados;
//Actualizar el parametro con Id de : id_cat_empleados--------------------------------------------------------------------------> 
const updateestatuscatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatuscatalogo_empleados, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatuscatalogo_empleados_1.dbestatuscatalogo_empleados.findOne({ where: { id_estatuscatalogo_empleados: id_estatuscatalogo_empleados } });
    if (params) {
        try {
            const resultado = yield estatuscatalogo_empleados_1.dbestatuscatalogo_empleados.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatuscatalogo_empleados: id_estatuscatalogo_empleados
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatuscatalogo_empleados)(id_usuario, id_estatuscatalogo_empleados);
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
            msg: 'Registro de la tabla : catalogo_empleados  ya almacenado',
        });
    }
});
exports.updateestatuscatalogo_empleados = updateestatuscatalogo_empleados;
//Eliminar un Parametro catalogo_empleados--------------------------------------------------------------------------> 
const delestatuscatalogo_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatuscatalogo_empleados_1.dbestatuscatalogo_empleados.findOne({ where: { id_estatuscatalogo_empleados: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatuscatalogo_empleados_1.dbestatuscatalogo_empleados.update({
            activo: 0,
        }, {
            where: {
                id_estatuscatalogo_empleados: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcatalogo_empleados)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatuscatalogo_empleados = delestatuscatalogo_empleados;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcatalogo_empleados = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_empleados_1.dbhistorialestatuscatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : catalogo_empleados',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcatalogo_empleados = HistorialgetAllcatalogo_empleados;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcatalogo_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_empleados_1.dbhistorialestatuscatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: catalogo_empleados',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcatalogo_empleados = HistorialgetRegByIdcatalogo_empleados;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcatalogo_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_empleados_1.dbhistorialestatuscatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: catalogo_empleados',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcatalogo_empleados = NewHistorialcatalogo_empleados;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatuscatalogo_empleados = (id_usuario, id_cat_empleados) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_empleados_1.dbhistorialestatuscatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: catalogo_empleados',
            id_cat_empleados,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatuscatalogo_empleados = UpdHistorialestatuscatalogo_empleados;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcatalogo_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatuscatalogo_empleados_1.dbhistorialestatuscatalogo_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: catalogo_empleados',
            id_cat_empleados: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcatalogo_empleados = DelHistorialcatalogo_empleados;
