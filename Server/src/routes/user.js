"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const userController_1 = require("../controllers/userController");
//limit
const postLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 1,
    message: 'Слишком много запросов. Попробуйте снова через минуту.',
    standardHeaders: true,
    legacyHeaders: false,
});
//
const router = express_1.default.Router();
router.post('/adduser', postLimiter, userController_1.addUser);
router.get('/getusers', userController_1.getAllUsers);
router.delete('/deleteuser/:id', userController_1.deleteUser);
exports.default = router;
