import {Router} from 'express'; 
import {getRegByIdcat_oficio, getAllcat_oficio,newcat_oficio,updcat_oficio,delcat_oficio} from '../controllers/cat_oficio';
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
       cb(null,`./public/catalogo/cat_oficio/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_oficio/:id_usuario', getAllcat_oficio  ); 
   router.get('/:id/:id_usuario', getRegByIdcat_oficio  ); 
   router.post('/',   newcat_oficio     ); 
   router.put('/upd', updcat_oficio     ); 
   router.delete('/del/:id/:id_usuario', delcat_oficio     ); 

export default router;