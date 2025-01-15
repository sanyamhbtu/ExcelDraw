import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const middleware = (req: Request,res: Response,next: NextFunction) =>{
    const token = req.headers['authorization'] || '';
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
}