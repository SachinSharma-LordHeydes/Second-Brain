import mongoose from "mongoose";
import UserMOdel from "./userModel";

const linksSchema =new mongoose.Schema({
    hash:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:UserMOdel,
        required:true
    }
})

const linksModel=mongoose.model("linksMOdel",linksSchema);
export default linksModel