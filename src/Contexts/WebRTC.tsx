import React, { useContext, useEffect, createContext, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { IdentityPair } from "../State/IdentitySlice";
import ConnectionsContext from "./index";
import { WSMessageData, WSMessageMeta, WSOfferData } from "./Types";

type ContextExposables = {
  createOffer(): Promise<WSMessageMeta<WSOfferData>>;
  createAccept(): Promise<WSMessageMeta<WSMessageData>>;
};

const context = createContext<ContextExposables | null>(null);

const WebRTCContextProvider = (props: PropsWithChildren<{}>) => {
  const { webRTC } = useContext(ConnectionsContext);
  const identities = useSelector((state: { identity: IdentityPair }) => state.identity);

  const [_, setDataChannel] = webRTC.dataChannel!;
  const [offer] = webRTC.offer!;
  const peerConnection = webRTC.peerConnection;

  const createOffer = async () => {
    return new Promise<WSMessageMeta<WSOfferData>>(async (resolve, reject) => {
      if (!peerConnection) return reject(new Error("No peerConnection available."));

      const offer = await peerConnection.createOffer();
      const data: WSMessageMeta<WSOfferData> = {
        type: "offer",
        data: { nickname: identities.local.nickname, sdp: offer },
      };

      resolve(data);
    });
  };

  const createAccept = async () => {
    return new Promise<WSMessageMeta<WSMessageData>>(async (resolve, reject) => {
      if (!peerConnection) return reject(new Error("No peerConnection available."));
      if (!offer) return reject(new Error("No Offer available."));

      const desc = new RTCSessionDescription(offer);
      peerConnection.setRemoteDescription(desc);

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      const data: WSMessageMeta<WSMessageData> = {
        type: "accept",
        data: { sdp: answer },
      };

      resolve(data);
    });
  };

  useEffect(() => {
    if (!peerConnection) return;
    peerConnection.addEventListener("connectionstatechange", () => {});

    peerConnection.addEventListener("icecandidate", (ev) => {});

    peerConnection.addEventListener("datachannel", (ev) => {
      setDataChannel(ev.channel);
    });
  }, []);

  return <context.Provider value={{ createOffer, createAccept }}>{props.children}</context.Provider>;
};

export default context;
export { WebRTCContextProvider };
