import { iceServers } from "./ice";
import { WSMessageData, WSMessageMeta, WSOfferData } from "./Types";
import store from "../State/Store";

class webRTC {
  private pc: RTCPeerConnection;

  constructor() {
    this.pc = new RTCPeerConnection({ iceServers });
    this.pc.addEventListener("icecandidate", this.handleIceCandidate);
    this.pc.addEventListener("connectionstatechange", this.handleConnectionChange);
  }

  handleConnectionChange() {
    console.log(this.pc.connectionState);
  }

  handleIceCandidate(ev: RTCPeerConnectionIceEvent) {
    console.log(ev.candidate);
  }

  createOffer = async () => {
    return new Promise<WSMessageMeta<WSOfferData>>(async (resolve, reject) => {
      const identities = store.getState().identity;

      const offer = await this.pc.createOffer();
      const data: WSMessageMeta<WSOfferData> = {
        type: "offer",
        data: { nickname: identities.local.nickname, sdp: offer },
      };

      resolve(data);
    });
  };

  handleOffer = async () => {
    return new Promise<void>(async (resolve, reject) => {
      const offer = store.getState().connection.offer;
      if (!offer) return reject(new Error("No Offer available."));

      const desc = new RTCSessionDescription(offer);
      await this.pc.setRemoteDescription(desc);

      resolve();
    });
  };

  createAccept = async () => {
    return new Promise<WSMessageMeta<WSMessageData>>(async (resolve, reject) => {
      const answer = await this.pc.createAnswer();
      await this.pc.setLocalDescription(answer);

      const data: WSMessageMeta<WSMessageData> = {
        type: "accept",
        data: { sdp: answer },
      };

      resolve(data);
    });

    const handleAccept = async () => {};
  };
}

export default new webRTC();
