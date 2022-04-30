import { configureStore } from "@reduxjs/toolkit";
import identityReducer from "./IdentitySlice";
import fileReducer from "./FileSlice";
import dialogReducer from "./DialogSlice";

export default configureStore({
  reducer: {
    files: fileReducer,
    identity: identityReducer,
    dialogs: dialogReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.files"],
        ignoredPaths: ["files"],
      },
    }),
});
