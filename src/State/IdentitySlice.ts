import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type Identity = {
  nickname: string;
  ID: string;
};

export type IdentityPair = {
  local: Identity;
  peer: Identity;
};

const defaultIdentity: Identity = {
  nickname: "",
  ID: "",
};

export const identitySlice = createSlice({
  name: "identity",
  initialState: { local: defaultIdentity, peer: defaultIdentity } as IdentityPair,
  reducers: {
    setLocalNickname(state, action: Payload<string>) {
      state.local.nickname = action.payload;
    },
    setLocalID(state, action: Payload<string>) {
      state.local.ID = action.payload;
    },
    setPeerNickname(state, action: Payload<string>) {
      state.peer.nickname = action.payload;
    },
    setPeerID(state, action: Payload<string>) {
      state.peer.ID = action.payload;
    },
  },
});

export const { setLocalNickname, setLocalID, setPeerNickname, setPeerID } = identitySlice.actions;
export default identitySlice.reducer;
