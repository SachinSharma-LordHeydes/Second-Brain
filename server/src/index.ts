import express from "express";
import * as dotenv from "dotenv";
import { dbConnect } from "./utils/dbConnect";
import userRouter from "./routes/userRoute";
import contentRoute from "./routes/contentRoute";
import linkRoute from "./routes/linkRoute";
import cors from 'cors';

dotenv.config();

const app=express();

app.use(cors());

const PORT=process.env.PORT || 4000;
dbConnect();

app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", contentRoute);
app.use("/api/v1", linkRoute);
           
app.listen(PORT,()=>{
    console.log(`Server is live on PORT:${PORT}`)
});