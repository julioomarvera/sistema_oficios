"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cat_direcciones_areas_1 = require("../controllers/cat_direcciones_areas");
const router = (0, express_1.Router)();
router.get('/getAreaByDireccion/:id', cat_direcciones_areas_1.getAreaByDireccion);
router.get('/getAreaByArea/:id', cat_direcciones_areas_1.getAreaByArea);
router.get('/getDireccionByNameArea/:area', cat_direcciones_areas_1.getDireccionByNameArea);
exports.default = router;
