// roleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form_name: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormName: (state, action) => {
      state.form_name = action.payload;
    },
  },
});

export const { setFormName } = formSlice.actions;
export const selectFormName = (state) => state.form.form_name;

export default formSlice.reducer;
