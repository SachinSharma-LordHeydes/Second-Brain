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
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DB_URL = process.env.DB_URL;
        console.log("bd utl------>", DB_URL);
        if (!DB_URL) {
            throw new Error("DB_URL is not defined in the environment variables");
        }
        const DbResponse = yield mongoose_1.default.connect(DB_URL);
        if (DbResponse) {
            console.log("Database Connected Succesfully");
        }
    }
    catch (error) {
        console.log("Error occured while connecting to Database------->", error);
    }
});
exports.dbConnect = dbConnect;
