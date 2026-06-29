//6 may
import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    addPostData: (state, action) => {
      state.posts = action.payload; // for full fetch
    },
    addSinglePost: (state, action) => {
      const exists = state.posts.find(
          (post) => post._id === action.payload._id
      );
      if (!exists) {
        state.posts.unshift(action.payload); // for new post
      }
    },
    
    // addPostData:(state,action)=>{
    //     state.posts.unshift(action.payload)
    // },
    toggleLike: (state, action) => {
      const postId = action.payload;

      // find clicked post
      const post = state.posts.find((post) => post._id === postId);

      if (post) {
        // if already liked → unlike
        if (post.isLiked) {
          post.isLiked = false;
          post.likesCount -= 1;
        } else {
          // like post
          post.isLiked = true;
          post.likesCount += 1;
        }
      }
    },

    incrementCommentCount: (state, action) => {
      const post = state.posts.find(p => p._id === action.payload);
      if (post) {
        post.commentsCount += 1;
      }
    }  
  },
});

export const { addPostData, addSinglePost,toggleLike,incrementCommentCount} = postsSlice.actions;

export default postsSlice.reducer;
