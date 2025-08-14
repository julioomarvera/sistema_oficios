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
exports.DelHistorialseguimiento_tecnico = exports.UpdHistorialestatusseguimiento_tecnico = exports.NewHistorialseguimiento_tecnico = exports.HistorialgetRegByIdseguimiento_tecnico = exports.HistorialgetAllseguimiento_tecnico = exports.delestatusseguimiento_tecnico = exports.updateestatusseguimiento_tecnico = exports.newestatusseguimiento_tecnico = exports.getRegByIdestatusseguimiento_tecnico = exports.getAllestatusseguimiento_tecnico = exports.timeNow = void 0;
const estatusseguimiento_tecnico_1 = require("../models/estatusseguimiento_tecnico");
const historialestatusseguimiento_tecnico_1 = require("../models/historialestatusseguimiento_tecnico");
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
const getAllestatusseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listseguimiento_tecnico = yield estatusseguimiento_tecnico_1.dbestatusseguimiento_tecnico.findAll({ where: { activo: 1 } });
    res.json(listseguimiento_tecnico);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllseguimiento_tecnico)(id_usuario);
    }
});
exports.getAllestatusseguimiento_tecnico = getAllestatusseguimiento_tecnico;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdestatusseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findseguimiento_tecnico = yield estatusseguimiento_tecnico_1.dbestatusseguimiento_tecnico.findOne({ where: { id_estatusseguimiento_tecnico: id } });
    try {
        if (findseguimiento_tecnico) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdseguimiento_tecnico)(id_usuario, id);
            }
            return res.json(findseguimiento_tecnico);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los seguimiento_tecnico. ',
            error
        });
    }
    console.log(findseguimiento_tecnico);
});
exports.getRegByIdestatusseguimiento_tecnico = getRegByIdestatusseguimiento_tecnico;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newestatusseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, descripcion, activo } = req.body;
    try {
        const resultado = yield estatusseguimiento_tecnico_1.dbestatusseguimiento_tecnico.create({
            id_usuario: id_usuario,
            descripcion: descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_seguimiento_tecnico);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialseguimiento_tecnico)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newestatusseguimiento_tecnico = newestatusseguimiento_tecnico;
//Actualizar el parametro con Id de : id_tecnico--------------------------------------------------------------------------> 
const updateestatusseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_estatusseguimiento_tecnico, descripcion, activo } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield estatusseguimiento_tecnico_1.dbestatusseguimiento_tecnico.findOne({ where: { id_estatusseguimiento_tecnico: id_estatusseguimiento_tecnico } });
    if (params) {
        try {
            const resultado = yield estatusseguimiento_tecnico_1.dbestatusseguimiento_tecnico.update({
                descripcion: descripcion,
                activo: activo,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_estatusseguimiento_tecnico: id_estatusseguimiento_tecnico
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialestatusseguimiento_tecnico)(id_usuario, id_estatusseguimiento_tecnico);
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
            msg: 'Registro de la tabla : seguimiento_tecnico  ya almacenado',
        });
    }
});
exports.updateestatusseguimiento_tecnico = updateestatusseguimiento_tecnico;
//Eliminar un Parametro seguimiento_tecnico--------------------------------------------------------------------------> 
const delestatusseguimiento_tecnico = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield estatusseguimiento_tecnico_1.dbestatusseguimiento_tecnico.findOne({ where: { id_estatusseguimiento_tecnico: id } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield estatusseguimiento_tecnico_1.dbestatusseguimiento_tecnico.update({
            activo: 0,
        }, {
            where: {
                id_estatusseguimiento_tecnico: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialseguimiento_tecnico)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delestatusseguimiento_tecnico = delestatusseguimiento_tecnico;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllseguimiento_tecnico = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusseguimiento_tecnico_1.dbhistorialestatusseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : seguimiento_tecnico',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllseguimiento_tecnico = HistorialgetAllseguimiento_tecnico;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdseguimiento_tecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusseguimiento_tecnico_1.dbhistorialestatusseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: seguimiento_tecnico',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdseguimiento_tecnico = HistorialgetRegByIdseguimiento_tecnico;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialseguimiento_tecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusseguimiento_tecnico_1.dbhistorialestatusseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: seguimiento_tecnico',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialseguimiento_tecnico = NewHistorialseguimiento_tecnico;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialestatusseguimiento_tecnico = (id_usuario, id_tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusseguimiento_tecnico_1.dbhistorialestatusseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: seguimiento_tecnico',
            id_tecnico,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialestatusseguimiento_tecnico = UpdHistorialestatusseguimiento_tecnico;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialseguimiento_tecnico = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialestatusseguimiento_tecnico_1.dbhistorialestatusseguimiento_tecnico.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: seguimiento_tecnico',
            id_tecnico: id,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialseguimiento_tecnico = DelHistorialseguimiento_tecnico;
