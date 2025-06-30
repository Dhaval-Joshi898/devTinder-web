import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import logoutReducer from "./logoutSlice"
import feedReducer from "./feedSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        logout:logoutReducer,
        feed:feedReducer
    }
})

export default appStore;