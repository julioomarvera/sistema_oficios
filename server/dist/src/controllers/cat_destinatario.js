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
exports.getEstatusDestinatario = exports.actualizarEstatusDestinatario = exports.ccp_destinatario = exports.get_id_gestion_oficiosByArea = exports.actualizarEstadoActivoregistro_destinatario = exports.DelMasterHistorialcat_destinatario = exports.actualizarHistorialMasterregistro_destinatario = exports.NewHistorialMasterregistro_destinatario = exports.actualizarregistro_destinatario = exports.DelHistorialcat_destinatario = exports.UpdHistorialcat_destinatario = exports.NewHistorialcat_destinatario = exports.HistorialgetRegByIdcat_destinatario = exports.HistorialgetAllcat_destinatario = exports.delcat_destinatario = exports.cancelarDestinatario = exports.updcat_destinatario = exports.newcat_destinatario = exports.getRegByIdcat_destinatario = exports.getregistro_destinatarioByid_gestion_oficios = exports.getAllcat_destinatario = exports.timeNow = void 0;
const cat_destinatario_1 = require("../models/cat_destinatario");
const registro_destinatario_1 = require("../models/registro_destinatario");
const historialcat_destinatario_1 = require("../models/historialcat_destinatario");
const historialMasterregistro_destinatario_1 = require("../models/historialMasterregistro_destinatario");
const sequelize_1 = require("sequelize");
const { Sequelize, DataTypes } = require('sequelize');
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
const getAllcat_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listcat_destinatario = '';
    if (id_rol == "1") {
        listcat_destinatario = yield cat_destinatario_1.dbcat_destinatario.findAll({ where: { activo: 1 } });
    }
    else {
        listcat_destinatario = yield cat_destinatario_1.dbcat_destinatario.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listcat_destinatario);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_destinatario)(id_usuario);
    }
});
exports.getAllcat_destinatario = getAllcat_destinatario;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getregistro_destinatarioByid_gestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios } = req.params;
    console.log(id_gestion_oficios);
    let listcat_destinatario = '';
    listcat_destinatario = yield cat_destinatario_1.dbcat_destinatario.findAll({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios } });
    res.json(listcat_destinatario);
});
exports.getregistro_destinatarioByid_gestion_oficios = getregistro_destinatarioByid_gestion_oficios;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findcat_destinatario = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_cat_destinatario: id } });
    try {
        if (findcat_destinatario) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_destinatario)(id_usuario, id);
            }
            return res.json(findcat_destinatario);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_destinatario. ',
            error
        });
    }
    console.log(findcat_destinatario);
});
exports.getRegByIdcat_destinatario = getRegByIdcat_destinatario;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_registro_destinatario, id_usuario, id_gestion_oficios, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus, id_estatusregistro_destinatario, con_copia, PaginaActual, finalizado, fecha_terminacion } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios, area_texto: area_texto } }); //a
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_destinatario_1.dbcat_destinatario.create({
            id_usuario: id_usuario,
            id_gestion_oficios: id_gestion_oficios,
            id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus,
            id_estatusregistro_destinatario: id_estatusregistro_destinatario,
            con_copia: con_copia,
            fecha_terminacion: fecha_terminacion,
            activo: 1,
            visto: 0,
            respuesta: 0,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_destinatario);
        res.json({
            msg: `cat_destinatario registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialcat_destinatario)(id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
        (0, exports.actualizarregistro_destinatario)(id_registro_destinatario, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivoregistro_destinatario)(id_registro_destinatario);
        (0, exports.NewHistorialMasterregistro_destinatario)(id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_destinatario = newcat_destinatario;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus, id_estatusregistro_destinatario, con_copia, } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_cat_destinatario: id_cat_destinatario } });
    if (params) {
        try {
            const resultado = yield cat_destinatario_1.dbcat_destinatario.update({
                id_usuario: id_usuario,
                id_cat_destinatario: id_cat_destinatario,
                id_direccion: id_direccion,
                text_direccion: text_direccion,
                id_area: id_area,
                area_texto: area_texto,
                numero_empledo: numero_empledo,
                text_nombre_empleado: text_nombre_empleado,
                foto: foto,
                id_oficio: id_oficio,
                estatus: estatus,
                id_estatusregistro_destinatario: id_estatusregistro_destinatario,
                con_copia: con_copia,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_destinatario: id_cat_destinatario
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_destinatario)(id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
            (0, exports.actualizarHistorialMasterregistro_destinatario)(id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
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
            msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
        });
    }
});
exports.updcat_destinatario = updcat_destinatario;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const cancelarDestinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_cat_destinatario, id_gestion_oficios } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios } });
    if (params) {
        try {
            const resultado = yield cat_destinatario_1.dbcat_destinatario.update({
                activo: 0,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_gestion_oficios: id_gestion_oficios, id_cat_destinatario: id_cat_destinatario
                },
            });
            res.json("1");
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
            msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
        });
    }
});
exports.cancelarDestinatario = cancelarDestinatario;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_cat_destinatario: id } });
    const id_cat_destinatario = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_destinatario;
    const id_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion;
    const text_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion;
    const id_area = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area;
    const area_texto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.area_texto;
    const numero_empledo = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empledo;
    const text_nombre_empleado = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_nombre_empleado;
    const foto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto;
    const id_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_oficio;
    const estatus = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.estatus;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_destinatario_1.dbcat_destinatario.destroy({
            where: {
                id_cat_destinatario: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_destinatario)(id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus);
        (0, exports.DelMasterHistorialcat_destinatario)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_destinatario = delcat_destinatario;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_destinatario = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_destinatario_1.dbhistorialcat_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_destinatario',
            id_cat_destinatario: '', id_direccion: '', text_direccion: '', id_area: '', area_texto: '', numero_empledo: '', text_nombre_empleado: '', foto: '', id_oficio: '', estatus: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_destinatario = HistorialgetAllcat_destinatario;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_destinatario = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_destinatario_1.dbhistorialcat_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_destinatario',
            id_cat_destinatario: id, id_direccion: '', text_direccion: '', id_area: '', area_texto: '', numero_empledo: '', text_nombre_empleado: '', foto: '', id_oficio: '', estatus: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_destinatario = HistorialgetRegByIdcat_destinatario;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_destinatario = (id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_destinatario_1.dbhistorialcat_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_destinatario',
            id_cat_destinatario: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_destinatario = NewHistorialcat_destinatario;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_destinatario = (id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_destinatario_1.dbhistorialcat_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_destinatario',
            id_cat_destinatario: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_destinatario = UpdHistorialcat_destinatario;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_destinatario = (id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_destinatario_1.dbhistorialcat_destinatario.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_destinatario',
            id_cat_destinatario: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_destinatario = DelHistorialcat_destinatario;
//actualizar en la tabla registro_destinatario ----------------------------------------------------------------------> 
const actualizarregistro_destinatario = (id_registro_destinatario, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield registro_destinatario_1.dbregistro_destinatario.update({
            id_cat_destinatario: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_registro_destinatario: id_registro_destinatario
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarregistro_destinatario = actualizarregistro_destinatario;
//almacenar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
const NewHistorialMasterregistro_destinatario = (id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            id_cat_destinatario: id_cat_destinatario, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasterregistro_destinatario = NewHistorialMasterregistro_destinatario;
//Actualizar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
const actualizarHistorialMasterregistro_destinatario = (id_usuario, id_cat_destinatario, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, estatus) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            id_cat_destinatario: id_cat_destinatario, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, estatus: estatus,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterregistro_destinatario = actualizarHistorialMasterregistro_destinatario;
//Desactivar en la tabla Historial Master registro_destinatario ----------------------------------------------------------------------> 
const DelMasterHistorialcat_destinatario = (id_usuario, id_cat_destinatario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_destinatario_1.dbhistorialMasterregistro_destinatario.create({
            id_usuario: id_usuario,
            activo: 0,
            accion: 'El usuario elimino el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.DelMasterHistorialcat_destinatario = DelMasterHistorialcat_destinatario;
//actualizar Estado Activo en la tabla registro_destinatario ----------------------------------------------------------------------> 
const actualizarEstadoActivoregistro_destinatario = (id_registro_destinatario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield registro_destinatario_1.dbregistro_destinatario.update({
            activo: 1,
        }, {
            where: {
                id_registro_destinatario: id_registro_destinatario
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivoregistro_destinatario = actualizarEstadoActivoregistro_destinatario;
// 1. Define los tipos
// interface Destinatario {
//   id_gestion_oficios: number;
//   id_oficio: number;
// }
// interface Oficio {
//   id_oficios: number;
//   numero_oficio: string;
//   asunto: string;
//   archivo_oficio: string;
//   fecha_hora: string;
//   text_oficio: string;
//   text_tipo: string;
// }
// interface DestinatarioConOficio extends Destinatario {
//   oficio: Oficio | null;
// }
// 2. Función principal
const get_id_gestion_oficiosByArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion, id_area, estatus } = req.params;
    const whereDestinatarios = {
        activo: 1,
        id_direccion,
        id_area,
        id_oficio: {
            [sequelize_1.Op.ne]: "" // 👈 Esto es lo que necesitas
        }
    };
    if (estatus !== "5") {
        whereDestinatarios.estatus = estatus;
    }
    try {
        const destinatarios = yield cat_destinatario_1.dbcat_destinatario.findAll({
            where: whereDestinatarios
        });
        return res.json(destinatarios);
    }
    catch (error) {
        console.error('Error al filtrar por estatus:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.get_id_gestion_oficiosByArea = get_id_gestion_oficiosByArea;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const ccp_destinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_cat_destinatario, id_gestion_oficios } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_cat_destinatario: id_cat_destinatario, id_gestion_oficios: id_gestion_oficios } });
    console.log(req.params);
    if (params) {
        try {
            let ccp = params.dataValues.con_copia;
            if (ccp == 0) {
                ccp = 1;
            }
            else {
                ccp = 0;
            }
            const resultado = yield cat_destinatario_1.dbcat_destinatario.update({
                con_copia: ccp,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_gestion_oficios: id_gestion_oficios, id_cat_destinatario: id_cat_destinatario
                },
            });
            res.json("1");
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
            msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
        });
    }
});
exports.ccp_destinatario = ccp_destinatario;
const actualizarEstatusDestinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_gestion_oficios, id_direccion, id_area, estatus } = req.params;
    const params = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, id_area: id_area } });
    //1 es cuando julio ya subio el pdf y ya le dio asignacion al area correspondiente
    //2 es cuando el area correcpondiente (detinatario ) ya vio el     oficio
    //3 es cuando el destinatario ya sello ( de recibido )  el oficio
    //4 es cuando se asigno al tecnico para su conocimiento
    // 5 es cuando lo firmo el coordinador
    const estatusActual = parseInt(params === null || params === void 0 ? void 0 : params.dataValues.estatus);
    let estatusfront = parseInt(estatus);
    if (estatusfront > estatusActual) {
        if (params) {
            try {
                const resultado = yield cat_destinatario_1.dbcat_destinatario.update({
                    estatus: estatus,
                    createdAt: time,
                    updatedAt: time,
                }, {
                    where: {
                        id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, id_area: id_area
                    },
                });
                res.json("1");
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
                msg: 'Registro de la tabla : cat_destinatario  ya almacenado',
            });
        }
    }
    else {
        res.json("1");
    }
});
exports.actualizarEstatusDestinatario = actualizarEstatusDestinatario;
const getEstatusDestinatario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //1 es cuando julio ya subio el pdf y ya le dio asignacion al area correspondiente
    //2 es cuando el area correcpondiente (detinatario ) ya vio el     oficio
    //3 es cuando el destinatario ya sello ( de recibido )  el oficio
    //4 es cuando se asigno al tecnico para su conocimiento
    // 5 es cuando lo firmo el coordinador
    const time = (0, exports.timeNow)();
    const { id_gestion_oficios, id_direccion, id_area } = req.params;
    try {
        const params = yield cat_destinatario_1.dbcat_destinatario.findOne({ where: { id_gestion_oficios: id_gestion_oficios, id_direccion: id_direccion, id_area: id_area } });
        return res.json(params);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.getEstatusDestinatario = getEstatusDestinatario;
