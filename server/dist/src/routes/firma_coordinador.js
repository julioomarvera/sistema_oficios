"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firma_coordinador_1 = require("../controllers/firma_coordinador");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_firma } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_firma;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/firma/firma_coordinador/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllfirma_coordinador/:id_usuario', firma_coordinador_1.getAllfirma_coordinador);
router.get('/:id/:id_usuario', firma_coordinador_1.getRegByIdfirma_coordinador);
router.post('/', firma_coordinador_1.newfirma_coordinador);
router.put('/upd', firma_coordinador_1.updfirma_coordinador);
router.delete('/del/:id/:id_usuario', firma_coordinador_1.delfirma_coordinador);
router.post('/file/:ruta/:id_firma', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/firma/firma_coordinador/${ruta}/${file}` });
});
exports.default = router;
