import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/constants";
import { Heart, MessageCircle, UserPlus } from "lucide-react";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {

    try {

      const res = await axios.get(
        BASE_URL + "/notifications",
        {
          withCredentials: true,
        }
      );

      setNotifications(res.data.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchNotifications();

  }, []);

  const getNotificationIcon = (type) => {

    switch (type) {
      case "like":
        return <Heart className="text-red-500" size={20} />;

      case "comment":
        return <MessageCircle className="text-blue-500" size={20} />;

      case "connection":
        return <UserPlus className="text-green-500" size={20} />;

      default:
        return null;
    }
  };

  return (

    <div className="min-h-screen bg-base-100 p-5">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Notifications
        </h1>

        {
          notifications.length === 0 ? (

            <div className="bg-base-200 rounded-2xl p-10 text-center shadow-md">

              <p className="text-lg font-medium opacity-70">
                No Notifications Yet
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {
                notifications.map((notification) => (

                  <div
                    key={notification._id}
                    className="bg-base-200 hover:bg-base-300 transition-all duration-300 rounded-2xl p-4 shadow-md flex items-start gap-4"
                  >

                    {/* PROFILE IMAGE */}

                    <img
                      src={
                        notification?.fromUserId?.photoUrl ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="profile"
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                    />

                    {/* CONTENT */}

                    <div className="flex-1">

                      <div className="flex items-center gap-2 mb-1">

                        {getNotificationIcon(notification.type)}

                        <p className="font-semibold text-base">
                          {notification.message}
                        </p>

                      </div>

                      <p className="text-sm opacity-60 mt-1">
                        {console.log(notification)}
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </div>

  );
};

export default Notifications;
