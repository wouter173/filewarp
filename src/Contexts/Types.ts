export type WSMessageEvent = {
  data: string;
};

export type WSMessageBody = WSMessageMeta<any> & {
  sen: string;
  rec: string;
};

export type WSMessageMeta<T> = {
  type: "hello" | "offer" | "accept" | "nic";
  data: T;
};

export type WSMessageData = {
  sdp: any;
};

export type WSOfferData = WSMessageData & {
  nickname: string;
};
