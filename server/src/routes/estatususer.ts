import {Router} from 'express'; 
import { getRegByIdestatususer, getAllestatususer,  updateestatususer,newestatususer,delestatususer } from '../controllers/estatususer';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatususer/:id_usuario', getAllestatususer  ); 
   router.get('/getRegByIdestatususer/:id/:id_usuario', getRegByIdestatususer  ); 
   router.post('/',   newestatususer     ); 
   router.put('/upd', updateestatususer     ); 
   router.delete('/del/:id/:id_usuario', delestatususer     ); 

export default router;