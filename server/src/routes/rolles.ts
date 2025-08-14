import {Router} from 'express'; 
import {getRegByIdws_rolles, getAllws_rolles,newws_rolles,updws_rolles,delws_rolles } from '../controllers/rolles';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllrolles/:id_usuario', getAllws_rolles  ); 
   router.get('/:id/:id_usuario', getRegByIdws_rolles  ); 
   router.post('/',   newws_rolles     ); 
   router.put('/upd', updws_rolles     ); 
   router.delete('/del/:id', delws_rolles     ); 

export default router;