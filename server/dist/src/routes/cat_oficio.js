"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_oficio_1 = require("../controllers/cat_oficio");
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
        cb(null, `./public/catalogo/cat_oficio/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllcat_oficio/:id_usuario', cat_oficio_1.getAllcat_oficio);
router.get('/:id/:id_usuario', cat_oficio_1.getRegByIdcat_oficio);
router.post('/', cat_oficio_1.newcat_oficio);
router.put('/upd', cat_oficio_1.updcat_oficio);
router.delete('/del/:id/:id_usuario', cat_oficio_1.delcat_oficio);
exports.default = router;
