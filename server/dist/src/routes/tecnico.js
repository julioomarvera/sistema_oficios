"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tecnico_1 = require("../controllers/tecnico");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_seguimiento_tecnico } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_seguimiento_tecnico;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/seguimiento_tecnico/tecnico/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAlltecnico/:id_usuario', tecnico_1.getAlltecnico);
router.get('/get_oficio_tecnico_by_id_gestion_oficio_id_oficios/:id_gestion_oficio/:id_oficios', tecnico_1.get_oficio_tecnico_by_id_gestion_oficio_id_oficios);
router.get('/:id/:id_usuario', tecnico_1.getRegByIdtecnico);
router.post('/', tecnico_1.newtecnico);
router.put('/upd', tecnico_1.updtecnico);
router.delete('/del/:id/:id_usuario', tecnico_1.deltecnico);
router.post('/file/:ruta/:id_seguimiento_tecnico', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/seguimiento_tecnico/tecnico/${ruta}/${file}` });
});
exports.default = router;
