import mongoose from "mongoose";

export const dbConnect=async()=>{
    try {
        const DB_URL:string | undefined = process.env.DB_URL;

        console.log("bd utl------>",DB_URL)
        
        if (!DB_URL) {
            throw new Error("DB_URL is not defined in the environment variables");
        }

        const DbResponse=await mongoose.connect(DB_URL);
        
        if(DbResponse){
            console.log("Database Connected Succesfully")
        }
    } catch (error) {
        console.log("Error occured while connecting to Database------->",error)
    }
}