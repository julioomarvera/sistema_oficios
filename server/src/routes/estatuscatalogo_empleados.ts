import {Router} from 'express'; 
import { getRegByIdestatuscatalogo_empleados, getAllestatuscatalogo_empleados,  updateestatuscatalogo_empleados,newestatuscatalogo_empleados,delestatuscatalogo_empleados } from '../controllers/estatuscatalogo_empleados';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatuscatalogo_empleados/:id_usuario', getAllestatuscatalogo_empleados  ); 
   router.get('/getRegByIdestatuscatalogo_empleados/:id/:id_usuario', getRegByIdestatuscatalogo_empleados  ); 
   router.post('/',   newestatuscatalogo_empleados     ); 
   router.put('/upd', updateestatuscatalogo_empleados     ); 
   router.delete('/del/:id/:id_usuario', delestatuscatalogo_empleados     ); 

export default router;