import {Router} from 'express'; 
import {getRegByIdregistro_quien_firma, getAllregistro_quien_firma,newregistro_quien_firma,updregistro_quien_firma_id_cat_firmante, delregistro_quien_firma,actualizarEstatusDescripcionregistro_quien_firma,actualizarDesactivadoregistro_quien_firma } from '../controllers/registro_quien_firma';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllregistro_quien_firma/:id_usuario/:id_rol/:estatus/:activo', getAllregistro_quien_firma  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdregistro_quien_firma  ); 
   router.get('/:id_usuario',   newregistro_quien_firma     ); 
   router.delete('/delregistro_quien_firma/:id/:id_usuario', delregistro_quien_firma); 
   router.get('/actualizarEstatusregistro_quien_firma/:id_registro_quien_firma/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcionregistro_quien_firma); 
   router.get('/actualizarDesactivadoregistro_quien_firma/:id_registro_quien_firma/:id_usuario/:estatus/:descripcion', actualizarDesactivadoregistro_quien_firma); 

export default router;