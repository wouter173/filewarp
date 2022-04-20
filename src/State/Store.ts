import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./FileSlice";

export default configureStore({
  reducer: {
    files: fileReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.files"],
        ignoredPaths: ["files"],
      },
    }),
});
