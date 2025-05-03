import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'C:/Projects/ssvr/labs/src/laba4/counter_slice.js';
import authReducer from 'C:/Projects/ssvr/labs/src/laba6/authSlice.js';
import feedbackReducer from 'C:/Projects/ssvr/labs/src/laba6/feedbackSlice.js';
import { feedbacksApi } from 'C:/Projects/ssvr/labs/src/laba9/feedbacksApi.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    feedback: feedbackReducer,
    [feedbacksApi.reducerPath]: feedbacksApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedbacksApi.middleware),
});
