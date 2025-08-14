import {Router} from 'express'; 
import { getRegByIdhistorialMasterusuarios_opdm, getAllhistorialMasterusuarios_opdm,  updatehistorialMasterusuarios_opdm,newhistorialMasterusuarios_opdm,delhistorialMasterusuarios_opdm } from '../controllers/historialMasterusuarios_opdm';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMasterusuarios_opdm/:id_usuario', getAllhistorialMasterusuarios_opdm  ); 
   router.get('/getRegByIdhistorialMasterusuarios_opdm/:id/:id_usuario', getRegByIdhistorialMasterusuarios_opdm  ); 
   router.post('/',   newhistorialMasterusuarios_opdm     ); 
   router.put('/upd', updatehistorialMasterusuarios_opdm     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMasterusuarios_opdm     ); 

export default router;