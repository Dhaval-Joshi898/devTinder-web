import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",

  initialState: {
    postComments: {},
  },

  reducers: {

    // load all comments of a post
    addPostComments: (state, action) => {

      const { postId, postComments } = action.payload;

      // store all comments for that post
      state.postComments[postId] = postComments;
    },

    // add single new comment
    addComment: (state, action) => {

      const { postId, comment } = action.payload;

      // if no comments array exists for this post
      if (!state.postComments[postId]) {
        state.postComments[postId] = [];
      }

      // add new comment
      state.postComments[postId].push(comment);
    },

  },
});

export const {addComment,addPostComments} = commentsSlice.actions;

export default commentsSlice.reducer;