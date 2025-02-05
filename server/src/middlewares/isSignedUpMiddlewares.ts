

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend the Request type to include userId
declare module "express" {
    interface Request {
        userId?: string; // Add userId to the Request type
    }
}

export const isSignedUpMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers["authorization"];

        if (!header) {
            return res.status(403).json({
                message: "Authorization header missing",
            });
        }

        const token = header.replace("Bearer ", "");
        console.log("token--->",token)

        const JWT_SECRET = process.env.JWT_SECRET;
        console.log("JWT_SECRET--->",JWT_SECRET)
        if (!JWT_SECRET) {
            return res.status(500).json({
                message: "JWT secret not found",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        console.log("decoded--->",decoded)

        if (decoded && decoded.id) {
            req.userId = decoded.id; 
            next(); 
        } else {
            console.log("Yes")
            return res.status(403).json({
                message: "Invalid token or user ID",
            });
        }
    } catch (error:any) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({
                message: "Invalid or expired token",
            });
        }

        console.error("Error in isSignedUpMiddleware:", error);
        return res.status(500).json({
            message: "Internal server error",
            error:error.message
        });
    }
};