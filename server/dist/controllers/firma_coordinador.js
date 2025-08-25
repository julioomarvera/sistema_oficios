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
exports.actualizarEstadoActivofirma = exports.DelMasterHistorialfirma_coordinador = exports.actualizarHistorialMasterfirma = exports.NewHistorialMasterfirma = exports.actualizarfirma = exports.DelHistorialfirma_coordinador = exports.UpdHistorialfirma_coordinador = exports.NewHistorialfirma_coordinador = exports.HistorialgetRegByIdfirma_coordinador = exports.HistorialgetAllfirma_coordinador = exports.delfirma_coordinador = exports.updfirma_coordinador = exports.newfirma_coordinador = exports.getRegByIdfirma_coordinador = exports.getAllfirma_coordinador = exports.timeNow = void 0;
const firma_coordinador_1 = require("../models/firma_coordinador");
const firma_1 = require("../models/firma");
const historialfirma_coordinador_1 = require("../models/historialfirma_coordinador");
const historialMasterfirma_1 = require("../models/historialMasterfirma");
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
const getAllfirma_coordinador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listfirma_coordinador = '';
    if (id_rol == "1") {
        listfirma_coordinador = yield firma_coordinador_1.dbfirma_coordinador.findAll({ where: { activo: 1 } });
    }
    else {
        listfirma_coordinador = yield firma_coordinador_1.dbfirma_coordinador.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listfirma_coordinador);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllfirma_coordinador)(id_usuario);
    }
});
exports.getAllfirma_coordinador = getAllfirma_coordinador;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdfirma_coordinador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findfirma_coordinador = yield firma_coordinador_1.dbfirma_coordinador.findOne({ where: { id_firma_coordinador: id } });
    try {
        if (findfirma_coordinador) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdfirma_coordinador)(id_usuario, id);
            }
            return res.json(findfirma_coordinador);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los firma_coordinador. ',
            error
        });
    }
    console.log(findfirma_coordinador);
});
exports.getRegByIdfirma_coordinador = getRegByIdfirma_coordinador;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newfirma_coordinador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_firma, id_usuario, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro, id_estatusfirma, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield firma_coordinador_1.dbfirma_coordinador.findOne({ where: { id_gestion_oficio: id_gestion_oficio } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : firma_coordinador  ya almacenado',
        });
    }
    try {
        const resultado = yield firma_coordinador_1.dbfirma_coordinador.create({
            id_usuario: id_usuario,
            id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro,
            id_estatusfirma: id_estatusfirma,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_firma_coordinador);
        res.json({
            msg: `firma_coordinador registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialfirma_coordinador)(id_usuario, id, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro);
        (0, exports.actualizarfirma)(id_firma, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivofirma)(id_firma);
        (0, exports.NewHistorialMasterfirma)(id_usuario, id, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newfirma_coordinador = newfirma_coordinador;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updfirma_coordinador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_firma_coordinador, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro, id_estatusfirma } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield firma_coordinador_1.dbfirma_coordinador.findOne({ where: { id_firma_coordinador: id_firma_coordinador } });
    if (params) {
        try {
            const resultado = yield firma_coordinador_1.dbfirma_coordinador.update({
                id_usuario: id_usuario,
                id_firma_coordinador: id_firma_coordinador,
                id_gestion_oficio: id_gestion_oficio,
                id_oficios: id_oficios,
                id_direccion_coordinador: id_direccion_coordinador,
                text_direccion_coordinador: text_direccion_coordinador,
                id_area_coordinador: id_area_coordinador,
                text_area_coordinador: text_area_coordinador,
                id_direccion_peticion: id_direccion_peticion,
                text_direccion_peticion: text_direccion_peticion,
                id_area_peticion: id_area_peticion,
                area_text_peticion: area_text_peticion,
                numero_empleado_coordinador: numero_empleado_coordinador,
                nombre_empleado_coordinador: nombre_empleado_coordinador,
                foto_empleado_coordinador: foto_empleado_coordinador,
                numero_empleado_peticion: numero_empleado_peticion,
                nombre_empleado_peticion: nombre_empleado_peticion,
                foto_empleado_peticion: foto_empleado_peticion,
                numero_empleado_secretaria: numero_empleado_secretaria,
                nombre_secretaria: nombre_secretaria,
                foto_secretario: foto_secretario,
                numero_empleado_tecnico: numero_empleado_tecnico,
                nombre_tecnico: nombre_tecnico,
                foto_tecnico: foto_tecnico,
                numero_oficio: numero_oficio,
                numero_contestacion: numero_contestacion,
                archivo_oficio: archivo_oficio,
                archivo_sello: archivo_sello,
                archivo_evidencia: archivo_evidencia,
                archivo_contestacion_pdf: archivo_contestacion_pdf,
                archivo_contestacion_digital: archivo_contestacion_digital,
                asunto: asunto,
                descripcion_contestacion: descripcion_contestacion,
                visto: visto,
                fecha_contestacion: fecha_contestacion,
                fecha_terminacion: fecha_terminacion,
                tiempo_efectivo_contestacion: tiempo_efectivo_contestacion,
                otro: otro,
                id_estatusfirma: id_estatusfirma,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_firma_coordinador: id_firma_coordinador
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialfirma_coordinador)(id_usuario, id_firma_coordinador, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro);
            (0, exports.actualizarHistorialMasterfirma)(id_usuario, id_firma_coordinador, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro);
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
            msg: 'Registro de la tabla : firma_coordinador  ya almacenado',
        });
    }
});
exports.updfirma_coordinador = updfirma_coordinador;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delfirma_coordinador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield firma_coordinador_1.dbfirma_coordinador.findOne({ where: { id_firma_coordinador: id } });
    const id_firma_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_firma_coordinador;
    const id_gestion_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_gestion_oficio;
    const id_oficios = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_oficios;
    const id_direccion_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion_coordinador;
    const text_direccion_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion_coordinador;
    const id_area_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area_coordinador;
    const text_area_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_area_coordinador;
    const id_direccion_peticion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_direccion_peticion;
    const text_direccion_peticion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.text_direccion_peticion;
    const id_area_peticion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_area_peticion;
    const area_text_peticion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.area_text_peticion;
    const numero_empleado_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado_coordinador;
    const nombre_empleado_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_empleado_coordinador;
    const foto_empleado_coordinador = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto_empleado_coordinador;
    const numero_empleado_peticion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado_peticion;
    const nombre_empleado_peticion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_empleado_peticion;
    const foto_empleado_peticion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto_empleado_peticion;
    const numero_empleado_secretaria = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado_secretaria;
    const nombre_secretaria = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_secretaria;
    const foto_secretario = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto_secretario;
    const numero_empleado_tecnico = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado_tecnico;
    const nombre_tecnico = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_tecnico;
    const foto_tecnico = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto_tecnico;
    const numero_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_oficio;
    const numero_contestacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_contestacion;
    const archivo_oficio = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.archivo_oficio;
    const archivo_sello = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.archivo_sello;
    const archivo_evidencia = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.archivo_evidencia;
    const archivo_contestacion_pdf = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.archivo_contestacion_pdf;
    const archivo_contestacion_digital = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.archivo_contestacion_digital;
    const asunto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.asunto;
    const descripcion_contestacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.descripcion_contestacion;
    const visto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.visto;
    const fecha_contestacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.fecha_contestacion;
    const fecha_terminacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.fecha_terminacion;
    const tiempo_efectivo_contestacion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.tiempo_efectivo_contestacion;
    const otro = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.otro;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield firma_coordinador_1.dbfirma_coordinador.destroy({
            where: {
                id_firma_coordinador: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialfirma_coordinador)(id_usuario, id_firma_coordinador, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro);
        (0, exports.DelMasterHistorialfirma_coordinador)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delfirma_coordinador = delfirma_coordinador;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllfirma_coordinador = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_coordinador_1.dbhistorialfirma_coordinador.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : firma_coordinador',
            id_firma_coordinador: '', id_gestion_oficio: '', id_oficios: '', id_direccion_coordinador: '', text_direccion_coordinador: '', id_area_coordinador: '', text_area_coordinador: '', id_direccion_peticion: '', text_direccion_peticion: '', id_area_peticion: '', area_text_peticion: '', numero_empleado_coordinador: '', nombre_empleado_coordinador: '', foto_empleado_coordinador: '', numero_empleado_peticion: '', nombre_empleado_peticion: '', foto_empleado_peticion: '', numero_empleado_secretaria: '', nombre_secretaria: '', foto_secretario: '', numero_empleado_tecnico: '', nombre_tecnico: '', foto_tecnico: '', numero_oficio: '', numero_contestacion: '', archivo_oficio: '', archivo_sello: '', archivo_evidencia: '', archivo_contestacion_pdf: '', archivo_contestacion_digital: '', asunto: '', descripcion_contestacion: '', visto: '', fecha_contestacion: '', fecha_terminacion: '', tiempo_efectivo_contestacion: '', otro: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllfirma_coordinador = HistorialgetAllfirma_coordinador;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdfirma_coordinador = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_coordinador_1.dbhistorialfirma_coordinador.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: firma_coordinador',
            id_firma_coordinador: id, id_gestion_oficio: '', id_oficios: '', id_direccion_coordinador: '', text_direccion_coordinador: '', id_area_coordinador: '', text_area_coordinador: '', id_direccion_peticion: '', text_direccion_peticion: '', id_area_peticion: '', area_text_peticion: '', numero_empleado_coordinador: '', nombre_empleado_coordinador: '', foto_empleado_coordinador: '', numero_empleado_peticion: '', nombre_empleado_peticion: '', foto_empleado_peticion: '', numero_empleado_secretaria: '', nombre_secretaria: '', foto_secretario: '', numero_empleado_tecnico: '', nombre_tecnico: '', foto_tecnico: '', numero_oficio: '', numero_contestacion: '', archivo_oficio: '', archivo_sello: '', archivo_evidencia: '', archivo_contestacion_pdf: '', archivo_contestacion_digital: '', asunto: '', descripcion_contestacion: '', visto: '', fecha_contestacion: '', fecha_terminacion: '', tiempo_efectivo_contestacion: '', otro: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdfirma_coordinador = HistorialgetRegByIdfirma_coordinador;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialfirma_coordinador = (id_usuario, id, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_coordinador_1.dbhistorialfirma_coordinador.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: firma_coordinador',
            id_firma_coordinador: id, id_gestion_oficio: id_gestion_oficio, id_oficios: id_oficios, id_direccion_coordinador: id_direccion_coordinador, text_direccion_coordinador: text_direccion_coordinador, id_area_coordinador: id_area_coordinador, text_area_coordinador: text_area_coordinador, id_direccion_peticion: id_direccion_peticion, text_direccion_peticion: text_direccion_peticion, id_area_peticion: id_area_peticion, area_text_peticion: area_text_peticion, numero_empleado_coordinador: numero_empleado_coordinador, nombre_empleado_coordinador: nombre_empleado_coordinador, foto_empleado_coordinador: foto_empleado_coordinador, numero_empleado_peticion: numero_empleado_peticion, nombre_empleado_peticion: nombre_empleado_peticion, foto_empleado_peticion: foto_empleado_peticion, numero_empleado_secretaria: numero_empleado_secretaria, nombre_secretaria: nombre_secretaria, foto_secretario: foto_secretario, numero_empleado_tecnico: numero_empleado_tecnico, nombre_tecnico: nombre_tecnico, foto_tecnico: foto_tecnico, numero_oficio: numero_oficio, numero_contestacion: numero_contestacion, archivo_oficio: archivo_oficio, archivo_sello: archivo_sello, archivo_evidencia: archivo_evidencia, archivo_contestacion_pdf: archivo_contestacion_pdf, archivo_contestacion_digital: archivo_contestacion_digital, asunto: asunto, descripcion_contestacion: descripcion_contestacion, visto: visto, fecha_contestacion: fecha_contestacion, fecha_terminacion: fecha_terminacion, tiempo_efectivo_contestacion: tiempo_efectivo_contestacion, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialfirma_coordinador = NewHistorialfirma_coordinador;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialfirma_coordinador = (id_usuario, id, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_coordinador_1.dbhistorialfirma_coordinador.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: firma_coordinador',
            id_firma_coordinador: id, id_gestion_oficio: id_gestion_oficio, id_oficios: id_oficios, id_direccion_coordinador: id_direccion_coordinador, text_direccion_coordinador: text_direccion_coordinador, id_area_coordinador: id_area_coordinador, text_area_coordinador: text_area_coordinador, id_direccion_peticion: id_direccion_peticion, text_direccion_peticion: text_direccion_peticion, id_area_peticion: id_area_peticion, area_text_peticion: area_text_peticion, numero_empleado_coordinador: numero_empleado_coordinador, nombre_empleado_coordinador: nombre_empleado_coordinador, foto_empleado_coordinador: foto_empleado_coordinador, numero_empleado_peticion: numero_empleado_peticion, nombre_empleado_peticion: nombre_empleado_peticion, foto_empleado_peticion: foto_empleado_peticion, numero_empleado_secretaria: numero_empleado_secretaria, nombre_secretaria: nombre_secretaria, foto_secretario: foto_secretario, numero_empleado_tecnico: numero_empleado_tecnico, nombre_tecnico: nombre_tecnico, foto_tecnico: foto_tecnico, numero_oficio: numero_oficio, numero_contestacion: numero_contestacion, archivo_oficio: archivo_oficio, archivo_sello: archivo_sello, archivo_evidencia: archivo_evidencia, archivo_contestacion_pdf: archivo_contestacion_pdf, archivo_contestacion_digital: archivo_contestacion_digital, asunto: asunto, descripcion_contestacion: descripcion_contestacion, visto: visto, fecha_contestacion: fecha_contestacion, fecha_terminacion: fecha_terminacion, tiempo_efectivo_contestacion: tiempo_efectivo_contestacion, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialfirma_coordinador = UpdHistorialfirma_coordinador;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialfirma_coordinador = (id_usuario, id, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialfirma_coordinador_1.dbhistorialfirma_coordinador.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: firma_coordinador',
            id_firma_coordinador: id, id_gestion_oficio: id_gestion_oficio, id_oficios: id_oficios, id_direccion_coordinador: id_direccion_coordinador, text_direccion_coordinador: text_direccion_coordinador, id_area_coordinador: id_area_coordinador, text_area_coordinador: text_area_coordinador, id_direccion_peticion: id_direccion_peticion, text_direccion_peticion: text_direccion_peticion, id_area_peticion: id_area_peticion, area_text_peticion: area_text_peticion, numero_empleado_coordinador: numero_empleado_coordinador, nombre_empleado_coordinador: nombre_empleado_coordinador, foto_empleado_coordinador: foto_empleado_coordinador, numero_empleado_peticion: numero_empleado_peticion, nombre_empleado_peticion: nombre_empleado_peticion, foto_empleado_peticion: foto_empleado_peticion, numero_empleado_secretaria: numero_empleado_secretaria, nombre_secretaria: nombre_secretaria, foto_secretario: foto_secretario, numero_empleado_tecnico: numero_empleado_tecnico, nombre_tecnico: nombre_tecnico, foto_tecnico: foto_tecnico, numero_oficio: numero_oficio, numero_contestacion: numero_contestacion, archivo_oficio: archivo_oficio, archivo_sello: archivo_sello, archivo_evidencia: archivo_evidencia, archivo_contestacion_pdf: archivo_contestacion_pdf, archivo_contestacion_digital: archivo_contestacion_digital, asunto: asunto, descripcion_contestacion: descripcion_contestacion, visto: visto, fecha_contestacion: fecha_contestacion, fecha_terminacion: fecha_terminacion, tiempo_efectivo_contestacion: tiempo_efectivo_contestacion, otro: otro,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialfirma_coordinador = DelHistorialfirma_coordinador;
//actualizar en la tabla firma ----------------------------------------------------------------------> 
const actualizarfirma = (id_firma, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield firma_1.dbfirma.update({
            id_firma_coordinador: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_firma: id_firma
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarfirma = actualizarfirma;
//almacenar en la tabla Historial Master firma ----------------------------------------------------------------------> 
const NewHistorialMasterfirma = (id_usuario, id_firma_coordinador, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
            id_usuario: id_usuario,
            id_firma_coordinador: id_firma_coordinador, id_gestion_oficio: id_gestion_oficio, id_oficios: id_oficios, id_direccion_coordinador: id_direccion_coordinador, text_direccion_coordinador: text_direccion_coordinador, id_area_coordinador: id_area_coordinador, text_area_coordinador: text_area_coordinador, id_direccion_peticion: id_direccion_peticion, text_direccion_peticion: text_direccion_peticion, id_area_peticion: id_area_peticion, area_text_peticion: area_text_peticion, numero_empleado_coordinador: numero_empleado_coordinador, nombre_empleado_coordinador: nombre_empleado_coordinador, foto_empleado_coordinador: foto_empleado_coordinador, numero_empleado_peticion: numero_empleado_peticion, nombre_empleado_peticion: nombre_empleado_peticion, foto_empleado_peticion: foto_empleado_peticion, numero_empleado_secretaria: numero_empleado_secretaria, nombre_secretaria: nombre_secretaria, foto_secretario: foto_secretario, numero_empleado_tecnico: numero_empleado_tecnico, nombre_tecnico: nombre_tecnico, foto_tecnico: foto_tecnico, numero_oficio: numero_oficio, numero_contestacion: numero_contestacion, archivo_oficio: archivo_oficio, archivo_sello: archivo_sello, archivo_evidencia: archivo_evidencia, archivo_contestacion_pdf: archivo_contestacion_pdf, archivo_contestacion_digital: archivo_contestacion_digital, asunto: asunto, descripcion_contestacion: descripcion_contestacion, visto: visto, fecha_contestacion: fecha_contestacion, fecha_terminacion: fecha_terminacion, tiempo_efectivo_contestacion: tiempo_efectivo_contestacion, otro: otro,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMasterfirma = NewHistorialMasterfirma;
//Actualizar en la tabla Historial Master firma ----------------------------------------------------------------------> 
const actualizarHistorialMasterfirma = (id_usuario, id_firma_coordinador, id_gestion_oficio, id_oficios, id_direccion_coordinador, text_direccion_coordinador, id_area_coordinador, text_area_coordinador, id_direccion_peticion, text_direccion_peticion, id_area_peticion, area_text_peticion, numero_empleado_coordinador, nombre_empleado_coordinador, foto_empleado_coordinador, numero_empleado_peticion, nombre_empleado_peticion, foto_empleado_peticion, numero_empleado_secretaria, nombre_secretaria, foto_secretario, numero_empleado_tecnico, nombre_tecnico, foto_tecnico, numero_oficio, numero_contestacion, archivo_oficio, archivo_sello, archivo_evidencia, archivo_contestacion_pdf, archivo_contestacion_digital, asunto, descripcion_contestacion, visto, fecha_contestacion, fecha_terminacion, tiempo_efectivo_contestacion, otro) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
            id_usuario: id_usuario,
            id_firma_coordinador: id_firma_coordinador, id_gestion_oficio: id_gestion_oficio, id_oficios: id_oficios, id_direccion_coordinador: id_direccion_coordinador, text_direccion_coordinador: text_direccion_coordinador, id_area_coordinador: id_area_coordinador, text_area_coordinador: text_area_coordinador, id_direccion_peticion: id_direccion_peticion, text_direccion_peticion: text_direccion_peticion, id_area_peticion: id_area_peticion, area_text_peticion: area_text_peticion, numero_empleado_coordinador: numero_empleado_coordinador, nombre_empleado_coordinador: nombre_empleado_coordinador, foto_empleado_coordinador: foto_empleado_coordinador, numero_empleado_peticion: numero_empleado_peticion, nombre_empleado_peticion: nombre_empleado_peticion, foto_empleado_peticion: foto_empleado_peticion, numero_empleado_secretaria: numero_empleado_secretaria, nombre_secretaria: nombre_secretaria, foto_secretario: foto_secretario, numero_empleado_tecnico: numero_empleado_tecnico, nombre_tecnico: nombre_tecnico, foto_tecnico: foto_tecnico, numero_oficio: numero_oficio, numero_contestacion: numero_contestacion, archivo_oficio: archivo_oficio, archivo_sello: archivo_sello, archivo_evidencia: archivo_evidencia, archivo_contestacion_pdf: archivo_contestacion_pdf, archivo_contestacion_digital: archivo_contestacion_digital, asunto: asunto, descripcion_contestacion: descripcion_contestacion, visto: visto, fecha_contestacion: fecha_contestacion, fecha_terminacion: fecha_terminacion, tiempo_efectivo_contestacion: tiempo_efectivo_contestacion, otro: otro,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMasterfirma = actualizarHistorialMasterfirma;
//Desactivar en la tabla Historial Master firma ----------------------------------------------------------------------> 
const DelMasterHistorialfirma_coordinador = (id_usuario, id_firma_coordinador) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMasterfirma_1.dbhistorialMasterfirma.create({
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
exports.DelMasterHistorialfirma_coordinador = DelMasterHistorialfirma_coordinador;
//actualizar Estado Activo en la tabla firma ----------------------------------------------------------------------> 
const actualizarEstadoActivofirma = (id_firma) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield firma_1.dbfirma.update({
            activo: 1,
        }, {
            where: {
                id_firma: id_firma
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivofirma = actualizarEstadoActivofirma;
