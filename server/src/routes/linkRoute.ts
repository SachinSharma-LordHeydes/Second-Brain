import { Router } from "express";
import { isSignedUpMiddleware } from "../middlewares/isSignedUpMiddlewares";
import { createLinkHandler, getLinkDetailHandler } from "../controllers/linkHandler";


const linkRoute=Router();

linkRoute.post("/link",isSignedUpMiddleware,createLinkHandler);
linkRoute.get("/link/:hash",isSignedUpMiddleware,getLinkDetailHandler);

export default linkRoute