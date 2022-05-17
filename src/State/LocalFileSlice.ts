import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export const localFileSlice = createSlice({
  name: "Files",
  initialState: [] as File[],
  reducers: {
    addLocalFiles: (state: File[], action: Payload<{ files: File[] }>) => {
      return [...state, ...action.payload.files];
    },

    removeLocalFile: (state: File[], action: Payload<{ file: File }>) => {
      return state.filter((file: File) => file.name != action.payload.file.name);
    },
  },
});

export const { addLocalFiles, removeLocalFile } = localFileSlice.actions;
export default localFileSlice.reducer;
