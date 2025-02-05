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
exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body'
            });
        }
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        const createUserResponse = yield userModel_1.default.create({
            userName,
            password: hashedPassword
        });
        return res.status(200).json({
            success: true,
            message: 'User successfully signed up',
            userName
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'error while sign up',
            error: error.message
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({
                success: false,
                message: 'Invalid request body'
            });
        }
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        const isValidUser = yield userModel_1.default.findOne({ userName });
        if (!isValidUser) {
            return res.status(500).json({
                message: "Invalid User",
                success: false
            });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, isValidUser.password);
        console.log('Hashed password:', isValidPassword);
        if (!isValidPassword) {
            return res.status(500).json({
                message: "Invalid Password",
                success: false
            });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return res.status(500).json({
                message: "JWT_SECRET is unavilabe",
                success: false
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: isValidUser._id
        }, JWT_SECRET);
        return res.status(201).json({
            success: true,
            message: 'User successfully signed in',
            token
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'error while sign in',
            error: error.message
        });
    }
});
exports.signIn = signIn;
