import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeedbacks, addFeedback, deleteFeedback } from "C:/Projects/ssvr/labs/src/laba6/api.js";

export const fetchFeedbacks = createAsyncThunk("feedback/fetch", async (email) => {
  const all = await getFeedbacks(email);
  return all;
});

export const submitFeedback = createAsyncThunk("feedback/add", async (data) => {
  return await addFeedback(data);
});

export const removeFeedback = createAsyncThunk("feedback/delete", async (id) => {
  await deleteFeedback(id);
  return id;
});

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeFeedback.fulfilled, (state, action) => {
        state.list = state.list.filter((f) => f.id !== action.payload);
      });
  },
});

export default feedbackSlice.reducer;