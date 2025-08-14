import {Router} from 'express'; 
import { getRegByIdhistorialMasterevidencia_sello, getAllhistorialMasterevidencia_sello,  updatehistorialMasterevidencia_sello,newhistorialMasterevidencia_sello,delhistorialMasterevidencia_sello } from '../controllers/historialMasterevidencia_sello';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMasterevidencia_sello/:id_usuario', getAllhistorialMasterevidencia_sello  ); 
   router.get('/getRegByIdhistorialMasterevidencia_sello/:id/:id_usuario', getRegByIdhistorialMasterevidencia_sello  ); 
   router.post('/',   newhistorialMasterevidencia_sello     ); 
   router.put('/upd', updatehistorialMasterevidencia_sello     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMasterevidencia_sello     ); 

export default router;