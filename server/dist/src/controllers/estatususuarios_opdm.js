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
exports.DelHistorialusuarios_opdm = exports.UpdHistorialestatususuarios_opdm = exports.NewHistorialusuarios_opdm = exports.HistorialgetRegByIdusuarios_opdm = exports.HistorialgetAllusuarios_opdm = exports.delestatususuarios_opdm = exports.updateestatususuarios_opdm = exports.newestatususuarios_opdm = exports.getRegByIdestatususuarios_opdm = exports.getAllestatususuarios_opdm = exports.timeNow = void 0;
const estatususuarios_opdm_1 = require("../models/estatususuarios_opdm");
const historialestatususuarios_opdm_1 = require("../models/historialestatususuarios_opdm");
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
const getAllestatususuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listusuarios_opdm = yield estatususuarios_opdm_1.dbestatususuarios_opdm.findAll({ where: { activo: 1 } });
    res.json(listusuarios_opdm);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllusuarios_opdm)(id_usuario);
    }
});
exports.getAllestatususuarios_opdm = getAllestatususuarios_opdm;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatususuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findusuarios_opdm = yield estatususuarios_opdm_1.dbestatususuarios_opdm.findOne({ where: { id_estatususuarios_opdm: id } });
    try {
        if (findusuarios_opdm) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdusuarios_opdm)(id_usuario, id);
            }
            return res.json(findusuarios_opdm);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los usuarios_opdm. ',
            error
        });
    }
    console.log(findusuarios_opdm);
});
exports.getRegByIdestatususuarios_opdm = getRegByIdestatususuarios_opdm;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatususuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatususuarios_opdm_1.dbestatususuarios_opdm.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_usuarios_opdm);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialusuarios_opdm)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatususuarios_opdm = newestatususuarios_opdm;
//Actualizar el parametro con Id de : id_users_opdm--------------------------------------------------------------------------> 
const updateestatususuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatususuarios_opdm, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatususuarios_opdm_1.dbestatususuarios_opdm.findOne({ where: { id_estatususuarios_opdm: id_estatususuarios_opdm } });
    if (params) {
        try {
            const resultado = yield estatususuarios_opdm_1.dbestatususuarios_opdm.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatususuarios_opdm: id_estatususuarios_opdm
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatususuarios_opdm)(id_usuario, id_estatususuarios_opdm);
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
            msg: 'Registro de la tabla : usuarios_opdm  ya almacenado',
        });
    }
});
exports.updateestatususuarios_opdm = updateestatususuarios_opdm;
//Eliminar un Parametro usuarios_opdm--------------------------------------------------------------------------> 
const delestatususuarios_opdm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatususuarios_opdm_1.dbestatususuarios_opdm.findOne({ where: { id_estatususuarios_opdm: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatususuarios_opdm_1.dbestatususuarios_opdm.update({
            activo: 0,
        }, {
            where: {
                id_estatususuarios_opdm: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialusuarios_opdm)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatususuarios_opdm = delestatususuarios_opdm;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllusuarios_opdm = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususuarios_opdm_1.dbhistorialestatususuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : usuarios_opdm',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllusuarios_opdm = HistorialgetAllusuarios_opdm;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdusuarios_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususuarios_opdm_1.dbhistorialestatususuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: usuarios_opdm',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdusuarios_opdm = HistorialgetRegByIdusuarios_opdm;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialusuarios_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususuarios_opdm_1.dbhistorialestatususuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: usuarios_opdm',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialusuarios_opdm = NewHistorialusuarios_opdm;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatususuarios_opdm = (id_usuario, id_users_opdm) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususuarios_opdm_1.dbhistorialestatususuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: usuarios_opdm',
            id_users_opdm,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatususuarios_opdm = UpdHistorialestatususuarios_opdm;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialusuarios_opdm = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususuarios_opdm_1.dbhistorialestatususuarios_opdm.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: usuarios_opdm',
            id_users_opdm: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialusuarios_opdm = DelHistorialusuarios_opdm;
