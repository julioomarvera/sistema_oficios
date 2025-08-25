"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_areas_1 = require("../controllers/cat_areas");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_catalogo_areas } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_catalogo_areas;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/catalogo_areas/cat_areas/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllcat_areas/:id_usuario', cat_areas_1.getAllcat_areas);
router.get('/:id/:id_usuario', cat_areas_1.getRegByIdcat_areas);
router.post('/', cat_areas_1.newcat_areas);
router.put('/upd', cat_areas_1.updcat_areas);
router.delete('/del/:id/:id_usuario', cat_areas_1.delcat_areas);
router.post('/file/:ruta/:id_catalogo_areas', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/catalogo_areas/cat_areas/${ruta}/${file}` });
});
exports.default = router;
