import { addFilePart, addFileToFilePart, appendBufferToFilePart } from "../State/ReceivedFileSlice";
import store from "../State/Store";
import { Metadata } from "../State/Types";
import WebRTC from "./WebRTC";

const META_HEADER = "METADATA\n";
const chunkSize = 16384;

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

export const receiveFile = async (buffer: ArrayBuffer, label: string) => {
  const decoder = new TextDecoder();
  const header = buffer.slice(0, META_HEADER.length);

  if (decoder.decode(header) == META_HEADER) {
    const content = buffer.slice(META_HEADER.length);
    const body = decoder.decode(content);
    const metadata = JSON.parse(body) as Metadata;
    store.dispatch(addFilePart({ label, metadata }));
    return;
  }

  store.dispatch(appendBufferToFilePart({ label, buffer }));
  const { metadata, buffers } = store.getState().receivedFileParts.filter((filepart) => filepart.label == label)[0];
  const receiveBufferSize = buffers.reduce((acc, cur) => (acc += cur.byteLength), 0);

  if (receiveBufferSize === metadata.size) {
    const file = new File(buffers, metadata.name, {
      type: metadata.type,
      lastModified: metadata.lastModified,
    });

    store.dispatch(addFileToFilePart({ label, file }));
    WebRTC.removeDataChannel(label);
  }
};

export const sendAllFiles = () => {
  const files = store.getState().localFiles;
  for (let file of files) {
    sendFile(file);
  }
};
