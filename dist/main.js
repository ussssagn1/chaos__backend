"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dataBase_1 = require("./repositories/dataBase");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const PORT = process.env.PORT || 3000;
const startApp = async () => {
    await (0, dataBase_1.startDB)();
    console.log('CORS ACTIVE');
    app_1.app.listen(PORT, () => {
        console.log(`Example app listening on port: http://localhost:${PORT}`);
    });
};
startApp();
