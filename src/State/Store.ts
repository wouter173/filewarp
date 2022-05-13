import { configureStore } from "@reduxjs/toolkit";
import connectionReducer, { ConnectionData } from "./ConnectionSlice";
import dialogReducer, { DialogState } from "./DialogSlice";
import identityReducer, { IdentityPair } from "./IdentitySlice";
import localFileReducer from "./LocalFileSlice";
import receivedFilePartReducer from "./ReceivedFileSlice";
import { FilePart } from "./ReceivedFileSlice";

export type Store = {
  localFiles: File[];
  receivedFileParts: FilePart[];
  identity: IdentityPair;
  dialogs: DialogState;
  connection: ConnectionData;
};

export default configureStore({
  reducer: {
    localFiles: localFileReducer,
    receivedFileParts: receivedFilePartReducer,
    identity: identityReducer,
    dialogs: dialogReducer,
    connection: connectionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload.files", "payload.file"],
        ignoredPaths: ["localFiles", "receivedFileParts"],
      },
    }),
});
