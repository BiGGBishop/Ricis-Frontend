"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/configs";
import { getToken } from "@/utils/authHelpers";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
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
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query(param) {
        return {
          url: "/transactions",
          params: param,
        };
      },
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),
    getSingleTransaction: builder.query({
      query(InvoiceId) {
        return {
          url: `/transactions/${InvoiceId}`,
          // params: param,
        };
      },
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),
    getTransactionsStats: builder.query({
      query(params) {
        return {
          url: "/transactions/stats/records",
          params: params,
        };
      },
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),
    getTransactionChartStats: builder.query({
      query(params) {
        return {
          url: "/transactions/stats/chart",
          params: params,
        };
      },
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),
    // createFlutterTransaction: builder.mutation({
    //   query(payload) {
    //     return {
    //       url: "/transactions",
    //       method: "POST",
    //       body: payload,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    // }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetSingleTransactionQuery,
  useGetTransactionsStatsQuery,
  useGetTransactionChartStatsQuery,
  //   useCreateFlutterTransactionMutation,
} = transactionsApi;
