"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_direcciones_1 = require("../controllers/cat_direcciones");
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
        cb(null, `./public/catalogo/cat_direcciones/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllcat_direcciones/:id_usuario', cat_direcciones_1.getAllcat_direcciones);
router.get('/:id/:id_usuario', cat_direcciones_1.getRegByIdcat_direcciones);
router.post('/', cat_direcciones_1.newcat_direcciones);
router.put('/upd', cat_direcciones_1.updcat_direcciones);
router.delete('/del/:id/:id_usuario', cat_direcciones_1.delcat_direcciones);
exports.default = router;
