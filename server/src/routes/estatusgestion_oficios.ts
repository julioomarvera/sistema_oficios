import {Router} from 'express'; 
import { getRegByIdestatusgestion_oficios, getAllestatusgestion_oficios,  updateestatusgestion_oficios,newestatusgestion_oficios,delestatusgestion_oficios } from '../controllers/estatusgestion_oficios';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatusgestion_oficios/:id_usuario', getAllestatusgestion_oficios  ); 
   router.get('/getRegByIdestatusgestion_oficios/:id/:id_usuario', getRegByIdestatusgestion_oficios  ); 
   router.post('/',   newestatusgestion_oficios     ); 
   router.put('/upd', updateestatusgestion_oficios     ); 
   router.delete('/del/:id/:id_usuario', delestatusgestion_oficios     ); 

export default router;