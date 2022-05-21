import { createSlice } from "@reduxjs/toolkit";
import { Payload } from "./Types";

export type IdentityPair = {
  local: Identity;
  peer: PeerIdentity;
};

export type Identity = {
  nickname: string;
  ID: string;
};

export type PeerIdentity = Identity & {
  sendFileCount: number;
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
    setPeerSendFileCount(state, action: Payload<number>) {
      state.peer.sendFileCount = action.payload;
    },
    resetPeer(state: IdentityPair) {
      state.peer = { ID: "", nickname: "", sendFileCount: 0 };
    },
  },
});

export const { setLocalNickname, setLocalID, setPeerNickname, setPeerID, setPeerSendFileCount, resetPeer } =
  identitySlice.actions;
export default identitySlice.reducer;
