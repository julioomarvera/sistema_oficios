import {Router} from 'express'; 
import {validatPass,actualizarPass} from '../controllers/users_opdm';


const router = Router(); 
    router.post('/validatPass', validatPass);
    router.post('/actualizarPass', actualizarPass);


export default router;