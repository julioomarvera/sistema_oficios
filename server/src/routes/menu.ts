import {Router} from 'express'; 
import {getRegByIdmenu, getAllmenu,newmenu,updmenu,delmenu } from '../controllers/menu';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllmenu/:id_usuario/:id_roll', getAllmenu  ); 
   router.get('/:id/:id_usuario', getRegByIdmenu  ); 
   router.post('/',   newmenu     ); 
   router.put('/upd', updmenu     ); 
   router.delete('/del/:id/:id_usuario', delmenu     ); 

export default router;