"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../Controllers/authController");
const checkAuth_1 = require("../../middlewares/checkAuth");
const getAuthRouter = () => {
    const authRouter = express_1.default.Router();
    // Register
    authRouter.post('/register', authController_1.getRegisterController);
    // Login
    authRouter.post('/login', authController_1.getLoginController);
    // Get me
    authRouter.get('/me', checkAuth_1.CheckAuth, authController_1.getMeController);
    return authRouter;
};
exports.getAuthRouter = getAuthRouter;
