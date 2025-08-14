import {Router} from 'express'; 
import {getRegByIdusers_opdm, getAllusers_opdm,newusers_opdm,loginUser,updusers_opdm,delusers_opdm} from '../controllers/users_opdm';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_usuarios_opdm} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_usuarios_opdm;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/usuarios_opdm/users_opdm/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllusers_opdm/:id_usuario', getAllusers_opdm  ); 
   router.get('/:id/:id_usuario', getRegByIdusers_opdm  ); 
   router.post('/',    newusers_opdm     ); 
   router.post('/login', loginUser);
   router.put('/upd', updusers_opdm     ); 
   router.delete('/del/:id/:id_usuario', delusers_opdm     ); 
   router.post('/file/:ruta/:id_usuarios_opdm', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/usuarios_opdm/users_opdm/${ruta}/${file}`}); 
   }); 

export default router;