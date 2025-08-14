"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oficios_1 = require("../controllers/oficios");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_gestion_oficios } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_gestion_oficios;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/gestion_oficios/oficios/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAlloficios/:id_usuario', oficios_1.getAlloficios);
router.get('/getOficio_by_id_oficio/:id_oficios', oficios_1.getOficio_by_id_oficio);
router.get('/:id/:id_usuario', oficios_1.getRegByIdoficios);
router.post('/', oficios_1.newoficios);
router.put('/upd', oficios_1.updoficios);
router.delete('/del/:id/:id_usuario', oficios_1.deloficios);
router.post('/file/:ruta/:id_gestion_oficios', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/gestion_oficios/oficios/${ruta}/${file}` });
});
exports.default = router;
