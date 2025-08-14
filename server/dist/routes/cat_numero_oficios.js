"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_numero_oficios_1 = require("../controllers/cat_numero_oficios");
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
        cb(null, `./public/catalogo/cat_numero_oficios/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllcat_numero_oficios/:id_usuario', cat_numero_oficios_1.getAllcat_numero_oficios);
router.get('/get_seguimiento_numero_oficios/:id_usuario', cat_numero_oficios_1.get_seguimiento_numero_oficios);
router.get('/:id/:id_usuario', cat_numero_oficios_1.getRegByIdcat_numero_oficios);
router.post('/', cat_numero_oficios_1.newcat_numero_oficios);
router.put('/upd', cat_numero_oficios_1.updcat_numero_oficios);
router.delete('/del/:id/:id_usuario', cat_numero_oficios_1.delcat_numero_oficios);
exports.default = router;
