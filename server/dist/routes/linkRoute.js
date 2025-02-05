"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isSignedUpMiddlewares_1 = require("../middlewares/isSignedUpMiddlewares");
const linkHandler_1 = require("../controllers/linkHandler");
const linkRoute = (0, express_1.Router)();
linkRoute.post("/link", isSignedUpMiddlewares_1.isSignedUpMiddleware, linkHandler_1.createLinkHandler);
linkRoute.get("/link/:hash", isSignedUpMiddlewares_1.isSignedUpMiddleware, linkHandler_1.getLinkDetailHandler);
exports.default = linkRoute;
