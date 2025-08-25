import {Router} from 'express'; 
import {getRegByIdsello, getAllsello,getselloByIdgestonOficios,
        getInformacionSello, newsello,updsello,delsello} from '../controllers/sello';
import validateToken from './validate-token';
import multer    from 'multer';
require('dotenv').config();

  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_evidencia_sello} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_evidencia_sello;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/evidencia_sello/sello/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllsello/:id_usuario', getAllsello  );
   router.get('/getselloByIdgestonOficios/:id_gestion_oficios/:id_usuario', getselloByIdgestonOficios  ); 
   router.get('/getInformacionSello/:id_gestion_oficio/:id_direccion/:id_area/:numero_empleado', getInformacionSello  ); 
   router.get('/:id/:id_usuario', getRegByIdsello  ); 
   router.post('/',    newsello     ); 
   router.put('/upd', updsello     ); 
   router.delete('/del/:id/:id_usuario', delsello     ); 
   router.post('/file/:ruta/:id_evidencia_sello', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url: process.env.URL + `evidencia_sello/sello/${ruta}/${file}`}); 
   }); 
 
export default router;