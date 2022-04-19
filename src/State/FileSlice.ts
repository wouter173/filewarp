import { createSlice } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
  name: "files",
  initialState: [] as any[],
  reducers: {
    addFiles: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});

export const { addFiles } = fileSlice.actions;
export default fileSlice.reducer;
