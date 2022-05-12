import { configureStore } from "@reduxjs/toolkit";
import identityReducer, { IdentityPair } from "./IdentitySlice";
import fileReducer, { FilePair } from "./FileSlice";
import dialogReducer, { DialogState } from "./DialogSlice";
import connectionReducer, { ConnectionData } from "./ConnectionSlice";

export type Store = {
  files: FilePair;
  identity: IdentityPair;
  dialogs: DialogState;
  connection: ConnectionData;
};

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
