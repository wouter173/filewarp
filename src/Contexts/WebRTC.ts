import { setConnected } from "../State/ConnectionSlice";
import store from "../State/Store";
import { iceServers } from "./ice";
import { WSMessageData, WSMessageMeta } from "./Types";
import webSocket from "./WebSocket";

class WebRTC {
  private pc: RTCPeerConnection;
  private dc!: RTCDataChannel;

  constructor() {
    this.pc = new RTCPeerConnection({ iceServers });
    this.pc.addEventListener("negotiationneeded", (ev) => console.log("negotiationneeded", ev));
    this.pc.addEventListener("iceconnectionstatechange", (ev) => console.log("iceconnectionstatechange", ev));
    this.pc.addEventListener("icecandidateerror", (ev) => console.log("icecandidateerror", ev));
    this.pc.addEventListener("icecandidate", this.handleIceCandidate.bind(this));
    this.pc.addEventListener("connectionstatechange", this.handleConnectionChange.bind(this));
    this.pc.addEventListener("datachannel", this.handleDataChannel.bind(this));
  }

  handleConnectionChange() {
    if (this.pc.connectionState == "connected") {
      console.log(this);
      console.log("we are connected");
    }
  }

  handleIceCandidate(ev: RTCPeerConnectionIceEvent) {
    webSocket.sendMessage({
      type: "nic",
      data: ev.candidate,
    });
  }

  handlePeerIceCandidate(candidate: RTCIceCandidate) {
    this.pc.addIceCandidate(candidate);
  }

  handleDataChannel(ev: RTCDataChannelEvent) {
    this.dc = ev.channel;
    this.registerDataChannel();
  }

  registerDataChannel = () => {
    this.dc.addEventListener("open", this.dataChannelOpen.bind(this));
    this.dc.addEventListener("close", this.dataChannelClose.bind(this));
    this.dc.addEventListener("message", this.dataChannelMessage.bind(this));
  };

  dataChannelOpen = () => {
    store.dispatch(setConnected(true));
  };

  dataChannelClose = () => {
    store.dispatch(setConnected(false));
  };

  dataChannelMessage = (ev: MessageEvent) => {
    console.log(ev.data);
  };

  sendMessage = () => {
    this.dc.send("test");
  };

  createOffer = async () => {
    //datachannel creation has to be done before the creation of a offer otherwise ICE does not work
    //dont ask, I do not have the answer
    this.dc = this.pc.createDataChannel("Amstel");
    this.registerDataChannel();

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    const data: WSMessageMeta<WSMessageData> = {
      type: "offer",
      data: { sdp: offer },
    };

    return data;
  };

  createAccept = async (offer: RTCSessionDescription) => {
    const desc = new RTCSessionDescription(offer);
    await this.pc.setRemoteDescription(desc);

    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);

    const data: WSMessageMeta<WSMessageData> = {
      type: "accept",
      data: { sdp: answer },
    };

    return data;
  };

  handleAccept = async (answer: RTCSessionDescription) => {
    await this.pc.setRemoteDescription(answer);
    console.log(this.pc);
  };
}

export default new WebRTC();
