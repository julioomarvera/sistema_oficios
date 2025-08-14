import {Router} from 'express'; 
import {getRegByIdcatalogo_areas, getAllcatalogo_areas,newcatalogo_areas,updcatalogo_areas_id_cat_areas, delcatalogo_areas,actualizarEstatusDescripcioncatalogo_areas,actualizarDesactivadocatalogo_areas } from '../controllers/catalogo_areas';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllcatalogo_areas/:id_usuario/:id_rol/:estatus/:activo', getAllcatalogo_areas  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdcatalogo_areas  ); 
   router.get('/:id_usuario',   newcatalogo_areas     ); 
   router.delete('/delcatalogo_areas/:id/:id_usuario', delcatalogo_areas); 
   router.get('/actualizarEstatuscatalogo_areas/:id_catalogo_areas/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcioncatalogo_areas); 
   router.get('/actualizarDesactivadocatalogo_areas/:id_catalogo_areas/:id_usuario/:estatus/:descripcion', actualizarDesactivadocatalogo_areas); 

export default router;