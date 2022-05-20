import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type DialogBody = { title: string; body: string };

export type DialogState = {
  open: boolean;
  data?: DialogBody;
};

export type Dialogs = {
  sendDialog: DialogState;
  engageDialog: DialogState;
  confirmationDialog: DialogState;
  informationDialog: DialogState;
};

type DialogReducerPayload<T> = Payload<T & { dialog: keyof Dialogs }>;

const initialState: Dialogs = {
  sendDialog: { open: false },
  engageDialog: { open: false },
  confirmationDialog: { open: false },
  informationDialog: { open: false },
};

export const DialogSlice = createSlice({
  name: "Dialogs",
  initialState,
  reducers: {
    setDialogOpen(state: Dialogs, action: DialogReducerPayload<{ open: boolean }>) {
      state[action.payload.dialog].open = action.payload.open;
    },

    setDialogMessage(state: Dialogs, action: DialogReducerPayload<{ data: DialogBody }>) {
      state[action.payload.dialog].data = action.payload.data;
    },
  },
});

export const { setDialogOpen, setDialogMessage } = DialogSlice.actions;
export default DialogSlice.reducer;
