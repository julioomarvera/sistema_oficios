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
exports.DelHistorialgestion_oficios = exports.UpdHistorialestatusgestion_oficios = exports.NewHistorialgestion_oficios = exports.HistorialgetRegByIdgestion_oficios = exports.HistorialgetAllgestion_oficios = exports.delestatusgestion_oficios = exports.updateestatusgestion_oficios = exports.newestatusgestion_oficios = exports.getRegByIdestatusgestion_oficios = exports.getAllestatusgestion_oficios = exports.timeNow = void 0;
const estatusgestion_oficios_1 = require("../models/estatusgestion_oficios");
const historialestatusgestion_oficios_1 = require("../models/historialestatusgestion_oficios");
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
const getAllestatusgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listgestion_oficios = yield estatusgestion_oficios_1.dbestatusgestion_oficios.findAll({ where: { activo: 1 } });
    res.json(listgestion_oficios);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllgestion_oficios)(id_usuario);
    }
});
exports.getAllestatusgestion_oficios = getAllestatusgestion_oficios;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatusgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findgestion_oficios = yield estatusgestion_oficios_1.dbestatusgestion_oficios.findOne({ where: { id_estatusgestion_oficios: id } });
    try {
        if (findgestion_oficios) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdgestion_oficios)(id_usuario, id);
            }
            return res.json(findgestion_oficios);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los gestion_oficios. ',
            error
        });
    }
    console.log(findgestion_oficios);
});
exports.getRegByIdestatusgestion_oficios = getRegByIdestatusgestion_oficios;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatusgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatusgestion_oficios_1.dbestatusgestion_oficios.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_gestion_oficios);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialgestion_oficios)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatusgestion_oficios = newestatusgestion_oficios;
//Actualizar el parametro con Id de : id_oficios--------------------------------------------------------------------------> 
const updateestatusgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatusgestion_oficios, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatusgestion_oficios_1.dbestatusgestion_oficios.findOne({ where: { id_estatusgestion_oficios: id_estatusgestion_oficios } });
    if (params) {
        try {
            const resultado = yield estatusgestion_oficios_1.dbestatusgestion_oficios.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatusgestion_oficios: id_estatusgestion_oficios
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatusgestion_oficios)(id_usuario, id_estatusgestion_oficios);
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
            msg: 'Registro de la tabla : gestion_oficios  ya almacenado',
        });
    }
});
exports.updateestatusgestion_oficios = updateestatusgestion_oficios;
//Eliminar un Parametro gestion_oficios--------------------------------------------------------------------------> 
const delestatusgestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatusgestion_oficios_1.dbestatusgestion_oficios.findOne({ where: { id_estatusgestion_oficios: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatusgestion_oficios_1.dbestatusgestion_oficios.update({
            activo: 0,
        }, {
            where: {
                id_estatusgestion_oficios: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialgestion_oficios)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatusgestion_oficios = delestatusgestion_oficios;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllgestion_oficios = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusgestion_oficios_1.dbhistorialestatusgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : gestion_oficios',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllgestion_oficios = HistorialgetAllgestion_oficios;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdgestion_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusgestion_oficios_1.dbhistorialestatusgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: gestion_oficios',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdgestion_oficios = HistorialgetRegByIdgestion_oficios;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialgestion_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusgestion_oficios_1.dbhistorialestatusgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: gestion_oficios',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialgestion_oficios = NewHistorialgestion_oficios;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatusgestion_oficios = (id_usuario, id_oficios) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusgestion_oficios_1.dbhistorialestatusgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: gestion_oficios',
            id_oficios,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatusgestion_oficios = UpdHistorialestatusgestion_oficios;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialgestion_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusgestion_oficios_1.dbhistorialestatusgestion_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: gestion_oficios',
            id_oficios: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialgestion_oficios = DelHistorialgestion_oficios;
