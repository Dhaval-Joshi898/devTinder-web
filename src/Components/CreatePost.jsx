import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "lucide-react";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { addPostData, addSinglePost } from "../utils/postsSlice";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [photoIconClick, setPhotoIconClick] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const loggedInUser = useSelector((store) => store.user);
  console.log(loggedInUser);

  const onPhotoIconClick = () => setPhotoIconClick(!photoIconClick);

  const handlePostSubmit = async () => {
    if (!content.trim()) return;
    const formData=new FormData();
    formData.append("content",content);
    formData.append("image",image);


    const response = await axios.post(
      BASE_URL + "/createpost",
      formData,
      { withCredentials: true },
    ); //post added

    //now adding to store post slice
    console.log("new post", response.data.data);
    dispatch(
      addSinglePost({
        //for quick patch to show as user post it shows profile photo
        ...response.data.data,
        author: {
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          photoUrl: loggedInUser.photoUrl,
        },
      }),
    );
    setContent("");
    setImage("");

    if (response.data.data) {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    loggedInUser && (
      <>
       {showToast &&(
          <div className="flex justify-center"> 
            <div className="alert alert-success text-center fixed z-50 opacity-90 ">
              <span className="text-white font-semibold ">Post Created Successfully</span>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
          {/* 🔹 Top Row (like LinkedIn) */}
          <div className="flex items-center gap-3">
            <img
              src={loggedInUser.photoUrl}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start a post..."
              className="flex-1 bg-gray-200 text-black rounded-full px-4 py-2 text-sm resize-none focus:outline-none"
              rows={1}
            />
          </div>

          {/* 🔹 Image URL */}
          {photoIconClick && (
            <input
              type="file"
              accept="image/*"
              // value={image}
              onChange={(e) => setImage(e.target.files[0])}
              placeholder="Add image URL (optional)"
              className="w-full bg-gray-300  text-black border rounded-lg p-2 mt-3 text-sm"
            />
          )}

          {/* 🔹 Actions */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t">
            <div className="flex gap-4 text-sm text-gray-500">
              <span
                className="cursor-pointer hover:text-blue-600 flex space-between"
                onClick={onPhotoIconClick}
              >
                <Camera className="mx-1" /> Photo
              </span>
              <span className="cursor-pointer hover:text-blue-600">🏷️ Tag</span>
            </div>

            <button
              onClick={handlePostSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm"
            >
              Post
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default CreatePost;
