import { addReceivedFile } from "../State/FileSlice";
import store from "../State/Store";
import WebRTC from "./WebRTC";

const META_HEADER = "METADATA\n";
const chunkSize = 16384;

export type Metadata = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

export const sendFile = async (file: File) => {
  const dc = await WebRTC.createDataChannel();

  const metadata: Metadata = {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
  };

  const body = new TextEncoder().encode(META_HEADER + JSON.stringify(metadata));
  dc.send(body);

  let offset = 0;
  const reader = new FileReader();
  reader.addEventListener("load", (ev: ProgressEvent<FileReader>) => {
    const res = ev.target!.result as ArrayBuffer;
    dc.send(res);
    offset += res.byteLength;

    if (file.size > offset) {
      const slice = file.slice(offset, offset + chunkSize);
      reader.readAsArrayBuffer(slice);
    }
  });

  const slice = file.slice(offset, offset + chunkSize);
  reader.readAsArrayBuffer(slice);
};

let receivedData: { [label: string]: { metadata: Metadata; buffers: ArrayBuffer[] } } = {};

export const receiveFile = async (buffer: ArrayBuffer, label: string): Promise<void> => {
  const decoder = new TextDecoder();
  const header = buffer.slice(0, META_HEADER.length);

  if (decoder.decode(header) == META_HEADER) {
    const content = buffer.slice(META_HEADER.length);
    const body = decoder.decode(content);
    const metadata = JSON.parse(body) as Metadata;

    receivedData[label] = { metadata, buffers: [] };
    return;
  }

  const { metadata, buffers } = receivedData[label];

  buffers.push(buffer);
  const receiveBufferSize = buffers.reduce((acc, cur) => (acc += cur.byteLength), 0);

  if (receiveBufferSize === metadata.size) {
    const file = new File(buffers, metadata.name, {
      type: metadata.type,
      lastModified: metadata.lastModified,
    });

    store.dispatch(addReceivedFile({ file }));
    WebRTC.removeDataChannel(label);
  }
};

export const sendFiles = () => {
  const files = store.getState().files.localFiles;
  for (let file of files) {
    sendFile(file);
  }
};
