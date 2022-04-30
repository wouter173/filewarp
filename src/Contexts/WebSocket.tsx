import React, { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IdentityPair, setLocalID, setPeerID, setPeerNickname } from "../State/IdentitySlice";
import { WSMessageBody, WSMessageData, WSMessageEvent, WSMessageMeta } from "./Types";
import ConnectionsContext from "./index";
import { setReceiveDialog } from "../State/DialogSlice";

type ContextExposables = {
  respondMessage(data: WSMessageMeta<any>): void;
  sendMessage(data: WSMessageMeta<any>): void;
};

const webSocketContext = createContext<ContextExposables | null>(null);
export default webSocketContext;

export const WebSocketContextProvider = (props: PropsWithChildren<{}>) => {
  const dispatch = useDispatch();
  const { sen, rec } = useSelector((state: { identity: IdentityPair }) => ({
    sen: state.identity.local.ID,
    rec: state.identity.peer.ID,
  }));

  const context = useContext(ConnectionsContext);
  const webSocket = context.webSocket;
  const peerConnection = context.webRTC.peerConnection;
  const [offer, setOffer] = context.webRTC.offer!;

  useEffect(() => {
    if (!webSocket) return;
    webSocket.addEventListener("open", () => {});
    webSocket.addEventListener("message", handleMessage);

    return () => {
      webSocket.close();
    };
  }, [webSocket]);

  const handleMessage = async (ev: WSMessageEvent) => {
    if (!webSocket) return;
    const body = JSON.parse(ev.data) as WSMessageBody;
    console.log(ev.data);

    switch (body.type) {
      case "hello":
        dispatch(setLocalID(body.data));
        break;
      case "offer":
        if (offer) return;
        if (!peerConnection) return;
        setOffer(body.data.sdp);
        dispatch(setPeerNickname(body.data.nickname));
        dispatch(setPeerID(body.sen));
        dispatch(setReceiveDialog(true));
        break;
      case "accept":
        console.log("answer :laughing:");
        console.log("answer" + body);
        break;
      default:
        console.log(body);
    }
  };

  const respondMessage = (data: WSMessageMeta<any>) => {
    if (!webSocket) return;
    const body: WSMessageBody = { sen: rec, rec: sen, ...data };
    webSocket.send(JSON.stringify(body));
  };

  const sendMessage = (data: WSMessageMeta<any>) => {
    const body: WSMessageBody = { sen, rec, ...data };
    if (!webSocket) {
      console.log("ws not available");
      return;
    }
    webSocket.send(JSON.stringify(body));
    console.log(body);
  };

  return (
    <webSocketContext.Provider value={{ sendMessage, respondMessage }}>{props.children}</webSocketContext.Provider>
  );
};
