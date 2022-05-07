import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type ConnectionData = {
  connected: boolean;
  offer: RTCSessionDescription | null;
};

export const ConnectionSlice = createSlice({
  name: "Connection",
  initialState: { connected: false } as ConnectionData,
  reducers: {
    setConnected(state, action: Payload<boolean>) {
      state.connected = action.payload;
    },
  },
});

export const { setConnected } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
