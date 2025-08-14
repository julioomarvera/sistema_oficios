import {Router} from 'express'; 
import {getRegByIdevidencia_sello, getAllevidencia_sello,newevidencia_sello,updevidencia_sello_id_sello, delevidencia_sello,actualizarEstatusDescripcionevidencia_sello,actualizarDesactivadoevidencia_sello } from '../controllers/evidencia_sello';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllevidencia_sello/:id_usuario/:id_rol/:estatus/:activo', getAllevidencia_sello  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdevidencia_sello  ); 
   router.get('/:id_usuario',   newevidencia_sello     ); 
   router.delete('/delevidencia_sello/:id/:id_usuario', delevidencia_sello); 
   router.get('/actualizarEstatusevidencia_sello/:id_evidencia_sello/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcionevidencia_sello); 
   router.get('/actualizarDesactivadoevidencia_sello/:id_evidencia_sello/:id_usuario/:estatus/:descripcion', actualizarDesactivadoevidencia_sello); 

export default router;