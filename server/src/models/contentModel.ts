import mongoose from "mongoose";
import tagsModel from "./tagsModel";
import UserModel from "./userModel";

const contentSchema=new mongoose.Schema({
    link:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['tweets', 'videos', 'documents', 'links', 'tags'],
        requires:true
    },
    title:{
        type:String,
        required:true
    },
    shareable:{
        type:Boolean,
        default:false
    },
    tags:{
        type:mongoose.Types.ObjectId,
        ref:tagsModel,
        // required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:UserModel,
        required:true
    }
})

const contentModel=mongoose.model("contentModel",contentSchema);

export default contentModel;