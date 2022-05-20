import { setConnectionState } from "../State/ConnectionSlice";
import store from "../State/Store";
import { iceServers } from "./ice";
import { WRTCMessageBody, WSMessageData, WSMessageMeta } from "./Types";
import { receiveFile, sendAllFiles } from "./FileHandlers";
import webSocket from "./WebSocket";
import { GenID } from "./utils";
import { setDialogOpen } from "../State/DialogSlice";

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
        this.createPeerConnection();
        break;
      case "connecting":
        store.dispatch(setDialogOpen({ dialog: "informationDialog", open: true }));
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

    ev.channel.binaryType = "arraybuffer";
    ev.channel.addEventListener("message", (ev) => receiveFile(ev.data, label));
  }

  registerAmstel(channel: RTCDataChannel) {
    this.amstel = channel;
    channel.addEventListener("open", () => store.dispatch(setConnectionState("connected")));
    channel.addEventListener("close", () => store.dispatch(setConnectionState("disconnected")));
    channel.addEventListener("message", this.onAmstelMessage.bind(this));
  }

  onAmstelMessage(ev: MessageEvent) {
    const body = JSON.parse(ev.data) as WRTCMessageBody;
    if (body.type == "close") {
      this.close();
    }
  }

  sendAmstelMessage(body: WRTCMessageBody) {
    const data = JSON.stringify(body);
    this.amstel.send(data);
  }

  createDataChannel(): Promise<RTCDataChannel> {
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
      if (channel.label == label) channel.close();
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

  close() {
    this.pc.close();
    this.createPeerConnection();
  }
}

export default new WebRTC();
