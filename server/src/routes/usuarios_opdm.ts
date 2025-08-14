import {Router} from 'express'; 
import {getRegByIdusuarios_opdm, getAllusuarios_opdm,newusuarios_opdm,updusuarios_opdm_id_users_opdm, delusuarios_opdm,actualizarEstatusDescripcionusuarios_opdm,actualizarDesactivadousuarios_opdm } from '../controllers/usuarios_opdm';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllusuarios_opdm/:id_usuario/:id_rol/:estatus/:activo', getAllusuarios_opdm  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdusuarios_opdm  ); 
   router.get('/:id_usuario',   newusuarios_opdm     ); 
   router.delete('/delusuarios_opdm/:id/:id_usuario', delusuarios_opdm); 
   router.get('/actualizarEstatususuarios_opdm/:id_usuarios_opdm/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcionusuarios_opdm); 
   router.get('/actualizarDesactivadousuarios_opdm/:id_usuarios_opdm/:id_usuario/:estatus/:descripcion', actualizarDesactivadousuarios_opdm); 

export default router;