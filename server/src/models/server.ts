import express, { Application } from 'express';
import cors from 'cors';
import routesrolles from '../routes/rolles';
import routermenu from '../routes/menu';
import routercat_direcciones from '../routes/cat_direcciones';
import routerhistorialMastercatalogo_areas from '../routes/historialMastercatalogo_areas';
import routerestatuscatalogo_areas from '../routes/estatuscatalogo_areas';
import routercat_areas from '../routes/cat_areas';
import routercatalogo_areas from '../routes/catalogo_areas';
import routerhistorialMastercatalogo_empleados from '../routes/historialMastercatalogo_empleados';
import routerestatuscatalogo_empleados from '../routes/estatuscatalogo_empleados';
import routercat_empleados from '../routes/cat_empleados';
import routercatalogo_empleados from '../routes/catalogo_empleados';
import routercat_oficio from '../routes/cat_oficio';
import routercat_tipo_oficios from '../routes/cat_tipo_oficios';
import routercat_tipo_seguimiento from '../routes/cat_tipo_seguimiento';
import routerhistorialMasterregistro_quien_firma from '../routes/historialMasterregistro_quien_firma';
import routerestatusregistro_quien_firma from '../routes/estatusregistro_quien_firma';
import routercat_firmante from '../routes/cat_firmante';
import routerregistro_quien_firma from '../routes/registro_quien_firma';
import routerhistorialMasterregistro_destinatario from '../routes/historialMasterregistro_destinatario';
import routerestatusregistro_destinatario from '../routes/estatusregistro_destinatario';
import routercat_destinatario from '../routes/cat_destinatario';
import routerregistro_destinatario from '../routes/registro_destinatario';
import routercat_numero_oficios from '../routes/cat_numero_oficios';
import routerhistorialMastergestion_oficios from '../routes/historialMastergestion_oficios';
import routerestatusgestion_oficios from '../routes/estatusgestion_oficios';
import routeroficios from '../routes/oficios';
import routergestion_oficios from '../routes/gestion_oficios';
import routerhistorialMasterusuarios_opdm from '../routes/historialMasterusuarios_opdm';
import routerestatususuarios_opdm from '../routes/estatususuarios_opdm';
import routerusers_opdm from '../routes/users_opdm';
import routerusuarios_opdm from '../routes/usuarios_opdm';
import routerDirecciones_areas from '../routes/cat_direcciones_areas';
import routerVerificacionUser from '../routes/validar_usuario';
import routerhistorialMasterevidencia_sello  from '../routes/historialMasterevidencia_sello'; 
import routerestatusevidencia_sello  from '../routes/estatusevidencia_sello';
import routersello  from '../routes/sello'; 
import routerevidencia_sello  from '../routes/evidencia_sello'; 
import routerasignacion from '../routes/asignacion'; 
import routerhistorialMasterseguimiento_tecnico  from '../routes/historialMasterseguimiento_tecnico'; 
import routerestatusseguimiento_tecnico  from '../routes/estatusseguimiento_tecnico';
import routertecnico  from '../routes/tecnico'; 
import routerseguimiento_tecnico  from '../routes/seguimiento_tecnico';


//IMPORT ROUTES


