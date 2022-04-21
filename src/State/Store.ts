import { configureStore } from "@reduxjs/toolkit";
import identityReducer from "./IdentitySlice";
import fileReducer from "./FileSlice";

export default configureStore({
  reducer: {
    files: fileReducer,
    identity: identityReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.files", "payload.file"],
        ignoredPaths: ["files"],
      },
    }),
});
