import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addPostComments } from "../utils/commentsSlice";
import { addSinglePost } from "../utils/postsSlice";

export default function PostCommentsPage() {
    const {postId}=useParams();
    const [comment,setComment]=useState("")
    const dispatch=useDispatch()
    // console.log(postId)

    const post=useSelector((store)=>store.posts.posts.find((post) => post._id === postId))
    console.log("From STORE",post)

    const allPostComments=useSelector((store)=>store.comments.postComments)
    // console.log("ALL post",allPostComments[postId])
    const allComments=allPostComments[postId]

    const fetchSinglePost= async ()=>{
      const response=await axios.get(BASE_URL+`/posts/${postId}`,{withCredentials:true})
      console.log("fetch single post",response)
      dispatch(addSinglePost(response.data.data));
    }

    const fetchPostComments=async ()=>{
      
        const comments=await axios.get(BASE_URL + `/posts/${postId}/comments`);
        dispatch(addPostComments({
            postId,
            postComments: comments?.data
        }))
    }

    const handlePostClick= async (text)=>{
        const response=await axios.post(BASE_URL+`/posts/${postId}/addcomment`,{text},{withCredentials:true});
        console.log("COMMENTS POST",response.data.data)//to get comments
        
        dispatch(addComment({
            postId,
            comment:response?.data?.data  //here adding single comment so name should be as in reducer (comment,wrote there this)
        }))
        setComment("")
    }

    useEffect(()=>{
        if(!post){
          //on refresh post empty so fetching that post
          fetchSinglePost()
        }
        fetchPostComments();
    },[postId])

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 mt-8">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* POST CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <div className="flex items-center gap-3">
            <img
              src={post?.author?.photoUrl}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-gray-900">
                {post?.author?.firstName} {post?.author?.lastName}
              </h2>

              <p className="text-xs text-gray-500">
                {new Date(post?.createdAt).toLocaleString([], {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <p className="mt-4 text-gray-800 leading-relaxed">
            {post?.content}
          </p>

          {post?.image && (
            <img
              src={post?.image}
              alt="post"
              className="mt-4 rounded-xl w-full max-h-[450px] object-cover"
            />
          )}

          <div className="flex justify-between mt-4 text-sm text-gray-500 border-t pt-3">
            <span>👍 {post?.likesCount} Likes</span>
            <span>{post?.commentsCount} Comments</span>
          </div>
        </div>

        {/* COMMENTS SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h3 className="text-lg font-semibold mb-5 text-gray-800">
            Comments
          </h3>

          <div className="space-y-5">
            {allComments?.map((comment) => (
              <div
                key={comment?._id}
                className="flex gap-3 border-b pb-4 last:border-none"
              >
                <img
                  src={comment?.userId?.photoUrl}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <h4 className="font-medium text-sm text-gray-900">
                      {comment?.userId?.firstName} {comment?.userId?.lastName}
                    </h4>

                    <p className="text-sm text-gray-700 mt-1">
                      {comment?.text}
                    </p>
                  </div>

                  <div className="flex gap-4 mt-2 text-xs text-gray-500 px-2">
                    <button className="hover:text-blue-600">Like</button>
                    <button className="hover:text-blue-600">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ADD COMMENT */}
          <div className="flex gap-3 mt-6">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className="flex-1 border rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                onClick={()=>handlePostClick(comment)}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
