"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userHandler_1 = require("../controllers/userHandler");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', userHandler_1.signUp);
userRouter.post('/signin', userHandler_1.signIn);
exports.default = userRouter;
