import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface data{
    title: string
    link: string
    type: string
    _id:string
    shareable:boolean
}

interface dataState{
    data:data[]
    currentType:string,
    linkData:data[]
}

const initialState: dataState = {
    data: [],
    currentType:'tweets',
    linkData:[],
  };
  

const dataSlice=createSlice({
    name:'data',
    initialState,
    reducers:{
        setData:(state,action:PayloadAction<any>)=>{
            state.data=action.payload.data
        },
        setCurrentType:(state,action:PayloadAction<any>)=>{
            console.log("clicked Type-->",action.payload)
            state.currentType=action.payload
        },
        setLinkData:(state,action:PayloadAction<any>)=>{
            state.linkData=action.payload.data
        },
    }

});

export const { setData , setCurrentType , setLinkData } = dataSlice.actions;
export default dataSlice.reducer;
