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
exports.DelHistorialmenu = exports.UpdHistorialmenu = exports.NewHistorialmenu = exports.HistorialgetRegByIdmenu = exports.HistorialgetAllmenu = exports.delmenu = exports.updmenu = exports.newmenu = exports.getRegByIdmenu = exports.getAllmenu = exports.timeNow = void 0;
const menu_1 = require("../models/menu");
const historialmenu_1 = require("../models/historialmenu");
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
const getAllmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_roll } = req.params;
    const listmenu = yield menu_1.dbmenu.findAll({ where: { activo: 1, id_roll: id_roll } });
    res.json(listmenu);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllmenu)(id_usuario);
    }
});
exports.getAllmenu = getAllmenu;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findmenu = yield menu_1.dbmenu.findOne({ where: { id_menu: id } });
    try {
        if (findmenu) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdmenu)(id_usuario, id);
            }
            return res.json(findmenu);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los menu. ',
            error
        });
    }
    console.log(findmenu);
});
exports.getRegByIdmenu = getRegByIdmenu;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_roll, titulo, direccion_url } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield menu_1.dbmenu.findOne({ where: { id_roll: id_roll } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : menu  ya almacenado',
        });
    }
    try {
        const resultado = yield menu_1.dbmenu.create({
            id_roll, titulo, direccion_url,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_menu);
        res.json({
            msg: `menu registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialmenu)(id_usuario, id, id_roll, titulo, direccion_url);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newmenu = newmenu;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_menu, id_roll, titulo, direccion_url } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield menu_1.dbmenu.findOne({ where: { id_menu: id_menu } });
    if (params) {
        try {
            const resultado = yield menu_1.dbmenu.update({
                id_menu: id_menu,
                id_roll: id_roll,
                titulo: titulo,
                direccion_url: direccion_url,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_menu: id_menu
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialmenu)(id_usuario, id_menu, id_roll, titulo, direccion_url);
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
            msg: 'Registro de la tabla : menu  ya almacenado',
        });
    }
});
exports.updmenu = updmenu;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delmenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield menu_1.dbmenu.findOne({ where: { id_menu: id } });
    const id_menu = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_menu;
    const id_roll = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_roll;
    const titulo = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.titulo;
    const direccion_url = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.direccion_url;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield menu_1.dbmenu.destroy({
            where: {
                id_menu: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialmenu)(id_usuario, id_menu, id_roll, titulo, direccion_url);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delmenu = delmenu;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllmenu = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialmenu_1.dbhistorialmenu.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : menu',
            id_menu: '', id_roll: '', titulo: '', direccion_url: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllmenu = HistorialgetAllmenu;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdmenu = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialmenu_1.dbhistorialmenu.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: menu',
            id_menu: id, id_roll: '', titulo: '', direccion_url: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdmenu = HistorialgetRegByIdmenu;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialmenu = (id_usuario, id, id_roll, titulo, direccion_url) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialmenu_1.dbhistorialmenu.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: menu',
            id_menu: id, id_roll: id_roll, titulo: titulo, direccion_url: direccion_url,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialmenu = NewHistorialmenu;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialmenu = (id_usuario, id, id_roll, titulo, direccion_url) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialmenu_1.dbhistorialmenu.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: menu',
            id_menu: id, id_roll: id_roll, titulo: titulo, direccion_url: direccion_url,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialmenu = UpdHistorialmenu;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialmenu = (id_usuario, id, id_roll, titulo, direccion_url) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialmenu_1.dbhistorialmenu.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: menu',
            id_menu: id, id_roll: id_roll, titulo: titulo, direccion_url: direccion_url,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialmenu = DelHistorialmenu;
