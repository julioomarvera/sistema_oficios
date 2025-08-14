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
exports.getAllcat_empleadosByDireccionAreas = exports.get_coordinador_empleados = exports.actualizarEstadoActivocatalogo_empleados = exports.DelMasterHistorialcat_empleados = exports.actualizarHistorialMastercatalogo_empleados = exports.NewHistorialMastercatalogo_empleados = exports.actualizarcatalogo_empleados = exports.DelHistorialcat_empleados = exports.UpdHistorialcat_empleados = exports.NewHistorialcat_empleados = exports.HistorialgetRegByIdcat_empleados = exports.HistorialgetAllcat_empleados = exports.delcat_empleados = exports.updcat_empleados = exports.newcat_empleados = exports.getRegByIdcat_empleados = exports.getAllcat_empleados = exports.timeNow = void 0;
const cat_empleados_1 = require("../models/cat_empleados");
const catalogo_empleados_1 = require("../models/catalogo_empleados");
const historialcat_empleados_1 = require("../models/historialcat_empleados");
const historialMastercatalogo_empleados_1 = require("../models/historialMastercatalogo_empleados");
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
const getAllcat_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_rol } = req.params;
    let listcat_empleados = '';
    if (id_rol == "1") {
        listcat_empleados = yield cat_empleados_1.dbcat_empleados.findAll({ where: { activo: 1 } });
    }
    else {
        listcat_empleados = yield cat_empleados_1.dbcat_empleados.findAll({ where: { activo: 1, id_usuario: id_usuario } });
    }
    res.json(listcat_empleados);
    if (id_usuario != null) {
        (0, exports.HistorialgetAllcat_empleados)(id_usuario);
    }
});
exports.getAllcat_empleados = getAllcat_empleados;
//Traer Parametro By Id  ----------------------------------------------------------------------> 
const getRegByIdcat_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, id_usuario, id_rol } = req.params;
    const findcat_empleados = yield cat_empleados_1.dbcat_empleados.findOne({ where: { id_cat_empleados: id } });
    try {
        if (findcat_empleados) {
            if (id_usuario != null) {
                (0, exports.HistorialgetRegByIdcat_empleados)(id_usuario, id);
            }
            return res.json(findcat_empleados);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrió un inconveniente al tratar de listar la información de los cat_empleados. ',
            error
        });
    }
    console.log(findcat_empleados);
});
exports.getRegByIdcat_empleados = getRegByIdcat_empleados;
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const newcat_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_catalogo_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto, id_estatuscatalogo_empleados, PaginaActual, finalizado } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield cat_empleados_1.dbcat_empleados.findOne({ where: { id_usuario: id_usuario } });
    if (params) {
        return res.status(404).json({
            msg: 'Registro de la tabla : cat_empleados  ya almacenado',
        });
    }
    try {
        const resultado = yield cat_empleados_1.dbcat_empleados.create({
            id_usuario: id_usuario,
            nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto,
            id_estatuscatalogo_empleados: id_estatuscatalogo_empleados,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_empleados);
        res.json({
            msg: `cat_empleados registro almacenado exitosamente`,
        });
        (0, exports.NewHistorialcat_empleados)(id, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
        (0, exports.actualizarcatalogo_empleados)(id_catalogo_empleados, id, PaginaActual, finalizado);
        (0, exports.actualizarEstadoActivocatalogo_empleados)(id_catalogo_empleados);
        (0, exports.NewHistorialMastercatalogo_empleados)(id, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.newcat_empleados = newcat_empleados;
//Actualizar un nuevo Parametro --------------------------------------------------------------------------> 
const updcat_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario, id_cat_empleados, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto, id_estatuscatalogo_empleados } = req.body;
    //Validamos si existe el parametro en la base de datos 
    const params = yield cat_empleados_1.dbcat_empleados.findOne({ where: { id_cat_empleados: id_cat_empleados } });
    if (params) {
        try {
            const resultado = yield cat_empleados_1.dbcat_empleados.update({
                id_usuario: id_usuario,
                id_cat_empleados: id_cat_empleados,
                nombre_completo: nombre_completo,
                numero_empleado: numero_empleado,
                cargo: cargo,
                direccion: direccion,
                direccion_texto: direccion_texto,
                subdireccion: subdireccion,
                area: area,
                area_texto: area_texto,
                nombreJefe: nombreJefe,
                cargoJefe: cargoJefe,
                correo_institucional: correo_institucional,
                telefono_opdm: telefono_opdm,
                url: url,
                codigo_qr: codigo_qr,
                foto: foto,
                id_estatuscatalogo_empleados: id_estatuscatalogo_empleados,
                activo: 1,
                createdAt: time,
                updatedAt: time,
            }, {
                where: {
                    id_cat_empleados: id_cat_empleados
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
            (0, exports.UpdHistorialcat_empleados)(id_cat_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
            (0, exports.actualizarHistorialMastercatalogo_empleados)(id_cat_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
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
            msg: 'Registro de la tabla : cat_empleados  ya almacenado',
        });
    }
});
exports.updcat_empleados = updcat_empleados;
//Eliminar un Parametro --------------------------------------------------------------------------> 
const delcat_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield cat_empleados_1.dbcat_empleados.findOne({ where: { id_cat_empleados: id } });
    const id_cat_empleados = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_cat_empleados;
    const id_usuario = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.id_usuario;
    const nombre_completo = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombre_completo;
    const numero_empleado = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.numero_empleado;
    const cargo = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.cargo;
    const direccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.direccion;
    const direccion_texto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.direccion_texto;
    const subdireccion = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.subdireccion;
    const area = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.area;
    const area_texto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.area_texto;
    const nombreJefe = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.nombreJefe;
    const cargoJefe = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.cargoJefe;
    const correo_institucional = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.correo_institucional;
    const telefono_opdm = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.telefono_opdm;
    const url = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.url;
    const codigo_qr = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.codigo_qr;
    const foto = findParam === null || findParam === void 0 ? void 0 : findParam.dataValues.foto;
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield cat_empleados_1.dbcat_empleados.destroy({
            where: {
                id_cat_empleados: id
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        (0, exports.DelHistorialcat_empleados)(id_usuario, id_cat_empleados, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto);
        (0, exports.DelMasterHistorialcat_empleados)(id_usuario, id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.delcat_empleados = delcat_empleados;
//ALMACENAR HIISTORIAL GET ALL REG  ----------------------------------------------------------------------> 
const HistorialgetAllcat_empleados = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_empleados_1.dbhistorialcat_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó todos los registros de la tabla : cat_empleados',
            id_cat_empleados: '', nombre_completo: '', numero_empleado: '', cargo: '', direccion: '', direccion_texto: '', subdireccion: '', area: '', area_texto: '', nombreJefe: '', cargoJefe: '', correo_institucional: '', telefono_opdm: '', url: '', codigo_qr: '', foto: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetAllcat_empleados = HistorialgetAllcat_empleados;
//ALMACENAR HIISTORIAL GET REG BY ID  ----------------------------------------------------------------------> 
const HistorialgetRegByIdcat_empleados = (id_usuario, id) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_empleados_1.dbhistorialcat_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario consultó un registro de la tabla: cat_empleados',
            id_cat_empleados: id, nombre_completo: '', numero_empleado: '', cargo: '', direccion: '', direccion_texto: '', subdireccion: '', area: '', area_texto: '', nombreJefe: '', cargoJefe: '', correo_institucional: '', telefono_opdm: '', url: '', codigo_qr: '', foto: '',
        }).then();
    }
    catch (error) {
    }
});
exports.HistorialgetRegByIdcat_empleados = HistorialgetRegByIdcat_empleados;
//ALMACENAR HIISTORIAL NEW  ----------------------------------------------------------------------> 
const NewHistorialcat_empleados = (id, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_empleados_1.dbhistorialcat_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario inserto un nuevo registro de la tabla: cat_empleados',
            id_cat_empleados: id, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialcat_empleados = NewHistorialcat_empleados;
//Actualizar HISTORIAL ----------------------------------------------------------------------> 
const UpdHistorialcat_empleados = (id, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_empleados_1.dbhistorialcat_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario Actualizo un registro de la tabla: cat_empleados',
            id_cat_empleados: id, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.UpdHistorialcat_empleados = UpdHistorialcat_empleados;
//Delete HISTORIAL ----------------------------------------------------------------------> 
const DelHistorialcat_empleados = (id, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialcat_empleados_1.dbhistorialcat_empleados.create({
            id_usuario: id_usuario,
            accion: 'El usuario Elimino un registro de la tabla: cat_empleados',
            id_cat_empleados: id, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
        }).then();
    }
    catch (error) {
    }
});
exports.DelHistorialcat_empleados = DelHistorialcat_empleados;
//actualizar en la tabla catalogo_empleados ----------------------------------------------------------------------> 
const actualizarcatalogo_empleados = (id_catalogo_empleados, id, PaginaActual, finalizado) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield catalogo_empleados_1.dbcatalogo_empleados.update({
            id_cat_empleados: id,
            PaginaActual: PaginaActual,
            finalizado: finalizado,
        }, {
            where: {
                id_catalogo_empleados: id_catalogo_empleados
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarcatalogo_empleados = actualizarcatalogo_empleados;
//almacenar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
const NewHistorialMastercatalogo_empleados = (id_cat_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_empleados_1.dbhistorialMastercatalogo_empleados.create({
            id_usuario: id_usuario,
            id_cat_empleados: id_cat_empleados, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
            activo: 1,
            accion: 'El usuario dio de alta el registro',
        }).then();
    }
    catch (error) {
    }
});
exports.NewHistorialMastercatalogo_empleados = NewHistorialMastercatalogo_empleados;
//Actualizar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
const actualizarHistorialMastercatalogo_empleados = (id_cat_empleados, id_usuario, nombre_completo, numero_empleado, cargo, direccion, direccion_texto, subdireccion, area, area_texto, nombreJefe, cargoJefe, correo_institucional, telefono_opdm, url, codigo_qr, foto) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_empleados_1.dbhistorialMastercatalogo_empleados.create({
            id_usuario: id_usuario,
            id_cat_empleados: id_cat_empleados, nombre_completo: nombre_completo, numero_empleado: numero_empleado, cargo: cargo, direccion: direccion, direccion_texto: direccion_texto, subdireccion: subdireccion, area: area, area_texto: area_texto, nombreJefe: nombreJefe, cargoJefe: cargoJefe, correo_institucional: correo_institucional, telefono_opdm: telefono_opdm, url: url, codigo_qr: codigo_qr, foto: foto,
            activo: 1,
            accion: 'El usuario actualizo el registro',
            createdAt: time,
            updatedAt: time,
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarHistorialMastercatalogo_empleados = actualizarHistorialMastercatalogo_empleados;
//Desactivar en la tabla Historial Master catalogo_empleados ----------------------------------------------------------------------> 
const DelMasterHistorialcat_empleados = (id_usuario, id_cat_empleados) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield historialMastercatalogo_empleados_1.dbhistorialMastercatalogo_empleados.create({
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
exports.DelMasterHistorialcat_empleados = DelMasterHistorialcat_empleados;
//actualizar Estado Activo en la tabla catalogo_empleados ----------------------------------------------------------------------> 
const actualizarEstadoActivocatalogo_empleados = (id_catalogo_empleados) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    try {
        const resultado = yield catalogo_empleados_1.dbcatalogo_empleados.update({
            activo: 1,
        }, {
            where: {
                id_catalogo_empleados: id_catalogo_empleados
            },
        }).then();
    }
    catch (error) {
    }
});
exports.actualizarEstadoActivocatalogo_empleados = actualizarEstadoActivocatalogo_empleados;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const get_coordinador_empleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let listcat_empleados = '';
    let listcat_empleados_jefe = '';
    listcat_empleados = yield cat_empleados_1.dbcat_empleados.findOne({ where: { activo: 1, numero_empleado: id } });
    const nombreCoordinador = listcat_empleados.dataValues.nombreJefe;
    const nombreEmpleado = listcat_empleados.dataValues.nombre_completo;
    if (nombreCoordinador != "") {
        if (nombreEmpleado != nombreCoordinador) {
            listcat_empleados_jefe = yield cat_empleados_1.dbcat_empleados.findOne({ where: { activo: 1, nombre_completo: nombreCoordinador } });
        }
    }
    res.json(listcat_empleados_jefe);
});
exports.get_coordinador_empleados = get_coordinador_empleados;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getAllcat_empleadosByDireccionAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion, id_area } = req.params;
    let listcat_empleados = '';
    listcat_empleados = yield cat_empleados_1.dbcat_empleados.findAll({ where: { activo: 1, direccion: id_direccion, area: id_area } });
    res.json(listcat_empleados);
});
exports.getAllcat_empleadosByDireccionAreas = getAllcat_empleadosByDireccionAreas;
