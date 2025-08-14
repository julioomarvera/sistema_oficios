import {Router} from 'express'; 
import {getRegByIdcat_firmante, getAllcat_firmante, getcat_firmanteByid_gestion_oficios,cancelFirmante,
       getregistro_quien_firma_by_id_gestion_oficios, newcat_firmante,updcat_firmante,delcat_firmante} from '../controllers/cat_firmante';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_registro_quien_firma} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_registro_quien_firma;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/registro_quien_firma/cat_firmante/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_firmante/:id_usuario', getAllcat_firmante  ); 
   router.get('/getcat_firmanteByid_gestion_oficios/:id_gestion_oficios', getcat_firmanteByid_gestion_oficios );
   router.get('/cancelFirmante/:id_gestion_oficios', cancelFirmante );
   router.post('/',    newcat_firmante     ); 
   router.put('/upd', updcat_firmante     ); 
   router.get('/:id/:id_usuario', getRegByIdcat_firmante  ); 
   router.delete('/del/:id/:id_usuario', delcat_firmante     ); 
   router.post('/file/:ruta/:id_registro_quien_firma', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/registro_quien_firma/cat_firmante/${ruta}/${file}`}); 
   }); 

export default router;