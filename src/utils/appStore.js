import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import logoutReducer from "./logoutSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        logout:logoutReducer,
        feed:feedReducer,
        connections:connectionReducer
    }
})

export default appStore;