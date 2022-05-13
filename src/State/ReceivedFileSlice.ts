import { createSlice } from "@reduxjs/toolkit";
import { Payload, Metadata } from "./Types";

export type FilePart = {
  label: string;
  metadata: Metadata;
  buffers: ArrayBuffer[];
  file: File | null;
};

export const receivedFilePartSlice = createSlice({
  name: "Files",
  initialState: [] as FilePart[],
  reducers: {
    addFilePart: (state, action: Payload<{ label: string; metadata: Metadata }>) => {
      const { label, metadata } = action.payload;
      return [...state, { label, metadata, buffers: [], file: null }];
    },

    appendBufferToFilePart: (state, action: Payload<{ label: string; buffer: ArrayBuffer }>) => {
      const { label, buffer } = action.payload;
      const filepart = state.filter((filepart) => filepart.label == label)[0];
      filepart.buffers.push(buffer);
    },

    addFileToFilePart: (state, action: Payload<{ label: string; file: File }>) => {
      const { label, file } = action.payload;
      const filepart = state.filter((filepart) => filepart.label == label)[0];
      filepart.file = file;
    },

    removeFilePart: (state, action: Payload<{ label: string }>) => {
      const { label } = action.payload;
      return state.filter((filepart) => filepart.label != label);
    },
  },
});

export const { addFilePart, appendBufferToFilePart, addFileToFilePart, removeFilePart } = receivedFilePartSlice.actions;
export default receivedFilePartSlice.reducer;
