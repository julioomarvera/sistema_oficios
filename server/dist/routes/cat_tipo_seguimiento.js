"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_tipo_seguimiento_1 = require("../controllers/cat_tipo_seguimiento");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_catalogo } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_catalogo;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/catalogo/cat_tipo_seguimiento/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllcat_tipo_seguimiento/:id_usuario', cat_tipo_seguimiento_1.getAllcat_tipo_seguimiento);
router.get('/:id/:id_usuario', cat_tipo_seguimiento_1.getRegByIdcat_tipo_seguimiento);
router.post('/', cat_tipo_seguimiento_1.newcat_tipo_seguimiento);
router.put('/upd', cat_tipo_seguimiento_1.updcat_tipo_seguimiento);
router.delete('/del/:id/:id_usuario', cat_tipo_seguimiento_1.delcat_tipo_seguimiento);
exports.default = router;
