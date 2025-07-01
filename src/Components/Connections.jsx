import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionList } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store?.connections);

  const fetchUserConnections = async () => {
    //make it if in store do not call the api
    const response = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    // console.log(response.data);
    dispatch(addConnectionList(response.data.data));
  };

  useEffect(() => {
    fetchUserConnections();
  }, []);

  if (connections && connections.length === 0)
    return <h1>No connections found</h1>;

  return (
    <div className=" flex-col items-center ">
      {connections &&
        connections.map((connection) => (
          <div
            className="card card-side bg-base-300 shadow-lg items-center max-w-md mx-auto my-3"
            key={connection._id}
          >
            <figure>
              <img
                className="w-24 h-24 object-contain rounded-full m-3"
                src={
                  connection.photoUrl ||
                  "https://api.dicebear.com/7.x/initials/svg?seed=" +
                    connection.firstName
                }
                alt={connection.firstName}
              />
            </figure>
            <div className="card-body p-3">
              <h2 className="card-title text-base font-semibold">
                {connection.firstName} {connection.lastName}
              </h2>
              <span className="text-sm text-gray-500">
                {connection.age  || ""} {connection.gender ?","+ connection.gender : ""}
              </span>
             
              <p className="text-sm text-gray-500">
                {connection.about || "No bio yet"}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-outline btn-primary">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      
    </div>
  );
};

export default Connections;
