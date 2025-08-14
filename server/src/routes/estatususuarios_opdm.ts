import {Router} from 'express'; 
import { getRegByIdestatususuarios_opdm, getAllestatususuarios_opdm,  updateestatususuarios_opdm,newestatususuarios_opdm,delestatususuarios_opdm } from '../controllers/estatususuarios_opdm';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatususuarios_opdm/:id_usuario', getAllestatususuarios_opdm  ); 
   router.get('/getRegByIdestatususuarios_opdm/:id/:id_usuario', getRegByIdestatususuarios_opdm  ); 
   router.post('/',   newestatususuarios_opdm     ); 
   router.put('/upd', updateestatususuarios_opdm     ); 
   router.delete('/del/:id/:id_usuario', delestatususuarios_opdm     ); 

export default router;