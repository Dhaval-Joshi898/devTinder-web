import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPostData, incrementCommentCount, toggleLike } from "../utils/postsSlice";
import { addComment } from "../utils/commentsSlice";

const Posts = () => {

  const posts=useSelector((store)=>store.posts.posts)
  const dispatch=useDispatch()

  const fetchAllPost=async ()=>{
    const response=await axios.get(BASE_URL + "/allpost",{
      withCredentials:true
    })
  
    console.log("response",response.data.post)

    const allPost=response.data.post
    // setPosts(allPost)
    dispatch(addPostData([...allPost]))
  }
  
  // const handleCreatePost = (newPost) => {
  //   setPosts(prev => [newPost, ...prev]);
  // };

  const handleLike = async (postId,post) => {
    // console.log("Liked:", postId);
    const wasLiked = post.isLiked;
    dispatch(toggleLike(postId));
    try {
      // const response= await axios.post(BASE_URL+`/posts/${postId}/like`)
      //if post is already liked and is clicked then unlike
      console.log("POST LIKEE")
      if(wasLiked){
        const response=await axios.delete(BASE_URL+`/posts/${postId}/unlike`,{withCredentials:true})
        console.log("IS POST LIKED,",response.data.isLiked)
      }else{
        const response=await axios.post(BASE_URL+`/posts/${postId}/like`,{},{withCredentials:true})
        console.log("IS POST LIKED,",response.data.isLiked)
      }
    } catch (err) {
      console.log(err.response.data.message)
    }
  };

  const handleComment = async (postId, text) => {
    // console.log("Comment:", postId, text);
    try{
      const response=await axios.post(BASE_URL+`/posts/${postId}/addcomment`,{text},{withCredentials:true})
      console.log("COMMENTS POST",response.data.data)//to get comments

      dispatch(addComment({
        postId,
        comment:response.data.data}))

      dispatch(incrementCommentCount(postId))
    }catch(err){
      console.log("handleComment error",err)
    }

  };

  useEffect(()=>{
    fetchAllPost()

    // const interval = setInterval(() => {
    //   console.log("Polling running after  every 3 seconds")
    //   fetchAllPost();
    // }, 3000);

    // return () => clearInterval(interval);

  },[])

  return (
    <div className="bg-gray-300 min-h-screen py-20">

      {/* 🔹 Centered Feed */}
      <div className="max-w-xl mx-auto px-4">

        {/* 🔹 Create Post */}
        <CreatePost  />

        {/* 🔹 Posts */}
        {console.log(posts)}
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onLike={()=>handleLike(post._id,post)}
            onComment={handleComment}
          />
        ))}

      </div>
    </div>
  );
};

export default Posts;