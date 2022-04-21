import { createSlice } from "@reduxjs/toolkit";

export type Identity = {
  id: string | null;
};

export const fileSlice = createSlice({
  name: "files",
  initialState: { id: null } as Identity,
  reducers: {
    setID(state, action: { payload: string }) {
      state.id = action.payload;
    },
  },
});

export const { setID } = fileSlice.actions;
export default fileSlice.reducer;
