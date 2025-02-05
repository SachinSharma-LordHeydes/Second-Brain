import { Dispatch } from "@reduxjs/toolkit";
import { apiConnect } from "../apiConnect";
import { authEndpoint } from "../apis";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";



const {SIGNUP_URL,SIGNIN_URL} = authEndpoint

// "scripts": {
  //   "build": "tsc -b",
  //   "start": "node ./dist/index.js",
  //   "dev": "nodemon --ext ts --exec ts-node src/index.ts"
  // },


export const signUpOperation = (data: { userName: string; password: string },navigate:NavigateFunction) => {
    return async (dispatch: Dispatch) => {
      try {
        console.log(data)
        const config = {
          method: "POST" as "POST",
          url: SIGNUP_URL,
          data: data, 
        };
  
        const signUpResponse = await apiConnect(config);
        

        console.log(signUpResponse)
        navigate('/signIn')
        toast.success("Signed Up Successfully")
      } catch (error:any) {
        console.error(error)
        console.log("Error occured while signUp--->",error)
        toast.error("Unable to Siging Up")
      }
    };
  };



export const signInOperation = (data: { userName: string; password: string },navigate:NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {

      const config = {
        method: "POST" as "POST",
        url: SIGNIN_URL,
        data: data, 
      };

      const signinResponse = await apiConnect(config);
      
      console.log(signinResponse)
      localStorage.setItem("token", JSON.stringify(signinResponse.data.token));
      navigate('/dashboard')
      toast.success("Signed In Successfully")
    } catch (error) {
        console.log("Error occured while signIn--->",error)
        toast.error("Unable to Siging In")
    }
  };
};
