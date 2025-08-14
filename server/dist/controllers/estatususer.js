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
exports.DelHistorialuser = exports.UpdHistorialestatususer = exports.NewHistorialuser = exports.HistorialgetRegByIduser = exports.HistorialgetAlluser = exports.delestatususer = exports.updateestatususer = exports.newestatususer = exports.getRegByIdestatususer = exports.getAllestatususer = exports.timeNow = void 0;
const estatususer_1 = require("../models/estatususer");
const historialestatususer_1 = require("../models/historialestatususer");
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
const getAllestatususer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listuser = yield estatususer_1.dbestatususer.findAll({ where: { activo: 1 } });
    res.json(listuser);
    if (id_usuario != null) {
        (0, exports.HistorialgetAlluser)(id_usuario);
    }
});
exports.getAllestatususer = getAllestatususer;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatususer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const finduser = yield estatususer_1.dbestatususer.findOne({ where: { id_estatususer: id } });
    try {
        if (finduser) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIduser)(id_usuario, id);
            }
            return res.json(finduser);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los user. ',
            error
        });
    }
    console.log(finduser);
});
exports.getRegByIdestatususer = getRegByIdestatususer;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatususer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatususer_1.dbestatususer.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_user);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialuser)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatususer = newestatususer;
//Actualizar el parametro con Id de : id_users--------------------------------------------------------------------------> 
const updateestatususer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatususer, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatususer_1.dbestatususer.findOne({ where: { id_estatususer: id_estatususer } });
    if (params) {
        try {
            const resultado = yield estatususer_1.dbestatususer.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatususer: id_estatususer
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatususer)(id_usuario, id_estatususer);
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
            msg: 'Registro de la tabla : user  ya almacenado',
        });
    }
});
exports.updateestatususer = updateestatususer;
//Eliminar un Parametro user--------------------------------------------------------------------------> 
const delestatususer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatususer_1.dbestatususer.findOne({ where: { id_estatususer: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatususer_1.dbestatususer.update({
            activo: 0,
        }, {
            where: {
                id_estatususer: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialuser)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatususer = delestatususer;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAlluser = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususer_1.dbhistorialestatususer.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : user',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAlluser = HistorialgetAlluser;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIduser = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususer_1.dbhistorialestatususer.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: user',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIduser = HistorialgetRegByIduser;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialuser = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususer_1.dbhistorialestatususer.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: user',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialuser = NewHistorialuser;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatususer = (id_usuario, id_users) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususer_1.dbhistorialestatususer.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: user',
            id_users,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatususer = UpdHistorialestatususer;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialuser = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatususer_1.dbhistorialestatususer.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: user',
            id_users: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialuser = DelHistorialuser;
