import {Router} from 'express'; 
import {getRegByIdcatalogo_empleados, getAllcatalogo_empleados,newcatalogo_empleados,updcatalogo_empleados_id_cat_empleados, delcatalogo_empleados,actualizarEstatusDescripcioncatalogo_empleados,actualizarDesactivadocatalogo_empleados } from '../controllers/catalogo_empleados';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllcatalogo_empleados/:id_usuario/:id_rol/:estatus/:activo', getAllcatalogo_empleados  ); 
   router.get('/:id/:id_usuario/:id_rol', getRegByIdcatalogo_empleados  ); 
   router.get('/:id_usuario',   newcatalogo_empleados     ); 
   router.delete('/delcatalogo_empleados/:id/:id_usuario', delcatalogo_empleados); 
   router.get('/actualizarEstatuscatalogo_empleados/:id_catalogo_empleados/:id_usuario/:estatus/:descripcion', actualizarEstatusDescripcioncatalogo_empleados); 
   router.get('/actualizarDesactivadocatalogo_empleados/:id_catalogo_empleados/:id_usuario/:estatus/:descripcion', actualizarDesactivadocatalogo_empleados); 

export default router;