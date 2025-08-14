import {Router} from 'express'; 
import {getRegByIdcat_destinatario, getAllcat_destinatario,getregistro_destinatarioByid_gestion_oficios,
       get_id_gestion_oficiosByArea,newcat_destinatario,updcat_destinatario,cancelarDestinatario,
       delcat_destinatario,ccp_destinatario,actualizarEstatusDestinatario,getEstatusDestinatario} from '../controllers/cat_destinatario';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_registro_destinatario} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_registro_destinatario;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/registro_destinatario/cat_destinatario/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_destinatario/:id_usuario', getAllcat_destinatario  ); 
   router.get('/getregistro_destinatarioByid_gestion_oficios/:id_gestion_oficios', getregistro_destinatarioByid_gestion_oficios  ); 
   router.get('/ccp_destinatario/:id_cat_destinatario/:id_gestion_oficios', ccp_destinatario  ); 
   router.get('/get_id_gestion_oficiosByArea/:id_direcion/:id_area/:estatus', get_id_gestion_oficiosByArea  ); 
   router.get('/cancelarDestinatario/:id_cat_destinatario/:id_gestion_oficios', cancelarDestinatario     );
   router.get('/actualizarEstatusDestinatario/:id_gestion_oficios/:id_direccion/:id_area/:estatus', actualizarEstatusDestinatario     );
   router.get('/getEstatusDestinatario/:id_gestion_oficios/:id_direccion/:id_area', getEstatusDestinatario     );
   
  
   router.get('/:id/:id_usuario', getRegByIdcat_destinatario  ); 
   router.post('/',    newcat_destinatario     ); 
   router.put('/upd', updcat_destinatario     ); 

   router.delete('/del/:id/:id_usuario', delcat_destinatario     ); 
   router.post('/file/:ruta/:id_registro_destinatario', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/registro_destinatario/cat_destinatario/${ruta}/${file}`}); 
   }); 

export default router;