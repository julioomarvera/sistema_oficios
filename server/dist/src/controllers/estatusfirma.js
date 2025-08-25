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
exports.DelHistorialfirma = exports.UpdHistorialestatusfirma = exports.NewHistorialfirma = exports.HistorialgetRegByIdfirma = exports.HistorialgetAllfirma = exports.delestatusfirma = exports.updateestatusfirma = exports.newestatusfirma = exports.getRegByIdestatusfirma = exports.getAllestatusfirma = exports.timeNow = void 0;
const estatusfirma_1 = require("../models/estatusfirma");
const historialestatusfirma_1 = require("../models/historialestatusfirma");
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
const getAllestatusfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listfirma = yield estatusfirma_1.dbestatusfirma.findAll({ where: { activo: 1 } });
    res.json(listfirma);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllfirma)(id_usuario);
    }
});
exports.getAllestatusfirma = getAllestatusfirma;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatusfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findfirma = yield estatusfirma_1.dbestatusfirma.findOne({ where: { id_estatusfirma: id } });
    try {
        if (findfirma) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdfirma)(id_usuario, id);
            }
            return res.json(findfirma);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los firma. ',
            error
        });
    }
    console.log(findfirma);
});
exports.getRegByIdestatusfirma = getRegByIdestatusfirma;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatusfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatusfirma_1.dbestatusfirma.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_firma);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialfirma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatusfirma = newestatusfirma;
//Actualizar el parametro con Id de : id_firma_coordinador--------------------------------------------------------------------------> 
const updateestatusfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatusfirma, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatusfirma_1.dbestatusfirma.findOne({ where: { id_estatusfirma: id_estatusfirma } });
    if (params) {
        try {
            const resultado = yield estatusfirma_1.dbestatusfirma.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatusfirma: id_estatusfirma
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatusfirma)(id_usuario, id_estatusfirma);
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
            msg: 'Registro de la tabla : firma  ya almacenado',
        });
    }
});
exports.updateestatusfirma = updateestatusfirma;
//Eliminar un Parametro firma--------------------------------------------------------------------------> 
const delestatusfirma = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatusfirma_1.dbestatusfirma.findOne({ where: { id_estatusfirma: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatusfirma_1.dbestatusfirma.update({
            activo: 0,
        }, {
            where: {
                id_estatusfirma: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialfirma)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatusfirma = delestatusfirma;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllfirma = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusfirma_1.dbhistorialestatusfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllfirma = HistorialgetAllfirma;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdfirma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusfirma_1.dbhistorialestatusfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: firma',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdfirma = HistorialgetRegByIdfirma;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialfirma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusfirma_1.dbhistorialestatusfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: firma',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialfirma = NewHistorialfirma;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatusfirma = (id_usuario, id_firma_coordinador) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusfirma_1.dbhistorialestatusfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: firma',
            id_firma_coordinador,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatusfirma = UpdHistorialestatusfirma;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialfirma = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusfirma_1.dbhistorialestatusfirma.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: firma',
            id_firma_coordinador: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialfirma = DelHistorialfirma;
