import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export const DialogSlice = createSlice({
  name: "DialogSlice",
  initialState: { sendDialog: false, receiveDialog: false },
  reducers: {
    setSendDialog(state, action: Payload<boolean>) {
      state.sendDialog = action.payload;
    },

    setReceiveDialog(state, action: Payload<boolean>) {
      state.receiveDialog = action.payload;
    },
  },
});

export const { setSendDialog, setReceiveDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
