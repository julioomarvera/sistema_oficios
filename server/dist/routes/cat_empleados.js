"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_empleados_1 = require("../controllers/cat_empleados");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_catalogo_empleados } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_catalogo_empleados;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/catalogo_empleados/cat_empleados/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllcat_empleados/:id_usuario', cat_empleados_1.getAllcat_empleados);
router.get('/get_coordinador_empleados/:id', cat_empleados_1.get_coordinador_empleados);
router.get('/getAllcat_empleadosByDireccionAreas/:id_direccion/:id_area', cat_empleados_1.getAllcat_empleadosByDireccionAreas);
router.post('/', cat_empleados_1.newcat_empleados);
router.put('/upd', cat_empleados_1.updcat_empleados);
router.delete('/del/:id/:id_usuario', cat_empleados_1.delcat_empleados);
router.get('/:id/:id_usuario', cat_empleados_1.getRegByIdcat_empleados);
router.post('/file/:ruta/:id_catalogo_empleados', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/catalogo_empleados/cat_empleados/${ruta}/${file}` });
});
exports.default = router;
