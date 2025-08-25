import {Router} from 'express'; 
import { new_asignacion,getAllcat_empleadosByDireccionAreas,getAllcat_empleadosByid_gestion_oficios,
        getEncargadoArea,getEncargadosPorDireccionArea,deleteAsignacion,getOficiosByNumeroEmpleado,getInfo_quien_solicito,getInstrucciones,
        update_firmante_instrucciones,getAsignacionesByNumeroEmpleado,getTecnicosAsignadosByid_gestion_oficioBydireccion,
        getSecretariasAsignadosByid_gestion_oficioBydireccion,getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado
 } from '../controllers/asignacion';
import validateToken from './validate-token';

const router = Router(); 
    router.get('/getAsignacionByDireccionArea/:id_gestion_oficios/:id_direccion/:id_area', getAllcat_empleadosByDireccionAreas  ); 
    router.get('/getAllcat_empleadosByid_gestion_oficios/:id_gestion_oficios', getAllcat_empleadosByid_gestion_oficios  ); 
    router.get('/getEncargadoArea/:id_direccion/:id_area', getEncargadoArea  ); 
    router.get('/getEncargadosPorDireccionArea/:id_direccion/:id_area', getEncargadosPorDireccionArea  ); 
    router.get('/getOficiosByNumeroEmpleado/:numero_empleado/:id_direccion/:id_area/:estatus_seguimiento/:roll', getOficiosByNumeroEmpleado  ); 
    router.get('/getInfo_quien_solicito/:id_gestion_oficios/:numero_tecnico_asignado/:id_rol', getInfo_quien_solicito  ); 
    router.get('/getInstrucciones/:id_gestion_oficios', getInstrucciones  ); 
    router.get('/getAsignacionesByNumeroEmpleado/:numero_empleado', getAsignacionesByNumeroEmpleado  );   
    router.get('/getTecnicosAsignadosByid_gestion_oficioBydireccion/:id_gestion_oficio/:id_oficios/:id_direccion/:id_area', getTecnicosAsignadosByid_gestion_oficioBydireccion  );   
    router.get('/getSecretariasAsignadosByid_gestion_oficioBydireccion/:id_gestion_oficio/:id_oficios/:id_direccion/:id_area', getSecretariasAsignadosByid_gestion_oficioBydireccion  );   
    router.get('/getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado/:id_gestion_oficio/:id_oficios/:id_direccion/:id_area/:numero_empleado', getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado  );   
    

    router.post('/',    new_asignacion ); 
    router.delete('/deleteAsignacion/:id_usuario/:id_gestion_oficios/:numero_empleado', deleteAsignacion); 
    router.put('/update_firmante_instrucciones', update_firmante_instrucciones     ); 
export default router;