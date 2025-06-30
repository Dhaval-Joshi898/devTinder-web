import { createSlice } from "@reduxjs/toolkit";


const logoutSlice = createSlice({
  name: "logout",
  initialState: false,
  reducers: {
    isLogout:(state,action)=>{
        return action.payload;
    }
  },
});

export const {isLogout} = logoutSlice.actions;

export default logoutSlice.reducer;
