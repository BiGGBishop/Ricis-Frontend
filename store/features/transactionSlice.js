// roleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  totalPages: 1,
  fetchingStates: {
    isLoading: false,
    isSuccess: false,
    error: "",
    // refetch:,
  },
  transactions: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setFetchingStates: (state, action) => {
      state.fetchingStates = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setTransactions, setFetchingStates, setPage, setTotalPages } =
  transactionsSlice.actions;
export const selectTransactons = (state) => state.transactions.transactions;
export const selectPage = (state) => state.transactions.page;
export const selectTotalPage = (state) => state.transactions.totalPages;
export const selectFetchingStates = (state) =>
  state.transactions.fetchingStates;
export default transactionsSlice.reducer;
