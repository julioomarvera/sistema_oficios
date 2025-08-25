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
exports.getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado = exports.getSecretariasAsignadosByid_gestion_oficioBydireccion = exports.getTecnicosAsignadosByid_gestion_oficioBydireccion = exports.getAsignacionesByNumeroEmpleado = exports.getInstrucciones = exports.getInfo_quien_solicito = exports.update_firmante_instrucciones = exports.getOficiosByNumeroEmpleado = exports.deleteAsignacion = exports.getAllcat_empleadosByid_gestion_oficios = exports.getEncargadosPorDireccionArea = exports.getEncargadoArea = exports.getAllcat_empleadosByDireccionAreas = exports.new_asignacion = exports.timeNow = void 0;
const { Sequelize, DataTypes } = require('sequelize');
const asignacion_1 = require("../models/asignacion");
const cat_empleados_1 = require("../models/cat_empleados");
const sequelize_1 = require("sequelize");
const oficios_1 = require("../models/oficios");
const users_opdm_1 = require("../models/users_opdm");
const tecnico_1 = require("../models/tecnico");
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
//Agregar un nuevo Parametro --------------------------------------------------------------------------> 
const new_asignacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_usuario_quien_asigna, id_gestion_oficios, id_oficio, id_direccion_asignacion, id_area_asignacion, numero_empledo_asignacion, text_direccion, text_area, text_nombre_empleado_asignacion, foto, fecha_asignacion, estatus_oficio, instrucciones, fecha_terminacion, numero_empleado_secretaria, foto_empleado_secretaria, numero_oficio } = req.body;
    //Validamos si ya existe el Parametro en la base de datos 
    const params = yield asignacion_1.dbasignacion.findOne({ where: { id_gestion_oficios: id_gestion_oficios, numero_empledo_asignacion: numero_empledo_asignacion, activo: 1 } });
    if (params) {
        return res.status(404).json({
            msg: 'El usuario ' + numero_empledo_asignacion + ' ya fue registrado para este oficio',
        });
    }
    try {
        const resultado = yield asignacion_1.dbasignacion.create({
            id_usuario_quien_asigna: id_usuario_quien_asigna,
            id_gestion_oficios: id_gestion_oficios,
            id_oficio: id_oficio,
            id_direccion_asignacion: id_direccion_asignacion,
            id_area_asignacion: id_area_asignacion,
            numero_empledo_asignacion: numero_empledo_asignacion,
            text_direccion: text_direccion,
            text_area: text_area,
            text_nombre_empleado_asignacion: text_nombre_empleado_asignacion,
            foto: foto,
            fecha_asignacion: fecha_asignacion,
            estatus_oficio: estatus_oficio,
            instrucciones: instrucciones,
            fecha_terminacion: fecha_terminacion,
            numero_empleado_secretaria,
            foto_empleado_secretaria,
            numero_oficio,
            activo: 1,
            createdAt: time,
            updatedAt: time,
        }).then();
        const id = (resultado.dataValues.id_cat_areas);
        res.json({
            msg: `cat_areas registro almacenado exitosamente`,
        });
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de almacenar el registro',
            error
        });
    }
});
exports.new_asignacion = new_asignacion;
//Traer todos los Parametros ----------------------------------------------------------------------> 
// export const getAllcat_empleadosByDireccionAreas = async (req: Request, res: Response) => {
//    const { id_gestion_oficios, id_direccion, id_area } = req.params;
//    try {
//       const asignados = await dbasignacion.findAll({
//          where: { id_gestion_oficios: id_gestion_oficios, activo: 1 },
//          attributes: ['numero_empledo_asignacion'] // Asumiendo que esta columna existe
//       });
//       // Extraer solo los IDs
//       const idsAsignados = asignados.map((a: any) => a.numero_empledo_asignacion);
//       const listcat_empleados = await dbcat_empleados.findAll({
//          where: {
//             activo: 1,
//             direccion: id_direccion,
//             area: id_area,
//             numero_empleado: {
//                [Op.notIn]: idsAsignados // 👈 Aquí excluimos los asignados
//             }
//          }
//       });
//       res.json(listcat_empleados);
//    } catch (error) {
//       console.error('Error al obtener empleados:', error);
//       res.status(500).json({ error: 'Error al obtener empleados' });
//    }
// }
const getAllcat_empleadosByDireccionAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios, id_direccion, id_area } = req.params;
    try {
        // Obtener empleados activos en esa dirección y área
        const empleados = yield cat_empleados_1.dbcat_empleados.findAll({
            where: {
                activo: 1,
                direccion: id_direccion,
                area: id_area
            }
        });
        // Para cada empleado, contar sus asignaciones activas en esa gestión
        const empleadosConAsignaciones = yield Promise.all(empleados.map((empleado) => __awaiter(void 0, void 0, void 0, function* () {
            const total_tramites = yield asignacion_1.dbasignacion.count({
                where: {
                    numero_empledo_asignacion: empleado.numero_empleado,
                    id_gestion_oficios,
                    activo: 1
                }
            });
            return Object.assign(Object.assign({}, empleado.dataValues), { total_tramites });
        })));
        res.json(empleadosConAsignaciones);
    }
    catch (error) {
        console.error('Error al obtener empleados con trámites:', error);
        res.status(500).json({ error: 'Error al obtener empleados con trámites' });
    }
});
exports.getAllcat_empleadosByDireccionAreas = getAllcat_empleadosByDireccionAreas;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getEncargadoArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion, id_area } = req.params;
    let listcat_empleados = '';
    listcat_empleados = yield cat_empleados_1.dbcat_empleados.findOne({ where: { activo: 1, direccion: id_direccion, area: id_area } });
    res.json(listcat_empleados);
});
exports.getEncargadoArea = getEncargadoArea;
//Traer todos los Parametros ----------------------------------------------------------------------> 
const getEncargadosPorDireccionArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_direccion, id_area } = req.params;
    try {
        // 1. Traer empleados activos en la dirección y área
        const listcat_empleados = yield cat_empleados_1.dbcat_empleados.findAll({
            where: { activo: 1, direccion: id_direccion, area: id_area }
        });
        if (!listcat_empleados || listcat_empleados.length === 0) {
            return res.json([]);
        }
        // 2. Obtener números de empleado
        const numerosEmpleados = listcat_empleados.map((emp) => emp.numero_empleado);
        // 3. Consultar asignaciones para esos empleados
        const list_asignados = yield asignacion_1.dbasignacion.findAll({
            where: {
                activo: 1,
                numero_empledo_asignacion: numerosEmpleados
            }
        });
        // 4. Agrupar asignaciones por número de empleado
        const asignacionesMap = list_asignados.reduce((acc, asignacion) => {
            const numero = asignacion.numero_empledo_asignacion;
            if (!acc[numero])
                acc[numero] = [];
            acc[numero].push(asignacion);
            return acc;
        }, {});
        // 5. Unir empleados con sus asignaciones
        const resultado = listcat_empleados.map((empleado) => (Object.assign(Object.assign({}, empleado.toJSON()), { asignaciones: asignacionesMap[empleado.numero_empleado] || [] })));
        res.json(resultado);
    }
    catch (error) {
        console.error('Error en consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});
exports.getEncargadosPorDireccionArea = getEncargadosPorDireccionArea;
//Traer todos los  ----------------------------------------------------------------------> 
const getAllcat_empleadosByid_gestion_oficios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios } = req.params;
    let listcat_empleados = '';
    listcat_empleados = yield asignacion_1.dbasignacion.findAll({ where: { activo: 1, id_gestion_oficios: id_gestion_oficios } });
    res.json(listcat_empleados);
});
exports.getAllcat_empleadosByid_gestion_oficios = getAllcat_empleadosByid_gestion_oficios;
//Eliminar un Parametro evidencia_sello--------------------------------------------------------------------------> 
const deleteAsignacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, id_gestion_oficios, numero_empleado } = req.params;
    console.log(req.params);
    //Validamos si existe el parametro en la base de datos 
    const findParam = yield asignacion_1.dbasignacion.findOne({ where: { id_gestion_oficios: id_gestion_oficios, numero_empledo_asignacion: numero_empleado } });
    if (!findParam) {
        return res.status(404).json({
            msg: 'Parametro no encontrado.',
        });
    }
    try {
        const resultado = yield asignacion_1.dbasignacion.update({
            activo: 0,
        }, {
            where: {
                id_gestion_oficios: id_gestion_oficios, numero_empledo_asignacion: numero_empleado
            },
        });
        res.json({
            msg: `Parametro eliminado exitosamente`,
        });
        // DelHistorialevidencia_sello(id_usuario,id); 
        // DelMasterHistorialevidencia_sello(id_usuario,id);
    }
    catch (error) {
        res.status(404).json({
            msg: 'Ocurrio un inconveniente al tratar de eliminar el Parametro',
            error
        });
    }
});
exports.deleteAsignacion = deleteAsignacion;
const getOficiosByNumeroEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero_empleado, id_direccion, id_area, estatus_seguimiento, roll } = req.params;
    console.log(req.params);
    // Construir condiciones dinámicas
    const baseWhere = {
        activo: 1,
        id_direccion_asignacion: id_direccion,
        id_area_asignacion: id_area,
        id_oficio: {
            [sequelize_1.Op.ne]: ""
        }
    };
    if (roll === "4") {
        baseWhere.numero_empledo_asignacion = numero_empleado;
    }
    if (estatus_seguimiento !== "5") {
        baseWhere.estatus_oficio = estatus_seguimiento;
    }
    try {
        // Paso 1: Obtener asignaciones
        const asignados = yield asignacion_1.dbasignacion.findAll({
            where: baseWhere,
            attributes: ['id_oficio', 'id_asignacion', 'estatus_oficio', 'fecha_asignacion']
        });
        // Paso 2: Extraer IDs de oficio
        const id_oficios = asignados.map((a) => a.id_oficio);
        // Paso 3: Obtener oficios
        const oficios = yield oficios_1.dboficios.findAll({
            where: {
                activo: 1,
                id_oficios: id_oficios
            },
        });
        // Paso 4: Combinar datos
        const resultado = oficios.map((oficio) => {
            var _a, _b;
            const asignacion = asignados.find((a) => a.id_oficio === oficio.id_oficios);
            return Object.assign(Object.assign({}, oficio.dataValues), { id_asignacion: (_a = asignacion === null || asignacion === void 0 ? void 0 : asignacion.get('id_asignacion')) !== null && _a !== void 0 ? _a : null, estatus_oficio: (_b = asignacion === null || asignacion === void 0 ? void 0 : asignacion.get('estatus_oficio')) !== null && _b !== void 0 ? _b : null });
        });
        res.json(resultado);
    }
    catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getOficiosByNumeroEmpleado = getOficiosByNumeroEmpleado;
