import {Router} from 'express'; 
import {getAreaByDireccion,getAreaByArea, getDireccionByNameArea} from '../controllers/cat_direcciones_areas';
import validateToken from './validate-token';
import multer    from 'multer';


const router = Router(); 
   router.get('/getAreaByDireccion/:id', getAreaByDireccion  ); 
   router.get('/getAreaByArea/:id', getAreaByArea  ); 
   router.get('/getDireccionByNameArea/:area', getDireccionByNameArea  ); 

export default router;