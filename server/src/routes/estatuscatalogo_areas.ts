import {Router} from 'express'; 
import { getRegByIdestatuscatalogo_areas, getAllestatuscatalogo_areas,  updateestatuscatalogo_areas,newestatuscatalogo_areas,delestatuscatalogo_areas } from '../controllers/estatuscatalogo_areas';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatuscatalogo_areas/:id_usuario', getAllestatuscatalogo_areas  ); 
   router.get('/getRegByIdestatuscatalogo_areas/:id/:id_usuario', getRegByIdestatuscatalogo_areas  ); 
   router.post('/',   newestatuscatalogo_areas     ); 
   router.put('/upd', updateestatuscatalogo_areas     ); 
   router.delete('/del/:id/:id_usuario', delestatuscatalogo_areas     ); 

export default router;