const update_firmante_instrucciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const time = (0, exports.timeNow)();
    const { id_asignacion, numero_empledo_asignacion, nuevaIntruccion } = req.body;
    console.log(req.body);
    //Validamos si existe el parametro en la base de datos 
    const params = yield asignacion_1.dbasignacion.findOne({ where: { id_asignacion: id_asignacion, numero_empledo_asignacion: numero_empledo_asignacion } });
    if (params) {
        try {
            const resultado = yield asignacion_1.dbasignacion.update({
                instrucciones: nuevaIntruccion
            }, {
                where: {
                    id_asignacion: id_asignacion, numero_empledo_asignacion: numero_empledo_asignacion,
                },
            });
            res.json({
                msg: `Registro actualizado exitosamente.`
            });
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
            msg: 'Registro de la tabla : dbasignacion  ya almacenado',
        });
    }
});
exports.update_firmante_instrucciones = update_firmante_instrucciones;
const getInfo_quien_solicito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios, numero_tecnico_asignado, id_rol } = req.params;
    console.log(req.params);
    try {
        if (id_rol == "4") {
            const asignacion = yield asignacion_1.dbasignacion.findOne({
                where: {
                    activo: 1,
                    id_gestion_oficios: id_gestion_oficios,
                    numero_empledo_asignacion: numero_tecnico_asignado
                },
            });
            const id_usuario_quien_asigna = asignacion === null || asignacion === void 0 ? void 0 : asignacion.dataValues.id_usuario_quien_asigna;
            if (id_usuario_quien_asigna != "") {
                const list_user = yield users_opdm_1.dbusers_opdm.findOne({
                    where: {
                        activo: 1,
                        id_users_opdm: id_usuario_quien_asigna
                    },
                });
                res.json(list_user);
            }
        }
        else if (id_rol == "2" || id_rol == "1") {
            const asignacion = yield asignacion_1.dbasignacion.findOne({
                where: {
                    activo: 1,
                    id_gestion_oficios: id_gestion_oficios,
                },
            });
            const id_usuario_quien_asigna = asignacion === null || asignacion === void 0 ? void 0 : asignacion.dataValues.id_usuario_quien_asigna;
            if (id_usuario_quien_asigna != "") {
                const list_user = yield users_opdm_1.dbusers_opdm.findOne({
                    where: {
                        activo: 1,
                        id_users_opdm: id_usuario_quien_asigna
                    },
                });
                res.json(list_user);
            }
        }
    }
    catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getInfo_quien_solicito = getInfo_quien_solicito;
const getInstrucciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficios } = req.params;
    try {
        const instrucciones = yield asignacion_1.dbasignacion.findOne({
            where: {
                activo: 1,
                id_gestion_oficios: id_gestion_oficios,
            },
        });
        res.json(instrucciones);
    }
    catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getInstrucciones = getInstrucciones;
const getAsignacionesByNumeroEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { numero_empleado } = req.params;
    console.log(numero_empleado);
    try {
        const asignaciones = yield tecnico_1.dbtecnico.findAll({
            where: {
                activo: 1,
                numero_empleado_tecnico: numero_empleado,
            },
        });
        res.json(asignaciones);
    }
    catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getAsignacionesByNumeroEmpleado = getAsignacionesByNumeroEmpleado;
const getTecnicosAsignadosByid_gestion_oficioBydireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficio, id_oficios, id_direccion, id_area } = req.params;
    console.log(req.params);
    try {
        const asignaciones = yield asignacion_1.dbasignacion.findAll({
            where: {
                activo: 1,
                id_gestion_oficios: id_gestion_oficio,
                id_oficio: id_oficios,
                id_direccion_asignacion: id_direccion,
                id_area_asignacion: id_area
            },
        });
        res.json(asignaciones);
    }
    catch (error) {
        console.error('Error al obtener empleados:', error);
        res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getTecnicosAsignadosByid_gestion_oficioBydireccion = getTecnicosAsignadosByid_gestion_oficioBydireccion;
const getSecretariasAsignadosByid_gestion_oficioBydireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficio, id_oficios, id_direccion, id_area } = req.params;
    try {
        // 1) Traer asignaciones activas
        const asignaciones = yield asignacion_1.dbasignacion.findAll({
            where: {
                activo: 1,
                id_gestion_oficios: id_gestion_oficio, // Valida que la columna realmente se llame así
                id_oficio: id_oficios,
                id_direccion_asignacion: id_direccion,
                id_area_asignacion: id_area
            }
        });
        if (!asignaciones.length) {
            return res.status(404).json({ msg: 'No hay asignaciones para esos filtros.' });
        }
        // 2) Extraer los IDs de usuario que asignaron
        const secretariaIds = asignaciones.map(a => a.get('id_usuario_quien_asigna'));
        // 3) Buscar TODOS los oficios cuyos id_users_opdm estén en el array
        const oficios = yield users_opdm_1.dbusers_opdm.findAll({
            where: {
                activo: 1,
                id_users_opdm: {
                    [sequelize_1.Op.in]: secretariaIds
                }
            }
        });
        return res.json(oficios);
    }
    catch (error) {
        console.error('Error al obtener empleados:', error);
        return res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getSecretariasAsignadosByid_gestion_oficioBydireccion = getSecretariasAsignadosByid_gestion_oficioBydireccion;
const getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_gestion_oficio, id_oficios, id_direccion, id_area, numero_empleado } = req.params;
    try {
        // 1) Traer asignaciones activas
        const asignaciones = yield asignacion_1.dbasignacion.findAll({
            where: {
                activo: 1,
                id_gestion_oficios: id_gestion_oficio, // Valida que la columna realmente se llame así
                id_oficio: id_oficios,
                id_direccion_asignacion: id_direccion,
                id_area_asignacion: id_area,
                numero_empleado_secretaria: numero_empleado
            }
        });
        return res.json(asignaciones);
    }
    catch (error) {
        console.error('Error al obtener empleados:', error);
        return res.status(500).json({ error: 'Error al obtener empleados' });
    }
});
exports.getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado = getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado;
