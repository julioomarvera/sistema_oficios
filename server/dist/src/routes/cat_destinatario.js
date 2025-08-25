"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_destinatario_1 = require("../controllers/cat_destinatario");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_registro_destinatario } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_registro_destinatario;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/registro_destinatario/cat_destinatario/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
// router.get('/getAllcat_destinatario/:id_usuario', getAllcat_destinatario  ); 
// router.get('/getregistro_destinatarioByid_gestion_oficios/:id_gestion_oficios', getregistro_destinatarioByid_gestion_oficios  ); 
// router.get('/ccp_destinatario/:id_cat_destinatario/:id_gestion_oficios', ccp_destinatario  ); 
// router.get('/get_id_gestion_oficiosByArea/:id_direccion/:id_area/:estatus', get_id_gestion_oficiosByArea  ); 
// router.get('/cancelarDestinatario/:id_cat_destinatario/:id_gestion_oficios', cancelarDestinatario     );
// router.get('/actualizarEstatusDestinatario/:id_gestion_oficios/:id_direccion/:id_area/:estatus', actualizarEstatusDestinatario     );
// router.get('/getEstatusDestinatario/:id_gestion_oficios/:id_direccion/:id_area', getEstatusDestinatario     );
router.get('/:id/:id_usuario', cat_destinatario_1.getRegByIdcat_destinatario);
router.post('/', cat_destinatario_1.newcat_destinatario);
router.put('/upd', cat_destinatario_1.updcat_destinatario);
router.delete('/del/:id/:id_usuario', cat_destinatario_1.delcat_destinatario);
router.post('/file/:ruta/:id_registro_destinatario', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/registro_destinatario/cat_destinatario/${ruta}/${file}` });
});
exports.default = router;
