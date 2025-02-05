"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tagsModel_1 = __importDefault(require("./tagsModel"));
const userModel_1 = __importDefault(require("./userModel"));
const contentSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['tweets', 'videos', 'documents', 'links', 'tags'],
        requires: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: mongoose_1.default.Types.ObjectId,
        ref: tagsModel_1.default,
        // required:true
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: userModel_1.default,
        required: true
    }
});
const contentModel = mongoose_1.default.model("contentModel", contentSchema);
exports.default = contentModel;
