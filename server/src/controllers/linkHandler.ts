import { Request,Response } from "express"
import { randomString } from "../utils/randomString";
import linksModel from "../models/linksModel";
import contentModel from "../models/contentModel";

export const createLinkHandler =async(req:Request,res:Response)=>{
    try {
        const {userId}=req;
        // const {share}=req.body

        
        // if(!share){
        //     const deleteLink=await linksModel.findOneAndDelete({userId});
            
        //     return res.status(200).json({
        //         message:"Share is False",
        //         data:deleteLink
        //     }) 
        // }
        
        const doesLinkAlreadyExists=await linksModel.findOne({userId});

        if(doesLinkAlreadyExists){
            return res.status(200).json({
                message:"Existed Link",
                data:doesLinkAlreadyExists
            }) 
        }

        const hash:string=randomString(8)
        console.log("hash-->",hash)
        const createLinkResponse=await linksModel.create({
            userId,
            hash
        })

        return res.status(200).json({
            message:"Link created Successfully",
            data:createLinkResponse
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'error while creating Link',
        });
    }
}
export const getLinkDetailHandler = async (req: Request, res: Response) => {
    try {
        const { hash } = req.params;
        console.log("hash-->", hash);
        const getLinkDetailResponse = await linksModel.findOne({ hash }).populate('userId');
        
        if (!getLinkDetailResponse) {
            return res.status(404).json({
                success: false,
                message: 'Link not found',
            });
        }
        
        const getDetailResponse = await contentModel.find({ userId: getLinkDetailResponse.userId , shareable:true });

        if (!getDetailResponse) {
            return res.status(404).json({
                success: false,
                message: 'Content not found for this link',
            });
        }

        return res.status(200).json({
            success: true,
            message: "Link found successfully",
            data: getDetailResponse
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching link data',
        });
    }
};
