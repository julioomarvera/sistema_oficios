"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const { ruta } = req.params;
        console.log(ruta);
        cb(null, './public/' + ruta);
    },
    filename: function (req, file, cb) {
        const { id_tramite } = req.params;
        const ext = file.originalname.split('.').pop();
        cb(null, `${id_tramite}.${ext}`);
        // cb(null, Date.now() + "--" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg') || (file.mimetype).includes('pdf')) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
let fileUpload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter, });
exports.default = fileUpload.single('myfile');
