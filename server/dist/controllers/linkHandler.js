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
exports.getLinkDetailHandler = exports.createLinkHandler = void 0;
const randomString_1 = require("../utils/randomString");
const linksModel_1 = __importDefault(require("../models/linksModel"));
const createLinkHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const { share } = req.body;
        if (!share) {
            const deleteLink = yield linksModel_1.default.findOneAndDelete({ userId });
            return res.status(200).json({
                message: "Share is False",
                data: deleteLink
            });
        }
        const doesAlreadyExists = yield linksModel_1.default.findOne({ userId });
        if (doesAlreadyExists) {
            return res.status(200).json({
                message: "Existed Link",
                data: doesAlreadyExists
            });
        }
        const hash = (0, randomString_1.randomString)(8);
        console.log("hash-->", hash);
        const createLinkResponse = yield linksModel_1.default.create({
            userId,
            hash
        });
        return res.status(200).json({
            message: "Link created Successfully",
            data: createLinkResponse
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'error while creating Link',
        });
    }
});
exports.createLinkHandler = createLinkHandler;
const getLinkDetailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hash } = req.params;
        console.log("hash-->", hash);
        const getLinkDetailResponse = yield linksModel_1.default.findOne({ hash });
        return res.status(200).json({
            success: true,
            message: "Link created Successfully",
            data: getLinkDetailResponse
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'error while fetching link data',
        });
    }
});
exports.getLinkDetailHandler = getLinkDetailHandler;
