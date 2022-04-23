import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export const DialogSlice = createSlice({
  name: "DialogSlice",
  initialState: { sendDialog: false },
  reducers: {
    setSendDialog(state, action: Payload<boolean>) {
      state.sendDialog = action.payload;
    },
  },
});

export const { setSendDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
