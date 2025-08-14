"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    filename: function (res, file, cb) {
        const { id_user } = res.params;
        const ext = file.originalname.split('.').pop();
        const fileName = id_user;
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const { ruta } = res.params;
        cb(null, `./public/user/users/${ruta}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get('/getAllusers/:id_usuario', users_1.getAllusers);
router.post('/login', users_1.getRegByIdusers);
router.post('/', users_1.newusers);
router.put('/upd', users_1.updusers);
router.delete('/del/:id/:id_usuario', users_1.delusers);
router.post('/file/:ruta/:id_user', upload.single('myfile'), (req, resp) => {
    var _a;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const { ruta } = req.params;
    resp.send({ data: 'OK', url: `http://localhost:3001/user/users/${ruta}/${file}` });
});
exports.default = router;
