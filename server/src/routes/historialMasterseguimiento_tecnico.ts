import {Router} from 'express'; 
import { getRegByIdhistorialMasterseguimiento_tecnico, getAllhistorialMasterseguimiento_tecnico,  updatehistorialMasterseguimiento_tecnico,newhistorialMasterseguimiento_tecnico,delhistorialMasterseguimiento_tecnico } from '../controllers/historialMasterseguimiento_tecnico';
import validateToken from './validate-token';

const router = Router(); 
   router.get('/getAllhistorialMasterseguimiento_tecnico/:id_usuario', getAllhistorialMasterseguimiento_tecnico  ); 
   router.get('/getRegByIdhistorialMasterseguimiento_tecnico/:id/:id_usuario', getRegByIdhistorialMasterseguimiento_tecnico  ); 
   router.post('/',   newhistorialMasterseguimiento_tecnico     ); 
   router.put('/upd', updatehistorialMasterseguimiento_tecnico     ); 
   router.delete('/del/:id/:id_usuario', delhistorialMasterseguimiento_tecnico     ); 

export default router;