import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        addConnectionList:(state,action)=>{
            return action.payload;
        },

        removeConnectionList:((state,action)=>null)
    }
})

export const  {addConnectionList,removeConnectionList}=connectionSlice.actions;

export default connectionSlice.reducer;
