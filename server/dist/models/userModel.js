"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 124,
    }
});
const UserModel = mongoose_1.default.model("UserModel", userSchema);
exports.default = UserModel;
