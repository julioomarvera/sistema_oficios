import {Router} from 'express'; 
import {getRegByIdoficios, getAlloficios,getOficio_by_id_oficio, newoficios,updoficios,deloficios} from '../controllers/oficios';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_gestion_oficios} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_gestion_oficios;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/gestion_oficios/oficios/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAlloficios/:id_usuario', getAlloficios  ); 
   router.get('/getOficio_by_id_oficio/:id_oficios', getOficio_by_id_oficio  ); 
   router.get('/:id/:id_usuario', getRegByIdoficios  ); 
   router.post('/',    newoficios     ); 
   router.put('/upd', updoficios     ); 
   router.delete('/del/:id/:id_usuario', deloficios     ); 
   router.post('/file/:ruta/:id_gestion_oficios', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/gestion_oficios/oficios/${ruta}/${file}`}); 
   }); 

export default router;