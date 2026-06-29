  import React, { useState } from "react";
  import { Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

  const PostCard = ({ post, onLike, onComment }) => {
    // const [likedClick,setLikedClick]=useState(false);
    const [commentText, setCommentText] = useState("");
    const [showCommentBox, setShowCommentBox] = useState(false);
    const navigate=useNavigate()
    const comments = useSelector((store) => store.comments.postComments[post._id] || [] )
    console.log("INSINDE POSTCARD USESELECTOR",comments)

    return (
      <div className="bg-gray-200 rounded-xl shadow-sm border p-4 mb-4 max-w-xl mx-auto">
        {/* 🔹 Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img
              src={
                post.author?.photoUrl ||
                "https://png.pngtree.com/png-vector/20260121/ourlarge/pngtree-random-user-profile-generator-app-icon-creative-design-white-background-png-image_18583246.webp"
              }
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm text-black">
                {post.author?.firstName} {post.author?.lastName}{" "}
              </h3>
              {/* <p className="text-xs text-gray-500">
                {post.author?.headline || "Software Developer"}
              </p> */}
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString([], {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>

        {/* 🔹 Content */}
        <div className="mt-3 text-sm text-gray-800 leading-relaxed">
          {post.content}
        </div>

        {/* 🔹 Image */}
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="mt-3 rounded-lg w-full max-h-[400px] object-cover"
          />
        )}

        {/* 🔹 Stats */}
        <div className="flex justify-between text-xs text-gray-500 mt-3 border-b pb-2">
          <span>👍 {post.likesCount || 0}</span>
          <span className="cursor-pointer hover:text-blue-600" 
          onClick={()=>navigate(`/postcomments/${post._id}`)} > {post.commentsCount || 0} comments</span>
        </div>

        {/* 🔹 Actions */}
        <div className="flex justify-between text-gray-600 text-sm mt-2">
          <button
            onClick={() => onLike(post._id,post) }
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <ThumbsUp className={`w-4 h-4 ${post.isLiked ? "text-blue-500" :"text-gray-400"}`} />
         
            <span className={`${post.isLiked ? "text-blue-500" :"text-gray"}`}> {`${post.isLiked ? "Liked" :"Like"}`}</span>
          </button>

          <button
            onClick={() => setShowCommentBox(!showCommentBox)}  
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <MessageCircle className="w-4 h-4" />
            Comment
          </button>

          <button className="flex items-center gap-1 hover:text-blue-600">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* 🔹 Comment Input */}
        {showCommentBox && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-full px-3 py-2 text-sm text-black bg-gray-300 focus:outline-none"
            />
            <button
              onClick={() => {
                onComment(post._id, commentText);
                setCommentText("");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Post
            </button>
          </div>
        )}
      </div>
    );
  };

  export default PostCard;
