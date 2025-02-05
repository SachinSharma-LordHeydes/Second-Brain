"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isSignedUpMiddlewares_1 = require("../middlewares/isSignedUpMiddlewares");
const mongoose_1 = require("mongoose");
const linkRoute = (0, express_1.Router)();
linkRoute.post("/link", isSignedUpMiddlewares_1.isSignedUpMiddleware, mongoose_1.createConnection);
exports.default = linkRoute;
