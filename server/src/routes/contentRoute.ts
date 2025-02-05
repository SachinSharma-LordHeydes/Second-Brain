import { Router } from "express";
import { isSignedUpMiddleware } from "../middlewares/isSignedUpMiddlewares";
import { changeShareableContentHandler, deleteContentHandler, getContentHandler, getSharableContentHandler, postContentHandler } from "../controllers/contentHandler";


const contentRoute=Router();

contentRoute.post("/content",isSignedUpMiddleware,postContentHandler);
contentRoute.get("/content",isSignedUpMiddleware,getContentHandler);
contentRoute.delete("/content",isSignedUpMiddleware,deleteContentHandler);
contentRoute.post("/shareable",isSignedUpMiddleware,changeShareableContentHandler);
contentRoute.get("/shareable",isSignedUpMiddleware,getSharableContentHandler);

export default contentRoute