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
};

export type Metadata = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};
