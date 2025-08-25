import {Router} from 'express'; 
import {getRegByIdfirma_coordinador, getAllfirma_coordinador,newfirma_coordinador,updfirma_coordinador,delfirma_coordinador} from '../controllers/firma_coordinador';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_firma} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_firma;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/firma/firma_coordinador/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllfirma_coordinador/:id_usuario', getAllfirma_coordinador  ); 
   router.get('/:id/:id_usuario', getRegByIdfirma_coordinador  ); 
   router.post('/',    newfirma_coordinador     ); 
   router.put('/upd', updfirma_coordinador     ); 
   router.delete('/del/:id/:id_usuario', delfirma_coordinador     ); 
   router.post('/file/:ruta/:id_firma', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/firma/firma_coordinador/${ruta}/${file}`}); 
   }); 

export default router;