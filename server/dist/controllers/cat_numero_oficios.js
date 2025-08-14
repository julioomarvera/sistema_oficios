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
exports.get_seguimiento_numero_oficios = exports.DelHistorialcat_numero_oficios = exports.UpdHistorialcat_numero_oficios = exports.NewHistorialcat_numero_oficios = exports.HistorialgetRegByIdcat_numero_oficios = exports.HistorialgetAllcat_numero_oficios = exports.delcat_numero_oficios = exports.updcat_numero_oficios = exports.newcat_numero_oficios = exports.getRegByIdcat_numero_oficios = exports.getAllcat_numero_oficios = exports.timeNow = void 0;
const cat_numero_oficios_1 = require("../models/cat_numero_oficios");
const historialcat_numero_oficios_1 = require("../models/historialcat_numero_oficios");
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
const getAllcat_numero_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const listcat_numero_oficios = yield cat_numero_oficios_1.dbcat_numero_oficios.findAll({ where: { activo: 1 } });
    res.json(listcat_numero_oficios);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_numero_oficios)(id_usuario);
    }
});
exports.getAllcat_numero_oficios = getAllcat_numero_oficios;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_numero_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    const findcat_numero_oficios = yield cat_numero_oficios_1.dbcat_numero_oficios.findOne({ where: { id_cat_numero_oficios: id } });
    try {
        if (findcat_numero_oficios) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_numero_oficios)(id_usuario, id);
            }
            return res.json(findcat_numero_oficios);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_numero_oficios. ',
            error
        });
    }
    console.log(findcat_numero_oficios);
});
exports.getRegByIdcat_numero_oficios = getRegByIdcat_numero_oficios;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_numero_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo, id_usuario, descripcion, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_numero_oficios_1.dbcat_numero_oficios.findOne({ where: { descripcion: descripcion } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_numero_oficios  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_numero_oficios_1.dbcat_numero_oficios.create({
            descripcion,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_numero_oficios);
        res.json({
            msg: `cat_numero_oficios registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialcat_numero_oficios)(id_usuario, id, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_numero_oficios = newcat_numero_oficios;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_numero_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_numero_oficios, descripcion } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_numero_oficios_1.dbcat_numero_oficios.findOne({ where: { id_cat_numero_oficios: id_cat_numero_oficios } });
    if (params) {
        try {
            const resultado = yield cat_numero_oficios_1.dbcat_numero_oficios.update({
                id_cat_numero_oficios: id_cat_numero_oficios,
                descripcion: descripcion,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_numero_oficios: id_cat_numero_oficios
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_numero_oficios)(id_usuario, id_cat_numero_oficios, descripcion);
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
            msg: 'Registro de la tabla : cat_numero_oficios  ya almacenado',
        });
    }
});
exports.updcat_numero_oficios = updcat_numero_oficios;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_numero_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_numero_oficios_1.dbcat_numero_oficios.findOne({ where: { id_cat_numero_oficios: id } });
    const id_cat_numero_oficios = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_numero_oficios;
    const descripcion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.descripcion;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_numero_oficios_1.dbcat_numero_oficios.destroy({
            where: {
                id_cat_numero_oficios: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_numero_oficios)(id_usuario, id_cat_numero_oficios, descripcion);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_numero_oficios = delcat_numero_oficios;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_numero_oficios = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_numero_oficios_1.dbhistorialcat_numero_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_numero_oficios',
            id_cat_numero_oficios: '', descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_numero_oficios = HistorialgetAllcat_numero_oficios;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_numero_oficios = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_numero_oficios_1.dbhistorialcat_numero_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_numero_oficios',
            id_cat_numero_oficios: id, descripcion: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_numero_oficios = HistorialgetRegByIdcat_numero_oficios;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_numero_oficios = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_numero_oficios_1.dbhistorialcat_numero_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_numero_oficios',
            id_cat_numero_oficios: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_numero_oficios = NewHistorialcat_numero_oficios;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_numero_oficios = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_numero_oficios_1.dbhistorialcat_numero_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_numero_oficios',
            id_cat_numero_oficios: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_numero_oficios = UpdHistorialcat_numero_oficios;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_numero_oficios = (id_usuario, id, descripcion) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_numero_oficios_1.dbhistorialcat_numero_oficios.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_numero_oficios',
            id_cat_numero_oficios: id, descripcion: descripcion,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_numero_oficios = DelHistorialcat_numero_oficios;
const get_seguimiento_numero_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    try {
        // Buscar el último registro activo ordenado por ID descendente
        const ultimoRegistro = yield cat_numero_oficios_1.dbcat_numero_oficios.findOne({
            where: { activo: 1 },
            attributes: ['id_cat_numero_oficios'],
            order: [['id_cat_numero_oficios', 'DESC']]
        });
        // Obtener el ID o devolver 1 si no hay registros
        const idUltimo = ultimoRegistro ? ultimoRegistro.get('id_cat_numero_oficios') : 1;
        // Enviar el ID como respuesta
        res.json(idUltimo);
        // Guardar historial si se proporcionó el id_usuario
        if (id_usuario != null) {
            (0, exports.HistorialgetAllcat_numero_oficios)(id_usuario);
        }
    }
    catch (error) {
        console.error('Error al obtener el último registro:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});
exports.get_seguimiento_numero_oficios = get_seguimiento_numero_oficios;
