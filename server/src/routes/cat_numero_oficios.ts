import {Router} from 'express'; 
import {getRegByIdcat_numero_oficios, getAllcat_numero_oficios,get_seguimiento_numero_oficios,newcat_numero_oficios,updcat_numero_oficios,delcat_numero_oficios} from '../controllers/cat_numero_oficios';
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
       cb(null,`./public/catalogo/cat_numero_oficios/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_numero_oficios/:id_usuario', getAllcat_numero_oficios  ); 
   router.get('/get_seguimiento_numero_oficios/:id_usuario', get_seguimiento_numero_oficios  ); 
   router.get('/:id/:id_usuario', getRegByIdcat_numero_oficios  ); 
   router.post('/',   newcat_numero_oficios     ); 
   router.put('/upd', updcat_numero_oficios     ); 
   router.delete('/del/:id/:id_usuario', delcat_numero_oficios     ); 

export default router;