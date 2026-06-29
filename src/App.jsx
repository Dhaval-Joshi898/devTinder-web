import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Chat from "./Components/Chat";
import Posts from "./Components/Posts";
import PostCard from "./Components/PostCard";
import PostComments from "./Components/PostComments";
import Notifications from "./Components/Notifications";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* below are children routes in body we will be using Outlet to based on req redner component */}
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections/>} />
              <Route path="/requests" element={<Requests/>} />
              <Route path="/chat/:targetUserId" element={<Chat/>} />

              {/* 4 may */}
              <Route path="/posts" element={<Posts/>} />
              <Route path="/postcomments/:postId" element={<PostComments/>} />
              <Route path="/notifications" element={<Notifications/>} />
             
              
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

//user connections get,user requests recieved ,accept reject post api on request recieved