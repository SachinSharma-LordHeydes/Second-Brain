import mongoose from "mongoose";

const tagsSchema=new mongoose.Schema({
    title:{
        type:String
    }
})

const tagsModel=mongoose.model("tagsMode",tagsSchema);
export default tagsModel