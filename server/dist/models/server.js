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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const rolles_1 = __importDefault(require("../routes/rolles"));
const menu_1 = __importDefault(require("../routes/menu"));
const cat_direcciones_1 = __importDefault(require("../routes/cat_direcciones"));
const historialMastercatalogo_areas_1 = __importDefault(require("../routes/historialMastercatalogo_areas"));
const estatuscatalogo_areas_1 = __importDefault(require("../routes/estatuscatalogo_areas"));
const cat_areas_1 = __importDefault(require("../routes/cat_areas"));
const catalogo_areas_1 = __importDefault(require("../routes/catalogo_areas"));
const historialMastercatalogo_empleados_1 = __importDefault(require("../routes/historialMastercatalogo_empleados"));
const estatuscatalogo_empleados_1 = __importDefault(require("../routes/estatuscatalogo_empleados"));
const cat_empleados_1 = __importDefault(require("../routes/cat_empleados"));
const catalogo_empleados_1 = __importDefault(require("../routes/catalogo_empleados"));
const cat_oficio_1 = __importDefault(require("../routes/cat_oficio"));
const cat_tipo_oficios_1 = __importDefault(require("../routes/cat_tipo_oficios"));
const cat_tipo_seguimiento_1 = __importDefault(require("../routes/cat_tipo_seguimiento"));
const historialMasterregistro_quien_firma_1 = __importDefault(require("../routes/historialMasterregistro_quien_firma"));
const estatusregistro_quien_firma_1 = __importDefault(require("../routes/estatusregistro_quien_firma"));
const cat_firmante_1 = __importDefault(require("../routes/cat_firmante"));
const registro_quien_firma_1 = __importDefault(require("../routes/registro_quien_firma"));
const historialMasterregistro_destinatario_1 = __importDefault(require("../routes/historialMasterregistro_destinatario"));
const estatusregistro_destinatario_1 = __importDefault(require("../routes/estatusregistro_destinatario"));
const cat_destinatario_1 = __importDefault(require("../routes/cat_destinatario"));
const registro_destinatario_1 = __importDefault(require("../routes/registro_destinatario"));
const cat_numero_oficios_1 = __importDefault(require("../routes/cat_numero_oficios"));
const historialMastergestion_oficios_1 = __importDefault(require("../routes/historialMastergestion_oficios"));
const estatusgestion_oficios_1 = __importDefault(require("../routes/estatusgestion_oficios"));
const oficios_1 = __importDefault(require("../routes/oficios"));
const gestion_oficios_1 = __importDefault(require("../routes/gestion_oficios"));
const historialMasterusuarios_opdm_1 = __importDefault(require("../routes/historialMasterusuarios_opdm"));
const estatususuarios_opdm_1 = __importDefault(require("../routes/estatususuarios_opdm"));
const users_opdm_1 = __importDefault(require("../routes/users_opdm"));
const usuarios_opdm_1 = __importDefault(require("../routes/usuarios_opdm"));
const cat_direcciones_areas_1 = __importDefault(require("../routes/cat_direcciones_areas"));
const validar_usuario_1 = __importDefault(require("../routes/validar_usuario"));
const historialMasterevidencia_sello_1 = __importDefault(require("../routes/historialMasterevidencia_sello"));
const estatusevidencia_sello_1 = __importDefault(require("../routes/estatusevidencia_sello"));
const sello_1 = __importDefault(require("../routes/sello"));
const evidencia_sello_1 = __importDefault(require("../routes/evidencia_sello"));
const asignacion_1 = __importDefault(require("../routes/asignacion"));
const historialMasterseguimiento_tecnico_1 = __importDefault(require("../routes/historialMasterseguimiento_tecnico"));
const estatusseguimiento_tecnico_1 = __importDefault(require("../routes/estatusseguimiento_tecnico"));
const tecnico_1 = __importDefault(require("../routes/tecnico"));
const seguimiento_tecnico_1 = __importDefault(require("../routes/seguimiento_tecnico"));
//IMPORT ROUTES
const rolles_2 = require("./rolles");
const menu_2 = require("./menu");
const historialmenu_1 = require("./historialmenu");
const historialrolles_1 = require("./historialrolles");
const cat_direcciones_2 = require("./cat_direcciones");
const historialcat_direcciones_1 = require("./historialcat_direcciones");
const historialMastercatalogo_areas_2 = require("./historialMastercatalogo_areas");
const estatuscatalogo_areas_2 = require("./estatuscatalogo_areas");
const historialestatuscatalogo_areas_1 = require("./historialestatuscatalogo_areas");
const cat_areas_2 = require("./cat_areas");
const historialcat_areas_1 = require("./historialcat_areas");
const catalogo_areas_2 = require("./catalogo_areas");
const historialcatalogo_areas_1 = require("./historialcatalogo_areas");
const historialMastercatalogo_empleados_2 = require("./historialMastercatalogo_empleados");
const estatuscatalogo_empleados_2 = require("./estatuscatalogo_empleados");
const historialestatuscatalogo_empleados_1 = require("./historialestatuscatalogo_empleados");
const cat_empleados_2 = require("./cat_empleados");
const historialcat_empleados_1 = require("./historialcat_empleados");
const catalogo_empleados_2 = require("./catalogo_empleados");
const historialcatalogo_empleados_1 = require("./historialcatalogo_empleados");
const cat_oficio_2 = require("./cat_oficio");
const historialcat_oficio_1 = require("./historialcat_oficio");
const cat_tipo_oficios_2 = require("./cat_tipo_oficios");
const historialcat_tipo_oficios_1 = require("./historialcat_tipo_oficios");
const cat_tipo_seguimiento_2 = require("./cat_tipo_seguimiento");
const historialcat_tipo_seguimiento_1 = require("./historialcat_tipo_seguimiento");
const historialMasterregistro_quien_firma_2 = require("./historialMasterregistro_quien_firma");
const estatusregistro_quien_firma_2 = require("./estatusregistro_quien_firma");
const historialestatusregistro_quien_firma_1 = require("./historialestatusregistro_quien_firma");
const cat_firmante_2 = require("./cat_firmante");
const historialcat_firmante_1 = require("./historialcat_firmante");
const registro_quien_firma_2 = require("./registro_quien_firma");
const historialregistro_quien_firma_1 = require("./historialregistro_quien_firma");
const historialMasterregistro_destinatario_2 = require("./historialMasterregistro_destinatario");
const estatusregistro_destinatario_2 = require("./estatusregistro_destinatario");
const historialestatusregistro_destinatario_1 = require("./historialestatusregistro_destinatario");
const cat_destinatario_2 = require("./cat_destinatario");
const historialcat_destinatario_1 = require("./historialcat_destinatario");
const registro_destinatario_2 = require("./registro_destinatario");
const historialregistro_destinatario_1 = require("./historialregistro_destinatario");
const cat_numero_oficios_2 = require("./cat_numero_oficios");
const historialcat_numero_oficios_1 = require("./historialcat_numero_oficios");
const historialMastergestion_oficios_2 = require("./historialMastergestion_oficios");
const estatusgestion_oficios_2 = require("./estatusgestion_oficios");
const historialestatusgestion_oficios_1 = require("./historialestatusgestion_oficios");
const oficios_2 = require("./oficios");
const historialoficios_1 = require("./historialoficios");
const gestion_oficios_2 = require("./gestion_oficios");
const historialgestion_oficios_1 = require("./historialgestion_oficios");
const historialusers_1 = require("./historialusers");
const historialMasterusuarios_opdm_2 = require("./historialMasterusuarios_opdm");
const estatususuarios_opdm_2 = require("./estatususuarios_opdm");
const historialestatususuarios_opdm_1 = require("./historialestatususuarios_opdm");
const users_opdm_2 = require("./users_opdm");
const historialusers_opdm_1 = require("./historialusers_opdm");
const usuarios_opdm_2 = require("./usuarios_opdm");
const historialusuarios_opdm_1 = require("./historialusuarios_opdm");
const historialMasterevidencia_sello_2 = require("./historialMasterevidencia_sello");
const estatusevidencia_sello_2 = require("./estatusevidencia_sello");
const historialestatusevidencia_sello_1 = require("./historialestatusevidencia_sello");
const sello_2 = require("./sello");
const historialsello_1 = require("./historialsello");
const evidencia_sello_2 = require("./evidencia_sello");
const historialevidencia_sello_1 = require("./historialevidencia_sello");
const asignacion_2 = require("./asignacion");
const historialMasterseguimiento_tecnico_2 = require("./historialMasterseguimiento_tecnico");
const estatusseguimiento_tecnico_2 = require("./estatusseguimiento_tecnico");
const historialestatusseguimiento_tecnico_1 = require("./historialestatusseguimiento_tecnico");
const tecnico_2 = require("./tecnico");
const historialtecnico_1 = require("./historialtecnico");
const seguimiento_tecnico_2 = require("./seguimiento_tecnico");
const historialseguimiento_tecnico_1 = require("./historialseguimiento_tecnico");
//IMPORT DB
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("aplicacion corriendo  en el puerto" + this.port);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.static('./public'));
    }
    routes() {
        this.app.use('/api/rolles', rolles_1.default);
        this.app.use('/api/menu', menu_1.default);
        this.app.use('/api/cat_direcciones', cat_direcciones_1.default);
        this.app.use('/api/historialMastercatalogo_areas', historialMastercatalogo_areas_1.default);
        this.app.use('/api/estatuscatalogo_areas', estatuscatalogo_areas_1.default);
        this.app.use('/api/cat_areas', cat_areas_1.default);
        this.app.use('/api/catalogo_areas', catalogo_areas_1.default);
        this.app.use('/api/historialMastercatalogo_empleados', historialMastercatalogo_empleados_1.default);
        this.app.use('/api/estatuscatalogo_empleados', estatuscatalogo_empleados_1.default);
        this.app.use('/api/cat_empleados', cat_empleados_1.default);
        this.app.use('/api/catalogo_empleados', catalogo_empleados_1.default);
        this.app.use('/api/cat_oficio', cat_oficio_1.default);
        this.app.use('/api/cat_tipo_oficios', cat_tipo_oficios_1.default);
        this.app.use('/api/cat_tipo_seguimiento', cat_tipo_seguimiento_1.default);
        this.app.use('/api/historialMasterregistro_quien_firma', historialMasterregistro_quien_firma_1.default);
        this.app.use('/api/estatusregistro_quien_firma', estatusregistro_quien_firma_1.default);
        this.app.use('/api/cat_firmante', cat_firmante_1.default);
        this.app.use('/api/registro_quien_firma', registro_quien_firma_1.default);
        this.app.use('/api/historialMasterregistro_destinatario', historialMasterregistro_destinatario_1.default);
        this.app.use('/api/estatusregistro_destinatario', estatusregistro_destinatario_1.default);
        this.app.use('/api/cat_destinatario', cat_destinatario_1.default);
        this.app.use('/api/registro_destinatario', registro_destinatario_1.default);
        this.app.use('/api/cat_numero_oficios', cat_numero_oficios_1.default);
        this.app.use('/api/historialMastergestion_oficios', historialMastergestion_oficios_1.default);
        this.app.use('/api/estatusgestion_oficios', estatusgestion_oficios_1.default);
        this.app.use('/api/oficios', oficios_1.default);
        this.app.use('/api/gestion_oficios', gestion_oficios_1.default);
        this.app.use('/api/historialMasterusuarios_opdm', historialMasterusuarios_opdm_1.default);
        this.app.use('/api/estatususuarios_opdm', estatususuarios_opdm_1.default);
        this.app.use('/api/users_opdm', users_opdm_1.default);
        this.app.use('/api/usuarios_opdm', usuarios_opdm_1.default);
        this.app.use('/api/direcciones_areas', cat_direcciones_areas_1.default);
        this.app.use('/api/verificarUser', validar_usuario_1.default);
        this.app.use('/api/historialMasterevidencia_sello', historialMasterevidencia_sello_1.default);
        this.app.use('/api/estatusevidencia_sello', estatusevidencia_sello_1.default);
        this.app.use('/api/sello', sello_1.default);
        this.app.use('/api/evidencia_sello', evidencia_sello_1.default);
        this.app.use('/api/asignacion', asignacion_1.default);
        this.app.use('/api/historialMasterseguimiento_tecnico', historialMasterseguimiento_tecnico_1.default);
        this.app.use('/api/estatusseguimiento_tecnico', estatusseguimiento_tecnico_1.default);
        this.app.use('/api/tecnico', tecnico_1.default);
        this.app.use('/api/seguimiento_tecnico', seguimiento_tecnico_1.default);
        //ROUTES ATLAS
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield historialusers_1.dbhistorialusers.sync();
                yield menu_2.dbmenu.sync();
                yield historialmenu_1.dbhistorialmenu.sync();
                yield rolles_2.dbrolles.sync();
                yield historialrolles_1.dbhistorialrolles.sync();
                yield cat_direcciones_2.dbcat_direcciones.sync();
                yield historialcat_direcciones_1.dbhistorialcat_direcciones.sync();
                yield historialMastercatalogo_areas_2.dbhistorialMastercatalogo_areas.sync();
                yield estatuscatalogo_areas_2.dbestatuscatalogo_areas.sync();
                yield historialestatuscatalogo_areas_1.dbhistorialestatuscatalogo_areas.sync();
                yield cat_areas_2.dbcat_areas.sync();
                yield historialcat_areas_1.dbhistorialcat_areas.sync();
                yield catalogo_areas_2.dbcatalogo_areas.sync();
                yield historialcatalogo_areas_1.dbhistorialcatalogo_areas.sync();
                yield historialMastercatalogo_empleados_2.dbhistorialMastercatalogo_empleados.sync();
                yield estatuscatalogo_empleados_2.dbestatuscatalogo_empleados.sync();
                yield historialestatuscatalogo_empleados_1.dbhistorialestatuscatalogo_empleados.sync();
                yield cat_empleados_2.dbcat_empleados.sync();
                yield historialcat_empleados_1.dbhistorialcat_empleados.sync();
                yield catalogo_empleados_2.dbcatalogo_empleados.sync();
                yield historialcatalogo_empleados_1.dbhistorialcatalogo_empleados.sync();
                yield cat_oficio_2.dbcat_oficio.sync();
                yield historialcat_oficio_1.dbhistorialcat_oficio.sync();
                yield cat_tipo_oficios_2.dbcat_tipo_oficios.sync();
                yield historialcat_tipo_oficios_1.dbhistorialcat_tipo_oficios.sync();
                yield cat_tipo_seguimiento_2.dbcat_tipo_seguimiento.sync();
                yield historialcat_tipo_seguimiento_1.dbhistorialcat_tipo_seguimiento.sync();
                yield historialMasterregistro_quien_firma_2.dbhistorialMasterregistro_quien_firma.sync();
                yield estatusregistro_quien_firma_2.dbestatusregistro_quien_firma.sync();
                yield historialestatusregistro_quien_firma_1.dbhistorialestatusregistro_quien_firma.sync();
                yield cat_firmante_2.dbcat_firmante.sync();
                yield historialcat_firmante_1.dbhistorialcat_firmante.sync();
                yield registro_quien_firma_2.dbregistro_quien_firma.sync();
                yield historialregistro_quien_firma_1.dbhistorialregistro_quien_firma.sync();
                yield historialMasterregistro_destinatario_2.dbhistorialMasterregistro_destinatario.sync();
                yield estatusregistro_destinatario_2.dbestatusregistro_destinatario.sync();
                yield historialestatusregistro_destinatario_1.dbhistorialestatusregistro_destinatario.sync();
                yield cat_destinatario_2.dbcat_destinatario.sync();
                yield historialcat_destinatario_1.dbhistorialcat_destinatario.sync();
                yield registro_destinatario_2.dbregistro_destinatario.sync();
                yield historialregistro_destinatario_1.dbhistorialregistro_destinatario.sync();
                yield cat_numero_oficios_2.dbcat_numero_oficios.sync();
                yield historialcat_numero_oficios_1.dbhistorialcat_numero_oficios.sync();
                yield estatusgestion_oficios_2.dbestatusgestion_oficios.sync();
                yield historialestatusgestion_oficios_1.dbhistorialestatusgestion_oficios.sync();
                yield oficios_2.dboficios.sync();
                yield historialoficios_1.dbhistorialoficios.sync();
                yield gestion_oficios_2.dbgestion_oficios.sync();
                yield historialgestion_oficios_1.dbhistorialgestion_oficios.sync();
                yield historialMastergestion_oficios_2.dbhistorialMastergestion_oficios.sync();
                yield historialMasterusuarios_opdm_2.dbhistorialMasterusuarios_opdm.sync();
                yield estatususuarios_opdm_2.dbestatususuarios_opdm.sync();
                yield historialestatususuarios_opdm_1.dbhistorialestatususuarios_opdm.sync();
                yield users_opdm_2.dbusers_opdm.sync();
                yield historialusers_opdm_1.dbhistorialusers_opdm.sync();
                yield usuarios_opdm_2.dbusuarios_opdm.sync();
                yield historialusuarios_opdm_1.dbhistorialusuarios_opdm.sync();
                yield historialMasterevidencia_sello_2.dbhistorialMasterevidencia_sello.sync();
                yield estatusevidencia_sello_2.dbestatusevidencia_sello.sync();
                yield historialestatusevidencia_sello_1.dbhistorialestatusevidencia_sello.sync();
                yield sello_2.dbsello.sync();
                yield historialsello_1.dbhistorialsello.sync();
                yield evidencia_sello_2.dbevidencia_sello.sync();
                yield historialevidencia_sello_1.dbhistorialevidencia_sello.sync();
                yield asignacion_2.dbasignacion.sync({ alter: true });
                yield historialMasterseguimiento_tecnico_2.dbhistorialMasterseguimiento_tecnico.sync();
                yield estatusseguimiento_tecnico_2.dbestatusseguimiento_tecnico.sync();
                yield historialestatusseguimiento_tecnico_1.dbhistorialestatusseguimiento_tecnico.sync();
                yield tecnico_2.dbtecnico.sync();
                yield historialtecnico_1.dbhistorialtecnico.sync();
                yield seguimiento_tecnico_2.dbseguimiento_tecnico.sync();
                yield historialseguimiento_tecnico_1.dbhistorialseguimiento_tecnico.sync();
                //DB ATLAS
            }
            catch (error) {
                console.error('Unable to connect to the database.', error);
            }
        });
    }
}
exports.default = Server;
