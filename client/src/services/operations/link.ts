import { AppDispatch } from "../../redux/store"
import { apiConnect } from "../apiConnect";
import { linkEndpoint } from "../apis";
import toast from "react-hot-toast";


const {GET_LINK}=linkEndpoint

export const getHash=()=>{
    return async(dispatch:AppDispatch)=>{
        try {
            const config = {
                method: "POST" as "POST",
                url: GET_LINK,
              };
            const getLinkResponse=await apiConnect(config);
            console.log("Get Link Response-->",getLinkResponse);
            const link = import.meta.env.VITE_FRONTEND_URL
            const hash = getLinkResponse.data.data.hash;
            const fullLink = `${link}share/${hash}`;

                // Copy the full link to the clipboard
            await navigator.clipboard.writeText(fullLink);
            if(getLinkResponse){
                toast.success("Shareable Link copied");
            }
            console.log("Link copied to clipboard:", fullLink);
        } catch (error:any) {
            console.log("Error occured while adding Content",error)
            console.error(error.message)
            toast.error("Unable to copy shareable Link");
        }
    }
}