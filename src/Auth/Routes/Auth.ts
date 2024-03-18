import express, {Router} from "express";
import {getLoginController, getMeController, getRegisterController} from "../Controllers/authController";
import {CheckAuth} from "../../middlewares/checkAuth";

export const getAuthRouter = () => {
    const authRouter = express.Router();

    // Register
    authRouter.post('/register', getRegisterController)

    // Login
    authRouter.post('/login', getLoginController)

    // Get me
    authRouter.get('/me', CheckAuth, getMeController)
    return authRouter;
}