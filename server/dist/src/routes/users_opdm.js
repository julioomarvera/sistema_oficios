"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_opdm_1 = require("../controllers/users_opdm");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_usuarios_opdm } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_usuarios_opdm;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/usuarios_opdm/users_opdm/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllusers_opdm/:id_usuario', users_opdm_1.getAllusers_opdm);
router.get('/:id/:id_usuario', users_opdm_1.getRegByIdusers_opdm);
router.post('/', users_opdm_1.newusers_opdm);
router.post('/login', users_opdm_1.loginUser);
router.put('/upd', users_opdm_1.updusers_opdm);
router.delete('/del/:id/:id_usuario', users_opdm_1.delusers_opdm);
router.post('/file/:ruta/:id_usuarios_opdm', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/usuarios_opdm/users_opdm/${ruta}/${file}` });
});
exports.default = router;
