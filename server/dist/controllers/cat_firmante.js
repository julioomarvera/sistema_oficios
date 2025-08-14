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
exports.getregistro_quien_firma_by_id_gestion_oficios = exports.actualizarEstadoActivoregistro_quien_firma = exports.DelMasterHistorialcat_firmante = exports.actualizarHistorialMasterregistro_quien_firma = exports.NewHistorialMasterregistro_quien_firma = exports.actualizarregistro_quien_firma = exports.DelHistorialcat_firmante = exports.UpdHistorialcat_firmante = exports.NewHistorialcat_firmante = exports.HistorialgetRegByIdcat_firmante = exports.HistorialgetAllcat_firmante = exports.delcat_firmante = exports.updcat_firmante = exports.newcat_firmante = exports.getRegByIdcat_firmante = exports.cancelFirmante = exports.getcat_firmanteByid_gestion_oficios = exports.getAllcat_firmante = exports.timeNow = void 0;
const cat_firmante_1 = require("../models/cat_firmante");
const registro_quien_firma_1 = require("../models/registro_quien_firma");
const historialcat_firmante_1 = require("../models/historialcat_firmante");
const historialMasterregistro_quien_firma_1 = require("../models/historialMasterregistro_quien_firma");
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
const getAllcat_firmante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listcat_firmante = '';
    if (id_rol == "1") {
        listcat_firmante = yield cat_firmante_1.dbcat_firmante.findAll({ where: { activo: 1 } });
    }
    else {
        listcat_firmante = yield cat_firmante_1.dbcat_firmante.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listcat_firmante);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_firmante)(id_usuario);
    }
});
exports.getAllcat_firmante = getAllcat_firmante;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getcat_firmanteByid_gestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios } = req.params;
    let listcat_firmante = '';
    listcat_firmante = yield cat_firmante_1.dbcat_firmante.findOne({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios } });
    res.json(listcat_firmante);
});
exports.getcat_firmanteByid_gestion_oficios = getcat_firmanteByid_gestion_oficios;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const cancelFirmante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios } = req.params;
    const resultado = yield cat_firmante_1.dbcat_firmante.update({ activo: 0 }, {
        where: {
            id_gestion_oficios: id_gestion_oficios
        },
    });
    res.json(resultado);
});
exports.cancelFirmante = cancelFirmante;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_firmante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findcat_firmante = yield cat_firmante_1.dbcat_firmante.findOne({ where: { id_cat_firmante: id } });
    try {
        if (findcat_firmante) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_firmante)(id_usuario, id);
            }
            return res.json(findcat_firmante);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_firmante. ',
            error
        });
    }
    console.log(findcat_firmante);
});
exports.getRegByIdcat_firmante = getRegByIdcat_firmante;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_firmante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_registro_quien_firma, id_usuario, id_gestion_oficios, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro, id_estatusregistro_quien_firma, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_firmante_1.dbcat_firmante.findOne({ where: { id_gestion_oficios: id_gestion_oficios, numero_empledo: numero_empledo, activo: 1 } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_firmante  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_firmante_1.dbcat_firmante.create({
            id_usuario: id_usuario,
            id_gestion_oficios: id_gestion_oficios,
            id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro,
            id_estatusregistro_quien_firma: id_estatusregistro_quien_firma,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_firmante);
        res.json({
            msg: id,
        });
        (0, exports.NewHistorialcat_firmante)(id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro);
        (0, exports.actualizarregistro_quien_firma)(id_registro_quien_firma, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivoregistro_quien_firma)(id_registro_quien_firma);
        (0, exports.NewHistorialMasterregistro_quien_firma)(id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_firmante = newcat_firmante;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_firmante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_firmante, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro, id_estatusregistro_quien_firma } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_firmante_1.dbcat_firmante.findOne({ where: { id_cat_firmante: id_cat_firmante } });
    if (params) {
        try {
            const resultado = yield cat_firmante_1.dbcat_firmante.update({
                id_usuario: id_usuario,
                id_cat_firmante: id_cat_firmante,
                id_direccion: id_direccion,
                text_direccion: text_direccion,
                id_area: id_area,
                area_texto: area_texto,
                numero_empledo: numero_empledo,
                text_nombre_empleado: text_nombre_empleado,
                foto: foto,
                id_oficio: id_oficio,
                otro: otro,
                id_estatusregistro_quien_firma: id_estatusregistro_quien_firma,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_firmante: id_cat_firmante
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_firmante)(id_usuario, id_cat_firmante, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro);
            (0, exports.actualizarHistorialMasterregistro_quien_firma)(id_usuario, id_cat_firmante, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro);
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
            msg: 'Registro de la tabla : cat_firmante  ya almacenado',
        });
    }
});
exports.updcat_firmante = updcat_firmante;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_firmante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_firmante_1.dbcat_firmante.findOne({ where: { id_cat_firmante: id } });
    const id_cat_firmante = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_firmante;
    const id_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion;
    const text_direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion;
    const id_area = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area;
    const area_texto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.area_texto;
    const numero_empledo = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empledo;
    const text_nombre_empleado = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_nombre_empleado;
    const foto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto;
    const id_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_oficio;
    const otro = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.otro;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_firmante_1.dbcat_firmante.destroy({
            where: {
                id_cat_firmante: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_firmante)(id_usuario, id_cat_firmante, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro);
        (0, exports.DelMasterHistorialcat_firmante)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_firmante = delcat_firmante;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_firmante = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_firmante_1.dbhistorialcat_firmante.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_firmante',
            id_cat_firmante: '', id_direccion: '', text_direccion: '', id_area: '', area_texto: '', numero_empledo: '', text_nombre_empleado: '', foto: '', id_oficio: '', otro: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_firmante = HistorialgetAllcat_firmante;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_firmante = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_firmante_1.dbhistorialcat_firmante.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_firmante',
            id_cat_firmante: id, id_direccion: '', text_direccion: '', id_area: '', area_texto: '', numero_empledo: '', text_nombre_empleado: '', foto: '', id_oficio: '', otro: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_firmante = HistorialgetRegByIdcat_firmante;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_firmante = (id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_firmante_1.dbhistorialcat_firmante.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_firmante',
            id_cat_firmante: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_firmante = NewHistorialcat_firmante;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_firmante = (id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_firmante_1.dbhistorialcat_firmante.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_firmante',
            id_cat_firmante: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_firmante = UpdHistorialcat_firmante;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_firmante = (id_usuario, id, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_firmante_1.dbhistorialcat_firmante.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_firmante',
            id_cat_firmante: id, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_firmante = DelHistorialcat_firmante;
//actualizar en la tabla registro_quien_firma ----------------------------------------------------------------------> 
const actualizarregistro_quien_firma = (id_registro_quien_firma, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield registro_quien_firma_1.dbregistro_quien_firma.update({
            id_cat_firmante: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_registro_quien_firma: id_registro_quien_firma
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarregistro_quien_firma = actualizarregistro_quien_firma;
//almacenar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
const NewHistorialMasterregistro_quien_firma = (id_usuario, id_cat_firmante, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
            id_usuario: id_usuario,
            id_cat_firmante: id_cat_firmante, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, otro: otro,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasterregistro_quien_firma = NewHistorialMasterregistro_quien_firma;
//Actualizar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
const actualizarHistorialMasterregistro_quien_firma = (id_usuario, id_cat_firmante, id_direccion, text_direccion, id_area, area_texto, numero_empledo, text_nombre_empleado, foto, id_oficio, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
            id_usuario: id_usuario,
            id_cat_firmante: id_cat_firmante, id_direccion: id_direccion, text_direccion: text_direccion, id_area: id_area, area_texto: area_texto, numero_empledo: numero_empledo, text_nombre_empleado: text_nombre_empleado, foto: foto, id_oficio: id_oficio, otro: otro,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterregistro_quien_firma = actualizarHistorialMasterregistro_quien_firma;
//Desactivar en la tabla Historial Master registro_quien_firma ----------------------------------------------------------------------> 
const DelMasterHistorialcat_firmante = (id_usuario, id_cat_firmante) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterregistro_quien_firma_1.dbhistorialMasterregistro_quien_firma.create({
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
exports.DelMasterHistorialcat_firmante = DelMasterHistorialcat_firmante;
//actualizar Estado Activo en la tabla registro_quien_firma ----------------------------------------------------------------------> 
const actualizarEstadoActivoregistro_quien_firma = (id_registro_quien_firma) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield registro_quien_firma_1.dbregistro_quien_firma.update({
            activo: 1,
        }, {
            where: {
                id_registro_quien_firma: id_registro_quien_firma
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivoregistro_quien_firma = actualizarEstadoActivoregistro_quien_firma;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getregistro_quien_firma_by_id_gestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios } = req.params;
    let listcat_firmante = '';
    listcat_firmante = yield cat_firmante_1.dbcat_firmante.findOne({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios } });
    res.json(listcat_firmante);
});
exports.getregistro_quien_firma_by_id_gestion_oficios = getregistro_quien_firma_by_id_gestion_oficios;
