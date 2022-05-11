import { configureStore } from "@reduxjs/toolkit";
import identityReducer from "./IdentitySlice";
import fileReducer from "./FileSlice";
import dialogReducer from "./DialogSlice";
import connectionReducer from "./ConnectionSlice";

export default configureStore({
  reducer: {
    files: fileReducer,
    identity: identityReducer,
    dialogs: dialogReducer,
    connection: connectionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.files", "payload.file"],
        ignoredPaths: ["files"],
      },
    }),
});
