import { Dispatch } from "@reduxjs/toolkit";
import { dataEndpoint } from "../apis";
import { apiConnect } from "../apiConnect";
import { setData } from "../../redux/slices/dataSlice";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";



const {BRAIN_DATA_URL , SHAREABLE_BRAIN_DATA_URL } = dataEndpoint

export const getBrainData =()=>{
    return async(dispatch:AppDispatch)=>{
        try {

            const config = {
                method: "GET" as "GET",
                url: BRAIN_DATA_URL,
              };

              
            const getBrainDataResponse=await apiConnect(config)
            console.log(getBrainDataResponse.data)
            dispatch(setData(getBrainDataResponse.data))

        } catch (error:any) {
            console.log("error occured while fetching data-->",error);
            error.message("error occured while fetching data-->",error.message)
        }
    }
}

export const addContent = (data: { type: string; link: string; title: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            const {type,title,link}=data;
            let embededLink=link;

            if (type.toLowerCase() === 'video' || type.toLowerCase() === 'videos'){
                const urlObj = new URL(link);
                const videoId = urlObj.searchParams.get("v");
                console.log("Video ID -->", videoId)
                embededLink=`https://www.youtube.com/embed/${videoId}`;
            }

            console.log("embed Link -->", embededLink)
            const newData={
                title,
                link:embededLink,
                type
            }
            const config = {
                method: "POST" as "POST",
                url: BRAIN_DATA_URL,
                data:newData
              };
            const addContentResponse=await apiConnect(config);
            console.log("content added response--->",addContentResponse)
            await dispatch(getBrainData())
            toast.success("Content Added Successfully")
        } catch (error:any) {
            console.log("Error occured while adding Content",error)
            console.error(error.message)
            toast.error("Error While Adding Content")
        }
    }
}

export const deleteContent = (data: { contentId: string }) => {
    return async (dispatch: AppDispatch) => {
        try {
            const {contentId}=data;
            console.log("to Delete --> ",contentId)
            const config = {
                method: "DELETE" as "DELETE",
                url: BRAIN_DATA_URL,
                data
              };
            const addContentResponse=await apiConnect(config);
            console.log(addContentResponse)
            await dispatch(getBrainData())
            toast.success("Successfully Deleted Content")
        } catch (error:any) {
            console.log("Error occured while adding Content",error)
            console.error(error.message)
            toast.error("Unable To Delete Content")
        }
    }
}

export const setShareableContent=(data:{shareable:boolean,contentId:string})=>{
    return async(dispatch:AppDispatch)=>{
        try {
            console.log("Data to setSharebleContent->",data);
            const config = {
                method: "POST" as "POST",
                url: SHAREABLE_BRAIN_DATA_URL,
                data
              };
            const shareableDataResponse=await apiConnect(config) 
            console.log("Shareable Content Response--->",shareableDataResponse)
            await dispatch(getBrainData())
            if(data.shareable){
                toast.success("Content is Visible To Others")
            }else{
                toast.success("Content is Hidden From Others")
            }
        } catch (error:any) {
            console.log("Error occured while adding Content",error)
            console.error(error.message)
            toast.error("Unable To Make Content Visible")
        }
    }
}