import {Router} from 'express'; 
import { getRegByIdhistorialMasterfirma, getAllhistorialMasterfirma,  updatehistorialMasterfirma,newhistorialMasterfirma,delhistorialMasterfirma } from '../controllers/historialMasterfirma';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMasterfirma/:id_usuario', getAllhistorialMasterfirma  ); 
   router.get('/getRegByIdhistorialMasterfirma/:id/:id_usuario', getRegByIdhistorialMasterfirma  ); 
   router.post('/',   newhistorialMasterfirma     ); 
   router.put('/upd', updatehistorialMasterfirma     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMasterfirma     ); 

export default router;