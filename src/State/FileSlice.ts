import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export const fileSlice = createSlice({
  name: "Files",
  initialState: [] as File[],
  reducers: {
    addFiles: (state, action: Payload<{ files: File[] }>) => {
      return [...state, ...action.payload.files];
    },

    removeFile: (state, action: Payload<{ file: File }>) => {
      return state.filter((file) => file.name != action.payload.file.name);
    },
  },
});

export const { addFiles, removeFile } = fileSlice.actions;
export default fileSlice.reducer;
