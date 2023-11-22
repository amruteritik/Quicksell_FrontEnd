import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grouping: "Status",
  ordering: "Priority",
  data: {},
  view: [],
  head: [],
};

export const authSlice = createSlice({
  name: "arrange",
  initialState,
  reducers: {
    setGroup: (state, action) => {
      state.grouping = action.payload.val;
    },

    setOrder: (state, action) => {
      state.ordering = action.payload.val;
    },

    setData: (state, action) => {
      state.data.tickets = action.payload.tickets;
      state.data.user = action.payload.user;
    },

    setView: (state, action) => {
      state.view = action.payload.view;
    },

    setHead: (state, action) => {
      state.head = action.payload.head;
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setGroup, setOrder, setData, setView, setHead } =
  authSlice.actions;
export default authSlice.reducer;
