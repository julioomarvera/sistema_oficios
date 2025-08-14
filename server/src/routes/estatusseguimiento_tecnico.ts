import {Router} from 'express'; 
import { getRegByIdestatusseguimiento_tecnico, getAllestatusseguimiento_tecnico,  updateestatusseguimiento_tecnico,newestatusseguimiento_tecnico,delestatusseguimiento_tecnico } from '../controllers/estatusseguimiento_tecnico';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllestatusseguimiento_tecnico/:id_usuario', getAllestatusseguimiento_tecnico  ); 
   router.get('/getRegByIdestatusseguimiento_tecnico/:id/:id_usuario', getRegByIdestatusseguimiento_tecnico  ); 
   router.post('/',   newestatusseguimiento_tecnico     ); 
   router.put('/upd', updateestatusseguimiento_tecnico     ); 
   router.delete('/del/:id/:id_usuario', delestatusseguimiento_tecnico     ); 

export default router;