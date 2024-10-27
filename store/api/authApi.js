import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  baseUrl,
  registrationUrl,
  requestOTPUrl,
  signInUrl,
  signInUrlStaff,
  verifyOTPUrl,
} from "../../lib/configs";
import { getToken } from "@/utils/authHelpers";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const token = getToken(); // Get the token
      // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJzdXBlcmFkbWluQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzI5OTM4MzYxLCJleHAiOjE3MzAxOTc1NjF9.X1nDX7k3MfzchGab0Hol72UB1-0zUaJNjF5-8tdA5ow"
      // console.log("token", token);
      // if (token) {
      //   headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
      // }
      // return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    requestRegistrationOTP: builder.mutation({
      query(payload) {
        return {
          url: requestOTPUrl,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    verifyOTP: builder.mutation({
      query(payload) {
        return {
          url: verifyOTPUrl,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    registerUser: builder.mutation({
      query(payload) {
        return {
          url: registrationUrl,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    signInUser: builder.mutation({
      query(payload) {
        return {
          url: signInUrl,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    signInStaff: builder.mutation({
      query(payload) {
        return {
          url: signInUrlStaff,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    changePassword: builder.mutation({
      query(payload) {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    requestResetPasswordOTP: builder.mutation({
      query(payload) {
        return {
          url: "/auth/request-reset-password-otp",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    verifyResetPasswordOTP: builder.mutation({
      query(payload) {
        return {
          url: "/auth/verify-reset-password-otp",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    resetPassword: builder.mutation({
      query(payload) {
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
});

export const {
  useRequestRegistrationOTPMutation,
  useVerifyOTPMutation,
  useRegisterUserMutation,
  useSignInUserMutation,
  useSignInStaffMutation,
  useChangePasswordMutation,
  useRequestResetPasswordOTPMutation,
  useVerifyResetPasswordOTPMutation,
  useResetPasswordMutation,
} = authApi;
