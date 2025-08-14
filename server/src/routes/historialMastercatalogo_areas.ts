import {Router} from 'express'; 
import { getRegByIdhistorialMastercatalogo_areas, getAllhistorialMastercatalogo_areas,  updatehistorialMastercatalogo_areas,newhistorialMastercatalogo_areas,delhistorialMastercatalogo_areas } from '../controllers/historialMastercatalogo_areas';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMastercatalogo_areas/:id_usuario', getAllhistorialMastercatalogo_areas  ); 
   router.get('/getRegByIdhistorialMastercatalogo_areas/:id/:id_usuario', getRegByIdhistorialMastercatalogo_areas  ); 
   router.post('/',   newhistorialMastercatalogo_areas     ); 
   router.put('/upd', updatehistorialMastercatalogo_areas     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMastercatalogo_areas     ); 

export default router;