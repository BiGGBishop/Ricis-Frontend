"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // If you're hardcoding the token for testing, keep it in an environment variable
      const token = getToken() || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYWRlbmlyYW5ub2FoOUBnbWFpbC5jb20iLCJpYXQiOjE3Mjk5NDg2OTgsImV4cCI6MTczMDIwNzg5OH0.MCdBNKF3ZGZx9hPPZ0Jlhx0UevOGK6n4Y1iHAY9fApY";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    createCategories: builder.mutation({
      query: (payload) => ({
        url: `/startups/cat`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    createSubCategories: builder.mutation({
        query: (payload) => ({
          url: `/startups/sub-cat`,
          method: "POST",
          body: payload, 
        }),
        invalidatesTags: [{ type: "Categories", id: "LIST" }],
      }),

    addClassification: builder.mutation({
      query: (payload) => ({
        url: `/admin/classification`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    getAllCategories: builder.query({
      query: (params) => ({
        url: `/startups/cat`,
        params,
      }),
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),
    getSubCategories: builder.query({
        query: (category) => ({
            url: `/startups/sub-cat/${category}`,
            // method: 'GET'
          }),
        
        providesTags: [{ type: "Categories", id: "LIST" }],
      }),
  }),
});
// /startups/sub-cat/
export const {
  useCreateCategoriesMutation,
  useAddClassificationMutation,
  useCreateSubCategoriesMutation,
    useGetAllCategoriesQuery,
  useGetSubCategoriesQuery
} = categoriesApi;