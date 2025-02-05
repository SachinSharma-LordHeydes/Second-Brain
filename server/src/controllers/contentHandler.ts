import  {Request,Response}  from "express"
import contentModel from "../models/contentModel";

export const postContentHandler=async(req:Request,res:Response)=>{
    try {
        if(!req.body){
            return res.status(403).json({
                success:false,
                message:"Request body is not present"
            })
        }
        console.log("req,body--->",req.body)
        const {link,type,tags,title}=req.body;

        if (!link || !type || !title) {
            return res.status(400).json({
                success:false,
                message: "Missing required fields: link, types, or tags",
            });
        }


        const newContent = await contentModel.create({
            link,
            type,
            title,
            userId:req.userId
        })

        if (!newContent) {
            return res.status(400).json({
                success:false,
                message: "unable to add Content",
            });
        }

        console.log("newContent--->",newContent)

        return res.status(201).json({
            success:true,
            message: "Content created successfully",
            data: newContent,
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in postContentHandler:", error.message);
            return res.status(500).json({
                success:false,
                message: "Internal server error",
            });
        }

        console.error("Unknown error in postContentHandler:", error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
}

export const getContentHandler=async(req:Request,res:Response)=>{
    try {
        const {userId}=req;
        console.log("req--->",req.userId)
        console.log("UserId--->",userId)
        const getContentResponse=await contentModel.find({userId}).populate("userId","userName")
        console.log("getuserResponse",getContentResponse)
        return res.status(200).json({
            success:true,
            message:"Successfully Fetched Content",
            data:getContentResponse
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in getContentHandler:", error.message);
            return res.status(500).json({
                success:false,
                message: "Internal server error",
            });
        }

        console.error("Unknown error in getContentHandler:", error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
}

export const deleteContentHandler=async(req:Request,res:Response)=>{
    try {
        const {contentId}=req.body;
        console.log("BE content ID-->",req.body)
        console.log("req--->",req.userId)
        const deleteContentResponse=await contentModel.findByIdAndDelete({_id:contentId})
        console.log(deleteContentResponse)
        return res.status(200).json({
            success:true,
            message:"Successfully deleted Content",
            data:deleteContentResponse
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in deleteContentHandler:", error.message);
            return res.status(500).json({
                success:false,
                message: "Internal server error",
            });
        }

        console.error("Unknown error in deleteContentHandler:", error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
}

export const changeShareableContentHandler=async(req:Request,res:Response)=>{
    try {
        const {shareable,contentId}=req.body;
        console.log("request body--->",req.body)
        if(!contentId){
            return res.status(500).json({
                success:false,
                message:"Content Id is unavulabe for updating shareable content"
            })
        }
        const updateShareableResponse=await contentModel.findByIdAndUpdate(contentId,{shareable},{new:true})
        return res.status(200).json({
            success:true,
            message:"shareable Content set Successfully ",
            data:updateShareableResponse
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in updating shareable content:", error.message);
            return res.status(500).json({
                success:false,
                message: "Internal server error",
            });
        }

        console.error("Unknown error in updating shareable content:", error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
}

export const getSharableContentHandler=async(req:Request,res:Response)=>{
    try {
        const shareableContentResponse=await contentModel.find({shareable:true});
        return res.status(200).json({
            success:true,
            message:"Succcessfully Fetched shareable Content",
            data:shareableContentResponse
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in fetching shareable content:", error.message);
            return res.status(500).json({
                success:false,
                message: "Internal server error",
            });
        }

        console.error("Unknown error in fetching shareable content:", error);
        return res.status(500).json({
            success:false,
            message: "Internal server error",
        });
    }
}