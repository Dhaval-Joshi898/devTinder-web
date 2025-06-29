import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      if (!user) {
        const userData = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        console.log(userData);
        dispatch(addUser(userData?.data));
      }
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet /> {/*To render children components  */}
      {/* <Footer /> */}
    </div>
  );
};
export default Body;
