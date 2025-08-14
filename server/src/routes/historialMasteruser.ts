import {Router} from 'express'; 
import { getRegByIdhistorialMasteruser, getAllhistorialMasteruser,  updatehistorialMasteruser,newhistorialMasteruser,delhistorialMasteruser } from '../controllers/historialMasteruser';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMasteruser/:id_usuario', getAllhistorialMasteruser  ); 
   router.get('/getRegByIdhistorialMasteruser/:id/:id_usuario', getRegByIdhistorialMasteruser  ); 
   router.post('/',   newhistorialMasteruser     ); 
   router.put('/upd', updatehistorialMasteruser     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMasteruser     ); 

export default router;