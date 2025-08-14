import {Router} from 'express'; 
import { getRegByIdhistorialMasterregistro_destinatario, getAllhistorialMasterregistro_destinatario,  updatehistorialMasterregistro_destinatario,newhistorialMasterregistro_destinatario,delhistorialMasterregistro_destinatario } from '../controllers/historialMasterregistro_destinatario';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMasterregistro_destinatario/:id_usuario', getAllhistorialMasterregistro_destinatario  ); 
   router.get('/getRegByIdhistorialMasterregistro_destinatario/:id/:id_usuario', getRegByIdhistorialMasterregistro_destinatario  ); 
   router.post('/',   newhistorialMasterregistro_destinatario     ); 
   router.put('/upd', updatehistorialMasterregistro_destinatario     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMasterregistro_destinatario     ); 

export default router;