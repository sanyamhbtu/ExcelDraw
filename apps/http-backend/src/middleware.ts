import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from '@repo/backend-common/config'

export const middleware = (req: Request,res: Response,next: NextFunction) =>{
    const authHeader  = req.headers['authorization'] || '';
    console.log("authHeader",authHeader);
    if( !authHeader|| !authHeader.startsWith("Bearer ")){
        res.status(401).json({
            message : "Invalid token"
        })
        return;
    }
    try {
        const token = authHeader.split(" ")[1];
        console.log("token",token)
        if (!token) {
             res.status(401).json({
                message: "Token missing",
            });
            return;
        }
        const decoded = jwt.verify(token,JWT_SECRET) as {userId : string};
        console.log("decoded",decoded)
        if(!decoded || !decoded.userId){
             res.status(401).json({
                message: "Invalid decoded"
            })
            return;
        }
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: 'Unauthorized'
        });
        return;
    }
}