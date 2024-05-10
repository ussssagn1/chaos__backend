"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CheckAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
        }
        catch (e) {
            return res.json({
                message: 'Нет доступа.'
            });
        }
    }
    else {
        return res.json({
            message: 'Нет доступа.'
        });
    }
};
exports.CheckAuth = CheckAuth;
