import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const{ruta} = req.params; 
        console.log(ruta);
        cb(null, './public/' + ruta);
    },
    filename: function (req, file, cb) {
        const{id_tramite} = req.params; 
        const ext = file.originalname.split('.').pop();
        cb(null,`${id_tramite}.${ext}`);
        // cb(null, Date.now() + "--" + file.originalname);
    }
});  

const fileFilter = (req:any, file:any, cb:any) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg') || (file.mimetype).includes('pdf')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};

let fileUpload = multer({ storage: storage, fileFilter: fileFilter,});

export default fileUpload.single('myfile');