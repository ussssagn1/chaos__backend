import express, {Router} from "express";
import {getLoginController, getMeController, getRegisterController} from "../Controllers/authController";

export const getAuthRouter = () => {
    const authRouter = express.Router();

    // Register
    authRouter.post('/register', getRegisterController)

    // Login
    authRouter.post('/login', getLoginController)

    // Get me
    authRouter.get('/me', getMeController)
    return authRouter;
}