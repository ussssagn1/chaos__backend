import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

export const CheckAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
            (req as any).userId = decoded.id;
            next();
        } catch (e) {
            return res.json({
                message: 'Нет доступа.'
            });
        }
    } else {
        return res.json({
            message: 'Нет доступа.'
        });
    }
};
