import {Router} from 'express'; 
import {getRegByIdgestion_oficios, getAllgestion_oficios,getId_gestion_oficio,getOficiosByDireccion,newgestion_oficios,updgestion_oficios_id_oficios, delgestion_oficios,actualizarEstatusDescripciongestion_oficios,actualizarDesactivadogestion_oficios } from '../controllers/gestion_oficios';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllgestion_oficios/:id_usuario/:id_rol/:estatus/:activo', getAllgestion_oficios  ); 
   router.get('/getId_gestion_oficio/:id_oficios', getId_gestion_oficio  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdgestion_oficios  ); 
   router.post('/getOficiosByDireccion', getOficiosByDireccion  ); 
   
   router.get('/:id_usuario',   newgestion_oficios     ); 
   router.delete('/delgestion_oficios/:id/:id_usuario', delgestion_oficios); 
   router.get('/actualizarEstatusgestion_oficios/:id_gestion_oficios/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripciongestion_oficios); 
   router.get('/actualizarDesactivadogestion_oficios/:id_gestion_oficios/:id_usuario/:estatus/:descripcion', actualizarDesactivadogestion_oficios); 

export default router;