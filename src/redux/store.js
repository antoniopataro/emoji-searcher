import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./themeReducer";
import queryReducer from "./queryReducer";
import modalReducer from "./modalReducer";

export default configureStore({
  reducer: {
    theme: themeReducer,
    query: queryReducer,
    modal: modalReducer,
  },
});
