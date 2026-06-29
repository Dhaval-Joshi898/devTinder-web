import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import logoutReducer from "./logoutSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionSlice"
import requestsReducer from "./requestsSlice"
import postsReducer from "./postsSlice"
import commentReducer from "./commentsSlice"
import notificationReducer from "./notificationSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        logout:logoutReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestsReducer,
        posts:postsReducer, 
        comments:commentReducer,
        notifications:notificationReducer
    }
})

export default appStore;