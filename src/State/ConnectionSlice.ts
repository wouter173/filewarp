import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type ConnectionData = {
  connected: boolean;
  offer: RTCSessionDescription | null;
};

export const ConnectionSlice = createSlice({
  name: "Connection",
  initialState: { connected: false, offer: null } as ConnectionData,
  reducers: {
    setConnected(state, action: Payload<boolean>) {
      state.connected = action.payload;
    },

    setOffer(state, action: Payload<RTCSessionDescription | null>) {
      state.offer = action.payload;
    },
  },
});

export const { setConnected, setOffer } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
