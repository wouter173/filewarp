import { WSMessageBody, WSMessageEvent, WSMessageMeta } from "./Types";
import store from "../State/Store";
import { setLocalID, setPeerID, setPeerNickname } from "../State/IdentitySlice";
import { setReceiveDialog } from "../State/DialogSlice";
import webRTC from "./WebRTC";

class FWWebSocket {
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket(import.meta.env.VITE_WSS_SERVER);
    this.ws.addEventListener("message", this.handleMessage);
    this.ws.addEventListener("close", this.close);
    this.ws.addEventListener("error", this.close);
  }

  close = () => {
    this.ws.close();
  };

  sendMessage = (data: WSMessageMeta<any>) => {
    const state = store.getState();
    const [sen, rec] = [state.identity.local.ID, state.identity.peer.ID];
    const body: WSMessageBody = { sen, rec, ...data };
    this.ws.send(JSON.stringify(body));
  };

  handleMessage = async (ev: WSMessageEvent) => {
    const body = JSON.parse(ev.data) as WSMessageBody;

    switch (body.type) {
      case "hello":
        store.dispatch(setLocalID(body.data));
        break;

      case "propose":
        if (store.getState().connection.connected) return;

        store.dispatch(setPeerNickname(body.data.nickname));
        store.dispatch(setPeerID(body.sen));
        store.dispatch(setReceiveDialog(true));
        break;
      case "engage":
        const offer = await webRTC.createOffer();
        this.sendMessage(offer);
        break;
      case "offer":
        const accept = await webRTC.createAccept(body.data.sdp);
        this.sendMessage(accept);
        break;
      case "accept":
        webRTC.handleAccept(body.data.sdp);
        break;
      case "nic":
        webRTC.handlePeerIceCandidate(body.data);
      default:
        console.log(body);
    }
  };
}

export default new FWWebSocket();
