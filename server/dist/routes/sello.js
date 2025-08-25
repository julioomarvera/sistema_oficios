"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sello_1 = require("../controllers/sello");
const multer_1 = __importDefault(require("multer"));
require('dotenv').config();
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_evidencia_sello } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_evidencia_sello;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/evidencia_sello/sello/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllsello/:id_usuario', sello_1.getAllsello);
router.get('/getselloByIdgestonOficios/:id_gestion_oficios/:id_usuario', sello_1.getselloByIdgestonOficios);
router.get('/getInformacionSello/:id_gestion_oficio/:id_direccion/:id_area/:numero_empleado', sello_1.getInformacionSello);
router.get('/:id/:id_usuario', sello_1.getRegByIdsello);
router.post('/', sello_1.newsello);
router.put('/upd', sello_1.updsello);
router.delete('/del/:id/:id_usuario', sello_1.delsello);
router.post('/file/:ruta/:id_evidencia_sello', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: process.env.URL + `evidencia_sello/sello/${ruta}/${file}` });
});
exports.default = router;
