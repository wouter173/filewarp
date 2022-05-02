import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type IdentityPair = {
  local: Identity;
  peer: Identity;
};

export type Identity = {
  nickname: string;
  ID: string;
};

const defaultIdentity: Identity = {
  nickname: "",
  ID: "",
};

export const identitySlice = createSlice({
  name: "Identity",
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
