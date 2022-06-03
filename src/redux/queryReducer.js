import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "userQuery",
  initialState: { userQuery: "" },
  reducers: {
    setQuery: (state, { payload }) => {
      return { ...state, userQuery: payload };
    },
  },
});

export const { setQuery } = slice.actions;

export default slice.reducer;
