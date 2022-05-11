import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type FilePair = { localFiles: File[]; receivedFiles: File[] };

export const fileSlice = createSlice({
  name: "Files",
  initialState: { localFiles: [], receivedFiles: [] } as FilePair,
  reducers: {
    addLocalFiles: (state, action: Payload<{ files: File[] }>) => {
      state.localFiles = [...state.localFiles, ...action.payload.files];
    },

    removeLocalFile: (state, action: Payload<{ file: File }>) => {
      state.localFiles = state.localFiles.filter((file) => file.name != action.payload.file.name);
    },

    addReceivedFile: (state, action: Payload<{ file: File }>) => {
      state.receivedFiles = [...state.receivedFiles, action.payload.file];
    },

    removeReceivedFile: (state, action: Payload<{ file: File }>) => {
      state.receivedFiles = state.receivedFiles.filter((file) => file.name != action.payload.file.name);
    },
  },
});

export const { addLocalFiles, removeLocalFile, addReceivedFile, removeReceivedFile } = fileSlice.actions;
export default fileSlice.reducer;
