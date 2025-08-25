import {Router} from 'express'; 
import { getRegByIdestatusfirma, getAllestatusfirma,  updateestatusfirma,newestatusfirma,delestatusfirma } from '../controllers/estatusfirma';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatusfirma/:id_usuario', getAllestatusfirma  ); 
   router.get('/getRegByIdestatusfirma/:id/:id_usuario', getRegByIdestatusfirma  ); 
   router.post('/',   newestatusfirma     ); 
   router.put('/upd', updateestatusfirma     ); 
   router.delete('/del/:id/:id_usuario', delestatusfirma     ); 

export default router;