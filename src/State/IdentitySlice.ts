import { createSlice } from "@reduxjs/toolkit";

export type Identity = {
  id: string | null;
  nickname: string;
};

export const fileSlice = createSlice({
  name: "files",
  initialState: { id: null, nickname: "" } as Identity,
  reducers: {
    setID(state, action: { payload: string }) {
      state.id = action.payload;
    },
    setNickName(state, action: { payload: string }) {
      state.nickname = action.payload;
    },
  },
});

export const { setID, setNickName } = fileSlice.actions;
export default fileSlice.reducer;
