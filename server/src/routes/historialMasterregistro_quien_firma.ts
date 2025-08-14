import {Router} from 'express'; 
import { getRegByIdhistorialMasterregistro_quien_firma, getAllhistorialMasterregistro_quien_firma,  updatehistorialMasterregistro_quien_firma,newhistorialMasterregistro_quien_firma,delhistorialMasterregistro_quien_firma } from '../controllers/historialMasterregistro_quien_firma';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMasterregistro_quien_firma/:id_usuario', getAllhistorialMasterregistro_quien_firma  ); 
   router.get('/getRegByIdhistorialMasterregistro_quien_firma/:id/:id_usuario', getRegByIdhistorialMasterregistro_quien_firma  ); 
   router.post('/',   newhistorialMasterregistro_quien_firma     ); 
   router.put('/upd', updatehistorialMasterregistro_quien_firma     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMasterregistro_quien_firma     ); 

export default router;