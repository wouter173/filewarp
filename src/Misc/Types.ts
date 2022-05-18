export type WSMessageEvent = {
  data: string;
};

export type WSMessageBody = WSMessageMeta<any> & {
  sen: string;
  rec: string;
};

export type WSMessageMeta<T> = {
  type: "hello" | "propose" | "engage" | "offer" | "accept" | "nic";
  data: T;
};

export type WSMessageData = {
  sdp: any;
};

export type WSProposeData = {
  nickname: string;
  fileCount: number;
};

export type WRTCMessageBody = {
  type: "close";
};

export type Metadata = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

export type FilePart = {
  metadata: Metadata;
  buffers: ArrayBuffer[];
  bufferSize: number;
  file: File | null;
};
