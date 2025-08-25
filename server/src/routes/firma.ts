import {Router} from 'express'; 
import {getRegByIdfirma, getAllfirma,newfirma,updfirma_id_firma_coordinador, delfirma,actualizarEstatusDescripcionfirma,actualizarDesactivadofirma } from '../controllers/firma';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllfirma/:id_usuario/:id_rol/:estatus/:activo', getAllfirma  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdfirma  ); 
   router.get('/:id_usuario',   newfirma     ); 
   router.delete('/delfirma/:id/:id_usuario', delfirma); 
   router.get('/actualizarEstatusfirma/:id_firma/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcionfirma); 
   router.get('/actualizarDesactivadofirma/:id_firma/:id_usuario/:estatus/:descripcion', actualizarDesactivadofirma); 

export default router;