import { dbrolles } from './rolles';
import { dbmenu } from './menu';
import { dbhistorialmenu } from './historialmenu';
import { dbhistorialrolles } from './historialrolles';
import { dbcat_direcciones } from './cat_direcciones';
import { dbhistorialcat_direcciones } from './historialcat_direcciones';
import { dbhistorialMastercatalogo_areas } from './historialMastercatalogo_areas';
import { dbestatuscatalogo_areas } from './estatuscatalogo_areas';
import { dbhistorialestatuscatalogo_areas } from './historialestatuscatalogo_areas';
import { dbcat_areas } from './cat_areas';
import { dbhistorialcat_areas } from './historialcat_areas';
import { dbcatalogo_areas } from './catalogo_areas';
import { dbhistorialcatalogo_areas } from './historialcatalogo_areas';
import { dbhistorialMastercatalogo_empleados } from './historialMastercatalogo_empleados';
import { dbestatuscatalogo_empleados } from './estatuscatalogo_empleados';
import { dbhistorialestatuscatalogo_empleados } from './historialestatuscatalogo_empleados';
import { dbcat_empleados } from './cat_empleados';
import { dbhistorialcat_empleados } from './historialcat_empleados';
import { dbcatalogo_empleados } from './catalogo_empleados';
import { dbhistorialcatalogo_empleados } from './historialcatalogo_empleados';
import { dbcat_oficio } from './cat_oficio';
import { dbhistorialcat_oficio } from './historialcat_oficio';
import { dbcat_tipo_oficios } from './cat_tipo_oficios';
import { dbhistorialcat_tipo_oficios } from './historialcat_tipo_oficios';
import { dbcat_tipo_seguimiento } from './cat_tipo_seguimiento';
import { dbhistorialcat_tipo_seguimiento } from './historialcat_tipo_seguimiento';
import { dbhistorialMasterregistro_quien_firma } from './historialMasterregistro_quien_firma';
import { dbestatusregistro_quien_firma } from './estatusregistro_quien_firma';
import { dbhistorialestatusregistro_quien_firma } from './historialestatusregistro_quien_firma';
import { dbcat_firmante } from './cat_firmante';
import { dbhistorialcat_firmante } from './historialcat_firmante';
import { dbregistro_quien_firma } from './registro_quien_firma';
import { dbhistorialregistro_quien_firma } from './historialregistro_quien_firma';
import { dbhistorialMasterregistro_destinatario } from './historialMasterregistro_destinatario';
import { dbestatusregistro_destinatario } from './estatusregistro_destinatario';
import { dbhistorialestatusregistro_destinatario } from './historialestatusregistro_destinatario';
import { dbcat_destinatario } from './cat_destinatario';
import { dbhistorialcat_destinatario } from './historialcat_destinatario';
import { dbregistro_destinatario } from './registro_destinatario';
import { dbhistorialregistro_destinatario } from './historialregistro_destinatario';
import { dbcat_numero_oficios } from './cat_numero_oficios';
import { dbhistorialcat_numero_oficios } from './historialcat_numero_oficios';
import { dbhistorialMastergestion_oficios } from './historialMastergestion_oficios';
import { dbestatusgestion_oficios } from './estatusgestion_oficios';
import { dbhistorialestatusgestion_oficios } from './historialestatusgestion_oficios';
import { dboficios } from './oficios';
import { dbhistorialoficios } from './historialoficios';
import { dbgestion_oficios } from './gestion_oficios';
import { dbhistorialgestion_oficios } from './historialgestion_oficios';
import { dbhistorialMasteruser } from './historialMasteruser';
import { dbestatususer } from './estatususer';
import { dbhistorialestatususer } from './historialestatususer';
import { dbhistorialusers } from './historialusers';
import { dbhistorialMasterusuarios_opdm } from './historialMasterusuarios_opdm';
import { dbestatususuarios_opdm } from './estatususuarios_opdm';
import { dbhistorialestatususuarios_opdm } from './historialestatususuarios_opdm';
import { dbusers_opdm } from './users_opdm';
import { dbhistorialusers_opdm } from './historialusers_opdm';
import { dbusuarios_opdm } from './usuarios_opdm';
import { dbhistorialusuarios_opdm } from './historialusuarios_opdm';

import { dbhistorialMasterevidencia_sello} from './historialMasterevidencia_sello'; 
import { dbestatusevidencia_sello} from './estatusevidencia_sello'; 
import { dbhistorialestatusevidencia_sello} from './historialestatusevidencia_sello'; 
import { dbsello} from './sello'; 
import { dbhistorialsello} from './historialsello'; 
import { dbevidencia_sello } from './evidencia_sello'; 
import { dbhistorialevidencia_sello } from './historialevidencia_sello'; 
import { dbasignacion } from './asignacion';

