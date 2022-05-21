import { setConnectionState } from "../State/ConnectionSlice";
import store from "../State/Store";
import { iceServers } from "./ice";
import { WSMessageData, WSMessageMeta } from "./Types";
import { receiveFile, sendAllFiles } from "./FileHandlers";
import webSocket from "./WebSocket";
import { GenID, informFailure, informSuccess } from "./utils";
import { resetPeer } from "../State/IdentitySlice";

class WebRTC {
  private pc!: RTCPeerConnection;
  private amstel!: RTCDataChannel;
  private fileChannels: RTCDataChannel[] = [];

  constructor() {
    this.createPeerConnection();
  }

  private createPeerConnection = () => {
    this.pc = new RTCPeerConnection({ iceServers });
    this.pc.addEventListener("negotiationneeded", (ev) => console.log("negotiationneeded", ev));
    this.pc.addEventListener("iceconnectionstatechange", (ev) => console.log("iceconnectionstatechange", ev));
    this.pc.addEventListener("icecandidateerror", (ev) => console.log("icecandidateerror", ev));
    this.pc.addEventListener("icecandidate", this.handleIceCandidate.bind(this));
    this.pc.addEventListener("connectionstatechange", this.handleConnectionStateChange.bind(this));
    this.pc.addEventListener("datachannel", this.handleDataChannel.bind(this));
  };

  handleConnectionStateChange() {
    switch (this.pc.connectionState) {
      case "connected":
        console.log("we are connected");
        break;
      case "disconnected":
        console.log("disconnected");
        break;
      case "closed":
        console.log("webrtc closed");
        informFailure();
        store.dispatch(setConnectionState("disconnected"));
        this.createPeerConnection();
        break;
      case "failed":
        console.log("webrtc failed");
        informFailure();
        store.dispatch(setConnectionState("disconnected"));
        this.createPeerConnection();
        break;
      default:
        console.log("ConnectionStateChange");
        console.log(this.pc.connectionState);
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
      return this.registerAmstel(ev.channel);
    }

    this.fileChannels.push(ev.channel);
    ev.channel.binaryType = "arraybuffer";
    ev.channel.addEventListener("message", (ev) => receiveFile(ev.data, label));
  }

  registerAmstel(channel: RTCDataChannel) {
    this.amstel = channel;
    channel.addEventListener("open", () => store.dispatch(setConnectionState("connected")));
    channel.addEventListener("close", () => this.close(true));
    channel.addEventListener("error", (e) => console.log("amstel error", e));
  }

  closeAmstel() {
    this.amstel.close();
  }

  createFileChannel(): Promise<RTCDataChannel> {
    return new Promise((res) => {
      const label = GenID();
      const channel = this.pc.createDataChannel(label);

      channel.addEventListener("open", () => {
        this.fileChannels.push(channel);
        channel.binaryType = "arraybuffer";
        res(channel);
      });
    });
  }

  removeDataChannel(label: string) {
    for (let channel of this.fileChannels) {
      if (channel.label != label) continue;
      channel.close();
      this.fileChannels.splice(this.fileChannels.indexOf(channel), 1);

      console.log(this.fileChannels);
    }
  }

  async createOffer() {
    //datachannel creation has to be done before the creation of a offer otherwise ICE does not work
    //dont ask, I do not have the answer
    let dc = this.pc.createDataChannel("Amstel");
    this.registerAmstel(dc);

    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);

    const data: WSMessageMeta<WSMessageData> = {
      type: "offer",
      data: { sdp: offer },
    };

    return data;
  }

  async handleOffer(offer: RTCSessionDescription) {
    const desc = new RTCSessionDescription(offer);
    await this.pc.setRemoteDescription(desc);
  }

  async createAccept() {
    const answer = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answer);

    const data: WSMessageMeta<WSMessageData> = {
      type: "accept",
      data: { sdp: answer },
    };

    return data;
  }

  async handleAccept(answer: RTCSessionDescription) {
    await this.pc.setRemoteDescription(answer);

    sendAllFiles();
  }

  close(success?: boolean) {
    this.pc.close();
    this.createPeerConnection();

    if (success) informSuccess();
    else informFailure();

    store.dispatch(setConnectionState("disconnected"));
    store.dispatch(resetPeer());
  }
}

export default new WebRTC();
