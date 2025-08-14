import {Router} from 'express'; 
import {getRegByIdcat_areas, getAllcat_areas,newcat_areas,updcat_areas,delcat_areas} from '../controllers/cat_areas';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_catalogo_areas} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_catalogo_areas;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/catalogo_areas/cat_areas/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_areas/:id_usuario', getAllcat_areas  ); 
   router.get('/:id/:id_usuario', getRegByIdcat_areas  ); 
 
   router.post('/',    newcat_areas     ); 
   router.put('/upd', updcat_areas     ); 
   router.delete('/del/:id/:id_usuario', delcat_areas     ); 
   router.post('/file/:ruta/:id_catalogo_areas', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/catalogo_areas/cat_areas/${ruta}/${file}`}); 
   }); 

export default router;