import {Router} from 'express'; 
import {getRegByIdcat_tipo_oficios, getAllcat_tipo_oficios,newcat_tipo_oficios,updcat_tipo_oficios,delcat_tipo_oficios} from '../controllers/cat_tipo_oficios';
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
       cb(null,`./public/catalogo/cat_tipo_oficios/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_tipo_oficios/:id_usuario', getAllcat_tipo_oficios  ); 
   router.get('/:id/:id_usuario', getRegByIdcat_tipo_oficios  ); 
   router.post('/',   newcat_tipo_oficios     ); 
   router.put('/upd', updcat_tipo_oficios     ); 
   router.delete('/del/:id/:id_usuario', delcat_tipo_oficios     ); 

export default router;