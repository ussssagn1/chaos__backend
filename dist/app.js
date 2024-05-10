"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonBodyMiddleware = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const HeadPhonesRouter_1 = require("./Routing/HeadPhonesRouter");
const Auth_1 = require("./Auth/Routes/Auth");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.jsonBodyMiddleware = express_1.default.json();
exports.app.use((0, cors_1.default)());
exports.app.use(exports.jsonBodyMiddleware);
const authRouter = (0, Auth_1.getAuthRouter)();
exports.app.use('/api/auth', authRouter);
const headphonesRouter = (0, HeadPhonesRouter_1.getHeadphonesRouter)();
exports.app.use('/headphones', headphonesRouter);
