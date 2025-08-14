import {Router} from 'express'; 
import {getRegByIdcat_direcciones, getAllcat_direcciones,newcat_direcciones,updcat_direcciones,delcat_direcciones} from '../controllers/cat_direcciones';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_catalogo} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_catalogo;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/catalogo/cat_direcciones/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_direcciones/:id_usuario', getAllcat_direcciones  ); 
   router.get('/:id/:id_usuario', getRegByIdcat_direcciones  ); 
   router.post('/',   newcat_direcciones     ); 
   router.put('/upd', updcat_direcciones     ); 
   router.delete('/del/:id/:id_usuario', delcat_direcciones     ); 

export default router;