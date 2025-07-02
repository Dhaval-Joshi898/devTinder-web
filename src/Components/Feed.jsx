import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store?.feed);

  const fetchFeedData = async () => {
    if (feed) return;  //if feed data is there return dont call the api
    const response = await axios.get(BASE_URL + "/feed", {
      withCredentials: true,
    });
    console.log(response?.data);
    dispatch(addFeedData(response?.data));
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div className="flex justify-center my-28">

      {feed && <UserCard userData={feed[0]}/>}
    </div>
  );
};

export default Feed;

//todo logoout and remove dara from redux store also and then build feed get data store it in feed slice then build profile update
