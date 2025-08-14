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
exports.DelHistorialevidencia_sello = exports.UpdHistorialestatusevidencia_sello = exports.NewHistorialevidencia_sello = exports.HistorialgetRegByIdevidencia_sello = exports.HistorialgetAllevidencia_sello = exports.delestatusevidencia_sello = exports.updateestatusevidencia_sello = exports.newestatusevidencia_sello = exports.getRegByIdestatusevidencia_sello = exports.getAllestatusevidencia_sello = exports.timeNow = void 0;
const estatusevidencia_sello_1 = require("../models/estatusevidencia_sello");
const historialestatusevidencia_sello_1 = require("../models/historialestatusevidencia_sello");
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
const getAllestatusevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listevidencia_sello = yield estatusevidencia_sello_1.dbestatusevidencia_sello.findAll({ where: { activo: 1 } });
    res.json(listevidencia_sello);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllevidencia_sello)(id_usuario);
    }
});
exports.getAllestatusevidencia_sello = getAllestatusevidencia_sello;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatusevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findevidencia_sello = yield estatusevidencia_sello_1.dbestatusevidencia_sello.findOne({ where: { id_estatusevidencia_sello: id } });
    try {
        if (findevidencia_sello) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdevidencia_sello)(id_usuario, id);
            }
            return res.json(findevidencia_sello);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los evidencia_sello. ',
            error
        });
    }
    console.log(findevidencia_sello);
});
exports.getRegByIdestatusevidencia_sello = getRegByIdestatusevidencia_sello;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatusevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatusevidencia_sello_1.dbestatusevidencia_sello.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_evidencia_sello);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialevidencia_sello)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatusevidencia_sello = newestatusevidencia_sello;
//Actualizar el parametro con Id de : id_sello--------------------------------------------------------------------------> 
const updateestatusevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatusevidencia_sello, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatusevidencia_sello_1.dbestatusevidencia_sello.findOne({ where: { id_estatusevidencia_sello: id_estatusevidencia_sello } });
    if (params) {
        try {
            const resultado = yield estatusevidencia_sello_1.dbestatusevidencia_sello.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatusevidencia_sello: id_estatusevidencia_sello
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatusevidencia_sello)(id_usuario, id_estatusevidencia_sello);
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
            msg: 'Registro de la tabla : evidencia_sello  ya almacenado',
        });
    }
});
exports.updateestatusevidencia_sello = updateestatusevidencia_sello;
//Eliminar un Parametro evidencia_sello--------------------------------------------------------------------------> 
const delestatusevidencia_sello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatusevidencia_sello_1.dbestatusevidencia_sello.findOne({ where: { id_estatusevidencia_sello: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatusevidencia_sello_1.dbestatusevidencia_sello.update({
            activo: 0,
        }, {
            where: {
                id_estatusevidencia_sello: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialevidencia_sello)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatusevidencia_sello = delestatusevidencia_sello;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllevidencia_sello = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusevidencia_sello_1.dbhistorialestatusevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : evidencia_sello',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllevidencia_sello = HistorialgetAllevidencia_sello;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdevidencia_sello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusevidencia_sello_1.dbhistorialestatusevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: evidencia_sello',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdevidencia_sello = HistorialgetRegByIdevidencia_sello;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialevidencia_sello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusevidencia_sello_1.dbhistorialestatusevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: evidencia_sello',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialevidencia_sello = NewHistorialevidencia_sello;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatusevidencia_sello = (id_usuario, id_sello) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusevidencia_sello_1.dbhistorialestatusevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: evidencia_sello',
            id_sello,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatusevidencia_sello = UpdHistorialestatusevidencia_sello;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialevidencia_sello = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusevidencia_sello_1.dbhistorialestatusevidencia_sello.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: evidencia_sello',
            id_sello: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialevidencia_sello = DelHistorialevidencia_sello;
