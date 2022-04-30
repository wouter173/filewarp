import React, { PropsWithChildren, createContext, useEffect, useState } from "react";
import { iceServers } from "./ice";
import { WebRTCContextProvider } from "./WebRTC";
import { WebSocketContextProvider } from "./WebSocket";

type Connections = {
  webSocket?: WebSocket;
  webRTC: {
    peerConnection?: RTCPeerConnection;
    offer?: [RTCSessionDescription | null, React.Dispatch<RTCSessionDescription | null>];
    dataChannel?: [RTCDataChannel | null, React.Dispatch<RTCDataChannel | null>];
  };
};

const context = createContext<Connections>({ webRTC: {} });

const ConnectionsProvider = (props: PropsWithChildren<{}>) => {
  const [webSocket, setWebSocket] = useState<WebSocket | undefined>();
  const [peerConnection, setPeerconnection] = useState<RTCPeerConnection | undefined>();

  const dataChannel = useState<RTCDataChannel | null>(null);
  const offer = useState<RTCSessionDescription | null>(null);

  useEffect(() => {
    setPeerconnection(new RTCPeerConnection({ iceServers }));
    setWebSocket(new WebSocket(import.meta.env.VITE_WSS_SERVER));

    return () => {
      webSocket?.close();
    };
  }, []);

  return (
    <context.Provider value={{ webSocket, webRTC: { peerConnection, dataChannel, offer } }}>
      <WebSocketContextProvider>
        <WebRTCContextProvider>{props.children}</WebRTCContextProvider>
      </WebSocketContextProvider>
    </context.Provider>
  );
};

export default context;
export { ConnectionsProvider };
