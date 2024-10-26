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
 categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
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

export const { setCategories, setFetchingStates, setPage, setTotalPages } =
  categoriesSlice.actions;
export const selectTransactons = (state) => state.categories.categories;
export const selectPage = (state) => state.categories.page;
export const selectTotalPage = (state) => state.categories.totalPages;
export const selectFetchingStates = (state) =>
  state.categories.fetchingStates;
export default categoriesSlice.reducer;
