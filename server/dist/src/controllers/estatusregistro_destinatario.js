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
exports.DelHistorialregistro_destinatario = exports.UpdHistorialestatusregistro_destinatario = exports.NewHistorialregistro_destinatario = exports.HistorialgetRegByIdregistro_destinatario = exports.HistorialgetAllregistro_destinatario = exports.delestatusregistro_destinatario = exports.updateestatusregistro_destinatario = exports.newestatusregistro_destinatario = exports.getRegByIdestatusregistro_destinatario = exports.getAllestatusregistro_destinatario = exports.timeNow = void 0;
const estatusregistro_destinatario_1 = require("../models/estatusregistro_destinatario");
const historialestatusregistro_destinatario_1 = require("../models/historialestatusregistro_destinatario");
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
const getAllestatusregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listregistro_destinatario = yield estatusregistro_destinatario_1.dbestatusregistro_destinatario.findAll({ where: { activo: 1 } });
    res.json(listregistro_destinatario);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllregistro_destinatario)(id_usuario);
    }
});
exports.getAllestatusregistro_destinatario = getAllestatusregistro_destinatario;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatusregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findregistro_destinatario = yield estatusregistro_destinatario_1.dbestatusregistro_destinatario.findOne({ where: { id_estatusregistro_destinatario: id } });
    try {
        if (findregistro_destinatario) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdregistro_destinatario)(id_usuario, id);
            }
            return res.json(findregistro_destinatario);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los registro_destinatario. ',
            error
        });
    }
    console.log(findregistro_destinatario);
});
exports.getRegByIdestatusregistro_destinatario = getRegByIdestatusregistro_destinatario;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatusregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatusregistro_destinatario_1.dbestatusregistro_destinatario.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_registro_destinatario);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialregistro_destinatario)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatusregistro_destinatario = newestatusregistro_destinatario;
//Actualizar el parametro con Id de : id_cat_destinatario--------------------------------------------------------------------------> 
const updateestatusregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatusregistro_destinatario, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatusregistro_destinatario_1.dbestatusregistro_destinatario.findOne({ where: { id_estatusregistro_destinatario: id_estatusregistro_destinatario } });
    if (params) {
        try {
            const resultado = yield estatusregistro_destinatario_1.dbestatusregistro_destinatario.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatusregistro_destinatario: id_estatusregistro_destinatario
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatusregistro_destinatario)(id_usuario, id_estatusregistro_destinatario);
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
            msg: 'Registro de la tabla : registro_destinatario  ya almacenado',
        });
    }
});
exports.updateestatusregistro_destinatario = updateestatusregistro_destinatario;
//Eliminar un Parametro registro_destinatario--------------------------------------------------------------------------> 
const delestatusregistro_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatusregistro_destinatario_1.dbestatusregistro_destinatario.findOne({ where: { id_estatusregistro_destinatario: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatusregistro_destinatario_1.dbestatusregistro_destinatario.update({
            activo: 0,
        }, {
            where: {
                id_estatusregistro_destinatario: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialregistro_destinatario)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatusregistro_destinatario = delestatusregistro_destinatario;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllregistro_destinatario = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_destinatario_1.dbhistorialestatusregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : registro_destinatario',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllregistro_destinatario = HistorialgetAllregistro_destinatario;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdregistro_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_destinatario_1.dbhistorialestatusregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: registro_destinatario',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdregistro_destinatario = HistorialgetRegByIdregistro_destinatario;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialregistro_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_destinatario_1.dbhistorialestatusregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: registro_destinatario',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialregistro_destinatario = NewHistorialregistro_destinatario;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatusregistro_destinatario = (id_usuario, id_cat_destinatario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_destinatario_1.dbhistorialestatusregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: registro_destinatario',
            id_cat_destinatario,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatusregistro_destinatario = UpdHistorialestatusregistro_destinatario;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialregistro_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusregistro_destinatario_1.dbhistorialestatusregistro_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: registro_destinatario',
            id_cat_destinatario: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialregistro_destinatario = DelHistorialregistro_destinatario;
