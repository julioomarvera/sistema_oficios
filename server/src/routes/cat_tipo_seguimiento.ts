import {Router} from 'express'; 
import {getRegByIdcat_tipo_seguimiento, getAllcat_tipo_seguimiento,newcat_tipo_seguimiento,updcat_tipo_seguimiento,delcat_tipo_seguimiento} from '../controllers/cat_tipo_seguimiento';
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
       cb(null,`./public/catalogo/cat_tipo_seguimiento/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_tipo_seguimiento/:id_usuario', getAllcat_tipo_seguimiento  ); 
   router.get('/:id/:id_usuario', getRegByIdcat_tipo_seguimiento  ); 
   router.post('/',   newcat_tipo_seguimiento     ); 
   router.put('/upd', updcat_tipo_seguimiento     ); 
   router.delete('/del/:id/:id_usuario', delcat_tipo_seguimiento     ); 

export default router;