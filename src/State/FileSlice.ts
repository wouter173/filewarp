import { createSlice } from "@reduxjs/toolkit";

type Payload<T> = {
  payload: T;
};

export const fileSlice = createSlice({
  name: "files",
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
