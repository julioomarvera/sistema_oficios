import {Router} from 'express'; 
import {getRegByIdregistro_destinatario, getAllregistro_destinatario,newregistro_destinatario,updregistro_destinatario_id_cat_destinatario, delregistro_destinatario,actualizarEstatusDescripcionregistro_destinatario,actualizarDesactivadoregistro_destinatario } from '../controllers/registro_destinatario';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllregistro_destinatario/:id_usuario/:id_rol/:estatus/:activo', getAllregistro_destinatario  ); 

   
   router.get('/:id/:id_usuario/:id_rol', getRegByIdregistro_destinatario  ); 
   router.get('/:id_usuario',   newregistro_destinatario     ); 
   router.delete('/delregistro_destinatario/:id/:id_usuario', delregistro_destinatario); 
   router.get('/actualizarEstatusregistro_destinatario/:id_registro_destinatario/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcionregistro_destinatario); 
   router.get('/actualizarDesactivadoregistro_destinatario/:id_registro_destinatario/:id_usuario/:estatus/:descripcion', actualizarDesactivadoregistro_destinatario); 

export default router;