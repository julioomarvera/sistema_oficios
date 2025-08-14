import {Router} from 'express'; 
import {getRegByIdcat_empleados, getAllcat_empleados,get_coordinador_empleados,getAllcat_empleadosByDireccionAreas,newcat_empleados,updcat_empleados,delcat_empleados} from '../controllers/cat_empleados';
import validateToken from './validate-token';
import multer    from 'multer';
  const storage = multer.diskStorage({
    filename: function (res, file, cb){
       const {id_catalogo_empleados} = res.params;  
       const ext = file.originalname.split('.').pop();
       const fileName = id_catalogo_empleados;
       cb(null,`${fileName}.${ext}`);
    },
    destination:function(res,file,cb){
       const {ruta} = res.params;
       cb(null,`./public/catalogo_empleados/cat_empleados/${ruta}`);
    },
  })
  
  const upload = multer({storage})

const router = Router(); 
   router.get('/getAllcat_empleados/:id_usuario', getAllcat_empleados  ); 
   router.get('/get_coordinador_empleados/:id', get_coordinador_empleados  ); 
   router.get('/getAllcat_empleadosByDireccionAreas/:id_direccion/:id_area', getAllcat_empleadosByDireccionAreas  );
   router.post('/',    newcat_empleados     ); 
   router.put('/upd', updcat_empleados     ); 
   router.delete('/del/:id/:id_usuario', delcat_empleados     ); 
   router.get('/:id/:id_usuario', getRegByIdcat_empleados  ); 
   router.post('/file/:ruta/:id_catalogo_empleados', upload.single('myfile'), (req,resp)=>{
      const file = req.file?.filename;
      const {ruta} = req.params;  
      resp.send({data : 'OK', url:`http://localhost:3001/catalogo_empleados/cat_empleados/${ruta}/${file}`}); 
   }); 

export default router;