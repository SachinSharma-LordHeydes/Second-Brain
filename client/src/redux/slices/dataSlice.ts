import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface dataState{
    data:{
        title: string
        link: string
        type: string
        _id:string
        shareable:boolean
    }[],
    currentType:string
}

const initialState: dataState = {
    data: [],
    currentType:'tweets'
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
        }
    }

});

export const { setData , setCurrentType } = dataSlice.actions;
export default dataSlice.reducer;
