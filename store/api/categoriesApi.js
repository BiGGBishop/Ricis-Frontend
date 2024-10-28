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

    getAllClassifications: builder.query({
      query: (params) => ({
          url: `/admin/classification`,
        // method: 'GET'
        params
        }),
      
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),

    updateClassifications: builder.mutation({
      query: ({ classificationId, payload }) => ({
        url: `/admin/classification/${classificationId}`,
        method: 'PATCH',
        body: payload,
      }),
      providesTags: [{ type: "Categories" }],
  }),
  
  
  deleteClassifications: builder.mutation({
    query: ({id, payload }) => ({
      url: `/admin/classification/${id}`,
      method: 'DELETE',
     
    }),
    providesTags: [ "Categories" ],
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
    updateCategories: builder.mutation({
      query: ({ categoryId, payload }) => ({
        url: `/startups/cat/${categoryId}`,
        method: 'PATCH',
        body: payload,
      }),
      providesTags: [{ type: "Categories" }],
    }),
    deleteCategories: builder.mutation({
      query: ({ categoryId, payload }) => ({
        url: `/startups/cat/${categoryId}`,
        method: 'DELETE',
        // body: payload,s
      }),
      providesTags: [ "Categories" ],
    }),
    getAllSubCategories: builder.query({
      query: (category) => ({
          url: `/startups/sub-cat/`,
          // method: 'GET'
        }),
      
      providesTags: [{ type: "Categories", id: "LIST" }],
    }),
    updateSubCategories: builder.mutation({
      query: ({ subcategoryId, payload }) => ({
        url: `/startups/sub-cat/${subcategoryId}`,
        method: 'PATCH',
        body: payload,
      }),
      providesTags: [{ type: "Categories" }],
    }),
    deleteSubCategories: builder.mutation({
      query: ({subcategoryId, payload }) => ({
        url: `/startups/sub-cat/${subcategoryId}`,
        method: 'DELETE',
        // /admin/classification/
      }),
      providesTags: [ "Categories" ],
    }),
  }),
});
// /startups/sub-cat/
export const {
  useCreateCategoriesMutation,
  useAddClassificationMutation,
  useCreateSubCategoriesMutation,
  useGetAllCategoriesQuery,
    useUpdateCategoriesMutation,
  useGetSubCategoriesQuery,
  useDeleteCategoriesMutation,
  useGetAllSubCategoriesQuery,
  useUpdateSubCategoriesMutation,
  useGetAllClassificationsQuery,
  useUpdateClassificationsMutation,
  useDeleteSubCategoriesMutation,
  useDeleteClassificationsMutation
} = categoriesApi;