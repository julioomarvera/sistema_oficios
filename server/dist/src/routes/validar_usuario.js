"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_opdm_1 = require("../controllers/users_opdm");
const router = (0, express_1.Router)();
router.post('/validatPass', users_opdm_1.validatPass);
router.post('/actualizarPass', users_opdm_1.actualizarPass);
exports.default = router;
