import {Router} from 'express'; 
import { getRegByIdestatusregistro_quien_firma, getAllestatusregistro_quien_firma,  updateestatusregistro_quien_firma,newestatusregistro_quien_firma,delestatusregistro_quien_firma } from '../controllers/estatusregistro_quien_firma';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatusregistro_quien_firma/:id_usuario', getAllestatusregistro_quien_firma  ); 
   router.get('/getRegByIdestatusregistro_quien_firma/:id/:id_usuario', getRegByIdestatusregistro_quien_firma  ); 
   router.post('/',   newestatusregistro_quien_firma     ); 
   router.put('/upd', updateestatusregistro_quien_firma     ); 
   router.delete('/del/:id/:id_usuario', delestatusregistro_quien_firma     ); 

export default router;