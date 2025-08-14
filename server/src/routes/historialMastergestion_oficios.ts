import {Router} from 'express'; 
import { getRegByIdhistorialMastergestion_oficios, getAllhistorialMastergestion_oficios,  updatehistorialMastergestion_oficios,newhistorialMastergestion_oficios,delhistorialMastergestion_oficios } from '../controllers/historialMastergestion_oficios';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMastergestion_oficios/:id_usuario', getAllhistorialMastergestion_oficios  ); 
   router.get('/getRegByIdhistorialMastergestion_oficios/:id/:id_usuario', getRegByIdhistorialMastergestion_oficios  ); 
   router.post('/',   newhistorialMastergestion_oficios     ); 
   router.put('/upd', updatehistorialMastergestion_oficios     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMastergestion_oficios     ); 

export default router;