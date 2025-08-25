"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_firmante_1 = require("../controllers/cat_firmante");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_registro_quien_firma } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_registro_quien_firma;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/registro_quien_firma/cat_firmante/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllcat_firmante/:id_usuario', cat_firmante_1.getAllcat_firmante);
router.get('/getcat_firmanteByid_gestion_oficios/:id_gestion_oficios', cat_firmante_1.getcat_firmanteByid_gestion_oficios);
router.get('/cancelFirmante/:id_gestion_oficios', cat_firmante_1.cancelFirmante);
router.post('/', cat_firmante_1.newcat_firmante);
router.put('/upd', cat_firmante_1.updcat_firmante);
router.get('/:id/:id_usuario', cat_firmante_1.getRegByIdcat_firmante);
router.delete('/del/:id/:id_usuario', cat_firmante_1.delcat_firmante);
router.post('/file/:ruta/:id_registro_quien_firma', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/registro_quien_firma/cat_firmante/${ruta}/${file}` });
});
exports.default = router;
