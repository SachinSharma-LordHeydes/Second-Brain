import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        minLength:3,
        maxLength:25,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minLength:3,
        maxLength:124,
    }
    
})

const UserModel= mongoose.model("UserModel",userSchema)

export default UserModel;