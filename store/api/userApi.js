import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken(); // Get the token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // Set Authorization header
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    updateUserBioData: builder.mutation({
      query(payload) {
        return {
          url: `/user`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getCurrentUser: builder.query({
      query() {
        return {
          url: `/user`,
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getUser: builder.query({
      query(userId) {
        return {
          url: `/admin/users/data/${userId}`,
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getAllUsers: builder.query({
      query({ page, limit }) {
        return {
          url: `/admin/users/data?page=${page}&&limit=${limit}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getAllStaffs: builder.query({
      query() {
        return {
          url: `/admin/staffs/data`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    deleteUser: builder.mutation({
      query(userId) {
        return {
          url: `/user/${userId}`,
          method: "POST",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getSingleStaff: builder.query({
      query(staffId) {
        return {
          url: `/admin/staffs/data/${staffId}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    deleteStaff: builder.mutation({
      query(userId) {
        return {
          url: `/admin/staffs/data/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    createStaff: builder.mutation({
      query(payload) {
        return {
          url: `/auth/register/staff`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateStaff: builder.mutation({
      query({ staffId, payload }) {
        return {
          url: `/staff/${staffId}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateStaffStatus: builder.mutation({
      query({ staffId, payload }) {
        return {
          url: `/admin/staffs/data/${staffId}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getStaffLogs: builder.query({
      query(staffId) {
        return {
          url: `/activity/staff/${staffId}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getUserLogs: builder.query({
      query(userId) {
        return {
          url: `/activity/user/${userId}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getStaffActivities: builder.query({
      query(staffId) {
        return {
          url: `/activity/user-application/staff/${staffId}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getUserActivities: builder.query({
      query(userId) {
        return {
          url: `/activity/user-application/user/${userId}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getNotifications: builder.query({
      query({ page, limit }) {
        return {
          url: `/notifications/?page=${page}&limit=${limit}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getSingleNotification: builder.query({
      query(notificationId) {
        return {
          url: `/notifications/${notificationId}`,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getCertificates: builder.query({
      query() {
        return {
          url: "/certificates",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useUpdateUserBioDataMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetCurrentUserQuery,
  useGetUserQuery,
  useGetAllStaffsQuery,
  useUpdateStaffMutation,
  useGetSingleStaffQuery,
  useUpdateStaffStatusMutation,
  useGetStaffActivitiesQuery,
  useCreateStaffMutation,
  useGetUserActivitiesQuery,
  useGetStaffLogsQuery,
  useGetUserLogsQuery,
  useGetNotificationsQuery,
  useGetSingleNotificationQuery,
  useGetCertificatesQuery,
} = userApi;
