import {Router} from 'express'; 
import {getRegByIdseguimiento_tecnico, getAllseguimiento_tecnico,newseguimiento_tecnico,updseguimiento_tecnico_id_tecnico, delseguimiento_tecnico,actualizarEstatusDescripcionseguimiento_tecnico,actualizarDesactivadoseguimiento_tecnico } from '../controllers/seguimiento_tecnico';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllseguimiento_tecnico/:id_usuario/:id_rol/:estatus/:activo', getAllseguimiento_tecnico  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdseguimiento_tecnico  ); 
   router.get('/:id_usuario',   newseguimiento_tecnico     ); 
   router.delete('/delseguimiento_tecnico/:id/:id_usuario', delseguimiento_tecnico); 
   router.get('/actualizarEstatusseguimiento_tecnico/:id_seguimiento_tecnico/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcionseguimiento_tecnico); 
   router.get('/actualizarDesactivadoseguimiento_tecnico/:id_seguimiento_tecnico/:id_usuario/:estatus/:descripcion', actualizarDesactivadoseguimiento_tecnico); 

export default router;