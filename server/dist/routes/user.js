"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/users', user_1.getUsuarios);
router.get('/:id', user_1.getUsuario);
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser);
router.post('/params', user_1.params);
router.put('/updC', user_1.updUser);
router.delete('/delC/:id', validate_token_1.default, user_1.delUser);
exports.default = router;
