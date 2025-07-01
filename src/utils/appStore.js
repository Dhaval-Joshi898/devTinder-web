import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import logoutReducer from "./logoutSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestsReducer from "./requestsSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        logout:logoutReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestsReducer
    }
})

export default appStore;