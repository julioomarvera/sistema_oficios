import {Router} from 'express'; 
import { getRegByIdestatusregistro_destinatario, getAllestatusregistro_destinatario,  updateestatusregistro_destinatario,newestatusregistro_destinatario,delestatusregistro_destinatario } from '../controllers/estatusregistro_destinatario';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatusregistro_destinatario/:id_usuario', getAllestatusregistro_destinatario  ); 
   router.get('/getRegByIdestatusregistro_destinatario/:id/:id_usuario', getRegByIdestatusregistro_destinatario  ); 
   router.post('/',   newestatusregistro_destinatario     ); 
   router.put('/upd', updateestatusregistro_destinatario     ); 
   router.delete('/del/:id/:id_usuario', delestatusregistro_destinatario     ); 

export default router;