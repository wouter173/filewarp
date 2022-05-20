import { configureStore } from "@reduxjs/toolkit";
import connectionReducer, { ConnectionData } from "./ConnectionSlice";
import dialogReducer, { Dialogs } from "./DialogSlice";
import identityReducer, { IdentityPair } from "./IdentitySlice";
import localFileReducer from "./LocalFileSlice";
import receivedFileEntriesReducer, { StateType as ReceivedFileEntryStateType } from "./ReceivedFileSlice";

export type Store = {
  localFiles: File[];
  receivedFileEntries: ReceivedFileEntryStateType;
  identity: IdentityPair;
  dialogs: Dialogs;
  connection: ConnectionData;
};

export default configureStore({
  reducer: {
    localFiles: localFileReducer,
    receivedFileEntries: receivedFileEntriesReducer,
    identity: identityReducer,
    dialogs: dialogReducer,
    connection: connectionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.files", "payload.file", "payload.buffer"],
        ignoredPaths: ["localFiles", "receivedFileEntries"],
      },
    }),
});
