import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type DialogState = { sendDialog: boolean; receiveDialog: boolean };
const initialState = () => ({ sendDialog: false, receiveDialog: false });

export const DialogSlice = createSlice({
  name: "Dialogs",
  initialState: initialState() as DialogState,
  reducers: {
    setSendDialog(_, action: Payload<boolean>) {
      return { ...initialState(), sendDialog: action.payload };
    },

    setReceiveDialog(_, action: Payload<boolean>) {
      return { ...initialState(), receiveDialog: action.payload };
    },
  },
});

export const { setSendDialog, setReceiveDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
