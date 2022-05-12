import { setConnectionState } from "../State/ConnectionSlice";
import store from "../State/Store";
import { iceServers } from "./ice";
import { WSMessageData, WSMessageMeta } from "./Types";
import { receiveFile, sendFiles } from "./utils";
import webSocket from "./WebSocket";

class WebRTC {
  private pc: RTCPeerConnection;
  private fileChannels: RTCDataChannel[] = [];

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
    console.log("handleConnectionChange");
    if (this.pc.connectionState == "connected") {
      console.log(this);
      console.log("we are connected");
    }
  }

  handleIceCandidate(ev: RTCPeerConnectionIceEvent) {
    if (!ev.candidate?.candidate) return;
    webSocket.sendMessage({
      type: "nic",
      data: ev.candidate,
    });
  }

  handlePeerIceCandidate(candidate: RTCIceCandidate) {
    this.pc.addIceCandidate(candidate);
  }

  handleDataChannel(ev: RTCDataChannelEvent) {
    let label = ev.channel.label;

    if (label == "Amstel") {
      return this.registerDataChannel(ev.channel);
    }

    ev.channel.binaryType = "arraybuffer";
    ev.channel.addEventListener("message", (ev) => receiveFile(ev.data, label));
  }

  registerDataChannel = (channel: RTCDataChannel) => {
    channel.addEventListener("open", () => store.dispatch(setConnectionState("connected")));
    channel.addEventListener("close", () => store.dispatch(setConnectionState("disconnected")));
  };

  createDataChannel = (): Promise<RTCDataChannel> => {
    return new Promise((res) => {
      const label = (Math.random() + 1).toString(36).substring(4);
      const channel = this.pc.createDataChannel(label);

      channel.addEventListener("open", () => {
        this.fileChannels.push(channel);
        channel.binaryType = "arraybuffer";
        res(channel);
      });
    });
  };

  removeDataChannel = (label: string) => {
    for (let channel of this.fileChannels) {
      if (channel.label == label) channel.close();
    }
  };

  createOffer = async () => {
    //datachannel creation has to be done before the creation of a offer otherwise ICE does not work
    //dont ask, I do not have the answer
    let dc = this.pc.createDataChannel("Amstel");
    this.registerDataChannel(dc);

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    const data: WSMessageMeta<WSMessageData> = {
      type: "offer",
      data: { sdp: offer },
    };

    return data;
  };

  handleOffer = async (offer: RTCSessionDescription) => {
    const desc = new RTCSessionDescription(offer);
    await this.pc.setRemoteDescription(desc);
  };

  createAccept = async () => {
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

    sendFiles();
  };
}

export default new WebRTC();
