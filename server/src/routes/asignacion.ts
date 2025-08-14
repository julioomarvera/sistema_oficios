import {Router} from 'express'; 
import { new_asignacion,getAllcat_empleadosByDireccionAreas,getAllcat_empleadosByid_gestion_oficios,
        getEncargadoArea,deleteAsignacion,getOficiosByNumeroEmpleado,getInfo_quien_solicito,getInstrucciones,
        update_firmante_instrucciones
 } from '../controllers/asignacion';
import validateToken from './validate-token';

const router = Router(); 
    router.get('/getAsignacionByDireccionArea/:id_gestion_oficios/:id_direccion/:id_area', getAllcat_empleadosByDireccionAreas  ); 
    router.get('/getAllcat_empleadosByid_gestion_oficios/:id_gestion_oficios', getAllcat_empleadosByid_gestion_oficios  ); 
    router.get('/getEncargadoArea/:id_direccion/:id_area', getEncargadoArea  ); 
    router.get('/getOficiosByNumeroEmpleado/:numero_empleado/:id_direccion/:id_area/:estatus_seguimiento/:roll', getOficiosByNumeroEmpleado  ); 
    router.get('/getInfo_quien_solicito/:id_gestion_oficios/:numero_tecnico_asignado', getInfo_quien_solicito  ); 
    router.get('/getInstrucciones/:id_gestion_oficios', getInstrucciones  ); 
    router.post('/',    new_asignacion ); 
    router.delete('/deleteAsignacion/:id_usuario/:id_gestion_oficios/:numero_empleado', deleteAsignacion); 
    router.put('/update_firmante_instrucciones', update_firmante_instrucciones     ); 
export default router;