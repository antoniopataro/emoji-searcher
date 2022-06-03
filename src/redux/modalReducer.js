import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "showModal",
  initialState: { showModal: false },
  reducers: {
    toggleModal: (state, { payload }) => {
      return { ...state, showModal: payload };
    },
  },
});

export const { toggleModal } = slice.actions;

export default slice.reducer;