import { dbhistorialMasterseguimiento_tecnico} from './historialMasterseguimiento_tecnico'; 
import { dbestatusseguimiento_tecnico} from './estatusseguimiento_tecnico'; 
import { dbhistorialestatusseguimiento_tecnico} from './historialestatusseguimiento_tecnico'; 
import { dbtecnico} from './tecnico'; 
import { dbhistorialtecnico} from './historialtecnico'; 
import { dbseguimiento_tecnico } from './seguimiento_tecnico'; 
import { dbhistorialseguimiento_tecnico } from './historialseguimiento_tecnico'; 
//IMPORT DB

class Server {
  private app: Application;
  private port: string | undefined;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.listen();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("aplicacion corriendo  en el puerto" + this.port);
    })
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static('./public'));

  }


  routes() {
    this.app.use('/api/rolles', routesrolles);
    this.app.use('/api/menu', routermenu);
    this.app.use('/api/cat_direcciones', routercat_direcciones);
    this.app.use('/api/historialMastercatalogo_areas', routerhistorialMastercatalogo_areas);
    this.app.use('/api/estatuscatalogo_areas', routerestatuscatalogo_areas);
    this.app.use('/api/cat_areas', routercat_areas);
    this.app.use('/api/catalogo_areas', routercatalogo_areas);
    this.app.use('/api/historialMastercatalogo_empleados', routerhistorialMastercatalogo_empleados);
    this.app.use('/api/estatuscatalogo_empleados', routerestatuscatalogo_empleados);
    this.app.use('/api/cat_empleados', routercat_empleados);
    this.app.use('/api/catalogo_empleados', routercatalogo_empleados);
    this.app.use('/api/cat_oficio', routercat_oficio);
    this.app.use('/api/cat_tipo_oficios', routercat_tipo_oficios);
    this.app.use('/api/cat_tipo_seguimiento', routercat_tipo_seguimiento);
    this.app.use('/api/historialMasterregistro_quien_firma', routerhistorialMasterregistro_quien_firma);
    this.app.use('/api/estatusregistro_quien_firma', routerestatusregistro_quien_firma);
    this.app.use('/api/cat_firmante', routercat_firmante);
    this.app.use('/api/registro_quien_firma', routerregistro_quien_firma);
    this.app.use('/api/historialMasterregistro_destinatario', routerhistorialMasterregistro_destinatario);
    this.app.use('/api/estatusregistro_destinatario', routerestatusregistro_destinatario);
    this.app.use('/api/cat_destinatario', routercat_destinatario);
    this.app.use('/api/registro_destinatario', routerregistro_destinatario);
    this.app.use('/api/cat_numero_oficios', routercat_numero_oficios);
    this.app.use('/api/historialMastergestion_oficios', routerhistorialMastergestion_oficios);
    this.app.use('/api/estatusgestion_oficios', routerestatusgestion_oficios);
    this.app.use('/api/oficios', routeroficios);
    this.app.use('/api/gestion_oficios', routergestion_oficios);
    this.app.use('/api/historialMasterusuarios_opdm', routerhistorialMasterusuarios_opdm);
    this.app.use('/api/estatususuarios_opdm', routerestatususuarios_opdm);
    this.app.use('/api/users_opdm', routerusers_opdm);
    this.app.use('/api/usuarios_opdm', routerusuarios_opdm);
    this.app.use('/api/direcciones_areas',routerDirecciones_areas)
    this.app.use('/api/verificarUser',routerVerificacionUser)
    this.app.use('/api/historialMasterevidencia_sello', routerhistorialMasterevidencia_sello); 
    this.app.use('/api/estatusevidencia_sello', routerestatusevidencia_sello); 
    this.app.use('/api/sello', routersello); 
    this.app.use('/api/evidencia_sello', routerevidencia_sello); 
    this.app.use('/api/asignacion', routerasignacion);
    this.app.use('/api/historialMasterseguimiento_tecnico', routerhistorialMasterseguimiento_tecnico); 
    this.app.use('/api/estatusseguimiento_tecnico', routerestatusseguimiento_tecnico); 
    this.app.use('/api/tecnico', routertecnico); 
    this.app.use('/api/seguimiento_tecnico', routerseguimiento_tecnico); 

    
    //ROUTES ATLAS
  }

  async dbConnect() {
    try {

      await dbhistorialusers.sync();
      await dbmenu.sync();
      await dbhistorialmenu.sync();
      await dbrolles.sync();
      await dbhistorialrolles.sync();

      await dbcat_direcciones.sync();
      await dbhistorialcat_direcciones.sync();
      await dbhistorialMastercatalogo_areas.sync();
      await dbestatuscatalogo_areas.sync();
      await dbhistorialestatuscatalogo_areas.sync();
      await dbcat_areas.sync();
      await dbhistorialcat_areas.sync();
      await dbcatalogo_areas.sync();
      await dbhistorialcatalogo_areas.sync();
      await dbhistorialMastercatalogo_empleados.sync();
      await dbestatuscatalogo_empleados.sync();
      await dbhistorialestatuscatalogo_empleados.sync();
      await dbcat_empleados.sync();
      await dbhistorialcat_empleados.sync();
      await dbcatalogo_empleados.sync();
      await dbhistorialcatalogo_empleados.sync();
      await dbcat_oficio.sync();
      await dbhistorialcat_oficio.sync();
      await dbcat_tipo_oficios.sync();
      await dbhistorialcat_tipo_oficios.sync();
      await dbcat_tipo_seguimiento.sync();
      await dbhistorialcat_tipo_seguimiento.sync();
      await dbhistorialMasterregistro_quien_firma.sync();
      await dbestatusregistro_quien_firma.sync();
      await dbhistorialestatusregistro_quien_firma.sync();
      await dbcat_firmante.sync();
      await dbhistorialcat_firmante.sync();
      await dbregistro_quien_firma.sync();
      await dbhistorialregistro_quien_firma.sync();
      await dbhistorialMasterregistro_destinatario.sync();
      await dbestatusregistro_destinatario.sync();
      await dbhistorialestatusregistro_destinatario.sync();
      await dbcat_destinatario.sync();
      await dbhistorialcat_destinatario.sync();
      await dbregistro_destinatario.sync();
      await dbhistorialregistro_destinatario.sync();
      await dbcat_numero_oficios.sync();
      await dbhistorialcat_numero_oficios.sync();
      await dbestatusgestion_oficios.sync();
      await dbhistorialestatusgestion_oficios.sync();
      await dboficios.sync();
      await dbhistorialoficios.sync();
      await dbgestion_oficios.sync();
      await dbhistorialgestion_oficios.sync();
      await dbhistorialMastergestion_oficios.sync();
      await dbhistorialMasterusuarios_opdm.sync();
      await dbestatususuarios_opdm.sync();
      await dbhistorialestatususuarios_opdm.sync();
      await dbusers_opdm.sync();
      await dbhistorialusers_opdm.sync();
      await dbusuarios_opdm.sync();
      await dbhistorialusuarios_opdm.sync();
      await dbhistorialMasterevidencia_sello.sync(); 
      await dbestatusevidencia_sello.sync(); 
      await dbhistorialestatusevidencia_sello.sync();
      await dbsello.sync(); 
      await dbhistorialsello.sync();
      await dbevidencia_sello.sync();
      await dbhistorialevidencia_sello.sync();
      await dbasignacion.sync({alter:true});
      await dbhistorialMasterseguimiento_tecnico.sync(); 
      await dbestatusseguimiento_tecnico.sync(); 
      await dbhistorialestatusseguimiento_tecnico.sync();
      await dbtecnico.sync(); 
      await dbhistorialtecnico.sync();
      await dbseguimiento_tecnico.sync();
      await dbhistorialseguimiento_tecnico.sync();
      //DB ATLAS
    }
    catch (error) {
      console.error('Unable to connect to the database.', error);
    }
  }
}

export default Server;