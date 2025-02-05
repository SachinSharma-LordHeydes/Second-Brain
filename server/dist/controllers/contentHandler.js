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
exports.deleteContentHandler = exports.getContentHandler = exports.postContentHandler = void 0;
const contentModel_1 = __importDefault(require("../models/contentModel"));
const postContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body) {
            return res.status(403).json({
                success: false,
                message: "Request body is not present"
            });
        }
        console.log("req,body--->", req.body);
        const { link, type, tags, title } = req.body;
        if (!link || !type || !title) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: link, types, or tags",
            });
        }
        const newContent = yield contentModel_1.default.create({
            link,
            type,
            title,
            userId: req.userId
        });
        if (!newContent) {
            return res.status(400).json({
                success: false,
                message: "unable to add Content",
            });
        }
        console.log("newContent--->", newContent);
        return res.status(201).json({
            success: true,
            message: "Content created successfully",
            data: newContent,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in postContentHandler:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
        console.error("Unknown error in postContentHandler:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.postContentHandler = postContentHandler;
const getContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        console.log("req--->", req.userId);
        console.log("UserId--->", userId);
        const getContentResponse = yield contentModel_1.default.find({ userId }).populate("userId", "userName");
        console.log("getuserResponse", getContentResponse);
        return res.status(200).json({
            success: true,
            message: "Successfully Fetched Content",
            data: getContentResponse
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in getContentHandler:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
        console.error("Unknown error in getContentHandler:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getContentHandler = getContentHandler;
const deleteContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.body;
        console.log("req--->", req.userId);
        const deleteContentResponse = yield contentModel_1.default.findByIdAndDelete({ _id: contentId });
        console.log(deleteContentResponse);
        return res.status(200).json({
            success: true,
            message: "Successfully deleted Content",
            data: deleteContentResponse
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error in deleteContentHandler:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
        console.error("Unknown error in deleteContentHandler:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.deleteContentHandler = deleteContentHandler;
