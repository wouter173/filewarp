export type Payload<T> = {
  payload: T;
};

export type Metadata = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};
