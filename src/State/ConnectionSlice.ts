import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type ConnectionState = "disconnected" | "connecting" | "connected";
export type ConnectionData = {
  connectionState: ConnectionState;
};

export const ConnectionSlice = createSlice({
  name: "Connection",
  initialState: { connectionState: "disconnected" } as ConnectionData,
  reducers: {
    setConnectionState(state, action: Payload<ConnectionState>) {
      state.connectionState = action.payload;
    },
  },
});

export const { setConnectionState } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
