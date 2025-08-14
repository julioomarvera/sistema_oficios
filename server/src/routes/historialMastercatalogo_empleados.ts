import {Router} from 'express'; 
import { getRegByIdhistorialMastercatalogo_empleados, getAllhistorialMastercatalogo_empleados,  updatehistorialMastercatalogo_empleados,newhistorialMastercatalogo_empleados,delhistorialMastercatalogo_empleados } from '../controllers/historialMastercatalogo_empleados';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMastercatalogo_empleados/:id_usuario', getAllhistorialMastercatalogo_empleados  ); 
   router.get('/getRegByIdhistorialMastercatalogo_empleados/:id/:id_usuario', getRegByIdhistorialMastercatalogo_empleados  ); 
   router.post('/',   newhistorialMastercatalogo_empleados     ); 
   router.put('/upd', updatehistorialMastercatalogo_empleados     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMastercatalogo_empleados     ); 

export default router;