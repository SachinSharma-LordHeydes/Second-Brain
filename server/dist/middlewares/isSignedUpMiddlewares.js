"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignedUpMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isSignedUpMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(403).json({
                message: "Authorization header missing",
            });
        }
        const token = header.replace("Bearer ", "");
        console.log("token--->", token);
        const JWT_SECRET = process.env.JWT_SECRET;
        console.log("JWT_SECRET--->", JWT_SECRET);
        if (!JWT_SECRET) {
            return res.status(500).json({
                message: "JWT secret not found",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("decoded--->", decoded);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next();
        }
        else {
            console.log("Yes");
            return res.status(403).json({
                message: "Invalid token or user ID",
            });
        }
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(403).json({
                message: "Invalid or expired token",
            });
        }
        console.error("Error in isSignedUpMiddleware:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});
exports.isSignedUpMiddleware = isSignedUpMiddleware;
