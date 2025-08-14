import {Router} from 'express'; 
import { getRegByIdestatusevidencia_sello, getAllestatusevidencia_sello,  updateestatusevidencia_sello,newestatusevidencia_sello,delestatusevidencia_sello } from '../controllers/estatusevidencia_sello';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatusevidencia_sello/:id_usuario', getAllestatusevidencia_sello  ); 
   router.get('/getRegByIdestatusevidencia_sello/:id/:id_usuario', getRegByIdestatusevidencia_sello  ); 
   router.post('/',   newestatusevidencia_sello     ); 
   router.put('/upd', updateestatusevidencia_sello     ); 
   router.delete('/del/:id/:id_usuario', delestatusevidencia_sello     ); 

export default router;