import { createSlice } from "@reduxjs/toolkit";

const requestsSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequestsList:(state,action)=>{
           return  action.payload;
        },

        removeRequestList:(state,action)=>{
                const newReqList=state.filter((req)=>req._id!==action.payload) //in paylaod i am passing id only
                return newReqList;
        }
    }
})


export const {addRequestsList,removeRequestList}=requestsSlice.actions;

export default requestsSlice.reducer;