import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cloud_name, frontendBaseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";

export const cloudinaryApi = createApi({
  reducerPath: "cloudinaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.cloudinary.com/v1_1/${cloud_name}`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getToken(); // Get the token
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["Cloudinary"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query(payload) {
        return {
          url: "/image/upload",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Cloudinary", id: "LIST" }],
    }),
  }),
});

export const { useUploadImageMutation } = cloudinaryApi;
