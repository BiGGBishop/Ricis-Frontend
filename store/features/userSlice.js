// roleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchingStates: {
    isLoading: false,
    isSuccess: false,
    error: "",
    // refetch:,
  },
  role: null,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFetchingStates: (state, action) => {
      state.fetchingStates = action.payload;
    },
  },
});

export const { setRole, setUser, setFetchingStates } = userSlice.actions;
export const selectRole = (state) => state.user?.role;
export const selectUser = (state) => state.user?.user;
export const selectUserFetchingStates = (state) => state.user?.fetchingStates;

export default userSlice.reducer;
