import { createSlice } from "@reduxjs/toolkit";

const dark = {
  primary: "#303238",
  background: "#1E2023",
  text: "#D9D9D9",
  filter: "invert(50%)",
  hoveredFilter: "invert(100%)",
};
const light = {
  primary: "#FFF",
  background: "#D9D9D9",
  text: "#1E2023",
  filter: "invert(20%)",
  hoveredFilter: "invert(0%)",
};

function handleInitialTheme() {
  const storagedTheme = localStorage.getItem("userTheme");

  switch (storagedTheme) {
    case "light":
      return light;
    case "dark":
      return dark;
    default:
      return dark;
  }
}

export const slice = createSlice({
  name: "currentTheme",
  initialState: { currentTheme: handleInitialTheme() },
  reducers: {
    toggleTheme: (state, { payload }) => {
      switch (payload) {
        case "light":
          localStorage.setItem("userTheme", "light");
          return { ...state, currentTheme: light };
        case "dark":
          localStorage.setItem("userTheme", "dark");
          return { ...state, currentTheme: dark };
      }
    },
  },
});

export const { toggleTheme } = slice.actions;

export default slice.reducer;
