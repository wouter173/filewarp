import { createSlice } from "@reduxjs/toolkit";
import { Metadata } from "../Misc/Types";
import { Payload } from "./Types";

export type StateType = { [label: string]: ReceivedFileEntry };
export type ReceivedFileEntry = {
  progress: number;
  fileUrl: string | null;
  metadata: Metadata;
};

type recFilePayload<T> = Payload<{ label: string; data: T }>;

export const receivedFileEntriesSlice = createSlice({
  name: "Files",
  initialState: {} as StateType,
  reducers: {
    addReceivedFileEntry(state: StateType, action: recFilePayload<Metadata>) {
      state[action.payload.label] = { fileUrl: null, progress: 0, metadata: action.payload.data };
    },
    setReceivedFileEntryProgress(state: StateType, action: recFilePayload<number>) {
      state[action.payload.label].progress = action.payload.data;
    },
    setReceivedFileEntryFileUrl(state: StateType, action: recFilePayload<string>) {
      state[action.payload.label].fileUrl = action.payload.data;
    },
  },
});

export const { addReceivedFileEntry, setReceivedFileEntryProgress, setReceivedFileEntryFileUrl } =
  receivedFileEntriesSlice.actions;
export default receivedFileEntriesSlice.reducer;
