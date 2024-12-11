"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const speedController_1 = require("../controllers/speedController");
const router = (0, express_1.Router)();
router.get('/', speedController_1.testSpeed);
exports.default = router;
