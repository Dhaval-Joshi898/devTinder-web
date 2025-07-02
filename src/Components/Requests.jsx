import axios from "axios";
import { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequestsList, removeRequestList } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  //  "/request/review/:status/:requestId",

  const handleAccept_RejectClick=async(status,_id)=>{
    const response=await axios.post(BASE_URL+"/request/review"+"/"+status+"/"+_id,{},{withCredentials:true})

    
    dispatch(removeRequestList(_id))

  }

  const fetchRequestsReceived = async () => {
    const response = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    console.log(response.data.data);
    dispatch(addRequestsList(response.data.data));
  };

  useEffect(() => {
    fetchRequestsReceived();
  }, []);

  if (requests && requests.length === 0)
    return (
      <h1 className="text-center my-16 font-semibold text-3xl">
        No Requests Found
      </h1>
    );

  return (
    <div className="flex flex-col items-center mt-20">
      <p className="text-xl">All Request Recieved</p>
      {console.log(requests)}
      {requests &&
        requests.map((request) => {
          return (
            <div className=" w-2/5 ">
              <ul className="list bg-base-300 my-3 rounded-box shadow-md ">
                <li className="list-row">
                  <div>
                    <img
                      className="size-14 rounded-box"
                      src={request.fromUserId.photoUrl}
                    />
                  </div>
                  <div>
                    <div>
                      {request &&
                        request.fromUserId.firstName +
                          " " +
                          request.fromUserId.lastName}
                    </div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {(request && request.fromUserId.age) || " "}{" "}
                      {request.fromUserId.gender
                        ? "," + request.fromUserId.gender
                        : ""}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs">
                    {request.fromUserId.about}
                  </p>
                  <button className="btn btn-soft btn-error " onClick={()=>handleAccept_RejectClick("rejected",request._id)}>Reject</button>
                  <button className="btn btn-soft btn-accent"onClick={()=>handleAccept_RejectClick("accepted",request._id)}>Accept</button>
                </li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
