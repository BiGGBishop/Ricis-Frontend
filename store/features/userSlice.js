
import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  if (typeof window !== 'undefined') {
    try {
      const persistedUser = localStorage.getItem('persistedUser');
      const persistedRole = localStorage.getItem('userRole');
      return {
        fetchingStates: {
          isLoading: false,
          isSuccess: false,
          error: "",
        },
        role: persistedRole || null,
        user: persistedUser ? JSON.parse(persistedUser) : null,
      };
    } catch (error) {
      console.error('Error loading persisted state:', error);
      return {
        fetchingStates: {
          isLoading: false,
          isSuccess: false,
          error: "",
        },
        role: null,
        user: null,
      };
    }
  }
  return {
    fetchingStates: {
      isLoading: false,
      isSuccess: false,
      error: "",
    },
    role: null,
    user: null,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: loadInitialState(),
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      if (typeof window !== 'undefined' && action.payload) {
        localStorage.setItem('userRole', action.payload);
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== 'undefined' && action.payload) {
        localStorage.setItem('persistedUser', JSON.stringify(action.payload));
      }
    },
    setFetchingStates: (state, action) => {
      state.fetchingStates = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('persistedUser');
        localStorage.removeItem('userRole');
      }
    },
  },
});

export const { setRole, setUser, setFetchingStates, clearUser } = userSlice.actions;
export const selectRole = (state) => state.user?.role;
export const selectUser = (state) => state.user?.user;
export const selectUserFetchingStates = (state) => state.user?.fetchingStates;

export default userSlice.reducer;