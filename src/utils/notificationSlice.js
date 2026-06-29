import { createSlice } from "@reduxjs/toolkit";

const notificationSlice=createSlice({
    name:"notifications",
    initialState:{
        notifications:[]
    },
    reducers:{
        addNotification:(state,action)=>{
            state.notifications=action.payload;
        }
    }
})

export const {addNotification} = notificationSlice.actions

export default notificationSlice.reducer