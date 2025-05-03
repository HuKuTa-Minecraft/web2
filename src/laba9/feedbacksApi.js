import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const delayedFetchBaseQuery = async (args, api, extraOptions) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); 
  const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3001/' });
  return baseQuery(args, api, extraOptions);
};

export const feedbacksApi = createApi({
  reducerPath: 'feedbacksApi',
  baseQuery: delayedFetchBaseQuery, 
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => 'feedbacks',
    }),
  }),
});

export const { useGetFeedbacksQuery } = feedbacksApi;
