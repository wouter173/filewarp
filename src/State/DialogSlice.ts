import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type DialogBody = { title: string; body: string };

export type DialogState = {
  open: boolean;
  data?: DialogBody;
};

export type DialogsState = {
  sendDialog: DialogState;
  engageDialog: DialogState;
  confirmationDialog: DialogState;
  informationDialog: DialogState;
};
const initialState = () => ({
  sendDialog: { open: false },
  engageDialog: { open: false },
  confirmationDialog: { open: false },
  informationDialog: { open: false },
});

export const DialogSlice = createSlice({
  name: "Dialogs",
  initialState: initialState() as DialogsState,
  reducers: {
    setSendDialog(_, action: Payload<boolean>) {
      return { ...initialState(), sendDialog: { open: action.payload } };
    },

    setEngageDialog(_, action: Payload<boolean>) {
      return { ...initialState(), engageDialog: { open: action.payload } };
    },

    setConfirmDialog(_, action: Payload<boolean>) {
      return { ...initialState(), confirmationDialog: { open: action.payload } };
    },

    setConfirmMessage(state: DialogsState, action: Payload<DialogBody>) {
      state.confirmationDialog.data = action.payload;
    },

    setInformationDialog(_, action: Payload<boolean>) {
      return { ...initialState(), informationDialog: { open: action.payload } };
    },

    setInformationMessage(state: DialogsState, action: Payload<DialogBody>) {
      state.informationDialog.data = action.payload;
    },
  },
});

export const {
  setSendDialog,
  setEngageDialog,
  setConfirmDialog,
  setConfirmMessage,
  setInformationDialog,
  setInformationMessage,
} = DialogSlice.actions;
export default DialogSlice.reducer;
