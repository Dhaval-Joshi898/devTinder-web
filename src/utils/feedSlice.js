import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeedData:(state,action)=>{
            return action.payload
        },
        removeFeed:(state,action)=>{
            const newArrState=state.filter((user)=>user._id!=action.payload) //in paylaod (_id) i will be apssing id
            return newArrState;
        }
    }
})

export const {addFeedData,removeFeed}=feedSlice.actions;

export default feedSlice.reducer;