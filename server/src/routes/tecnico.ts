import {Router} from 'express'; 
import {getRegByIdtecnico, getAlltecnico,get_oficio_tecnico_by_id_gestion_oficio_id_oficios,newtecnico,updtecnico,deltecnico} from '../controllers/tecnico';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_seguimiento_tecnico} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_seguimiento_tecnico;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/seguimiento_tecnico/tecnico/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAlltecnico/:id_usuario', getAlltecnico  ); 
   router.get('/get_oficio_tecnico_by_id_gestion_oficio_id_oficios/:id_gestion_oficio/:id_oficios', get_oficio_tecnico_by_id_gestion_oficio_id_oficios  ); 
   router.get('/:id/:id_usuario', getRegByIdtecnico  ); 
   router.post('/',    newtecnico     ); 
   router.put('/upd', updtecnico     ); 
   router.delete('/del/:id/:id_usuario', deltecnico     ); 
   router.post('/file/:ruta/:id_seguimiento_tecnico', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/seguimiento_tecnico/tecnico/${ruta}/${file}`}); 
   }); 

export default router;