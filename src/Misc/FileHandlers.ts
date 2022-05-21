import {
  addReceivedFileEntry,
  setReceivedFileEntryFileUrl,
  setReceivedFileEntryProgress,
} from "../State/ReceivedFileSlice";
import store from "../State/Store";
import { FilePart, Metadata } from "./Types";
import WebRTC from "./WebRTC";

const META_HEADER = "METADATA\n";
const chunkSize = 16384;

const fileparts: { [label: string]: FilePart } = {};

export const receiveFile = async (buffer: ArrayBuffer, label: string) => {
  const decoder = new TextDecoder();
  const header = buffer.slice(0, META_HEADER.length);

  if (decoder.decode(header) == META_HEADER) {
    const content = buffer.slice(META_HEADER.length);
    const body = decoder.decode(content);
    const metadata = JSON.parse(body) as Metadata;

    fileparts[label] = { metadata, bufferSize: 0, buffers: [], file: null };
    store.dispatch(addReceivedFileEntry({ label, data: metadata }));

    return;
  }

  const metadata = fileparts[label].metadata;
  const buffers = fileparts[label].buffers;

  buffers.push(buffer);
  fileparts[label].bufferSize += buffer.byteLength;

  store.dispatch(setReceivedFileEntryProgress({ label, data: (fileparts[label].bufferSize / metadata.size) * 100 }));

  if (fileparts[label].bufferSize === metadata.size) {
    const file = new File(buffers, metadata.name, {
      type: metadata.type,
      lastModified: metadata.lastModified,
    });

    const objectUrl = window.URL.createObjectURL(file);
    store.dispatch(setReceivedFileEntryFileUrl({ label, data: objectUrl }));
    WebRTC.removeDataChannel(label);

    checkFilesSent();
  }
};

const checkFilesSent = () => {
  const receivedEntries = Object.values(store.getState().receivedFileEntries);
  const doneEntries = receivedEntries.filter((entry) => entry.fileUrl != null);

  const proposedFileCount = store.getState().identity.peer.sendFileCount;

  if (doneEntries.length == proposedFileCount) {
    WebRTC.closeAmstel();
  }
};

export const sendFile = async (file: File) => {
  const dc = await WebRTC.createFileChannel();

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
    //sometimes the webrtc datachannel buffer is full,
    //in which case we wait for 20ms and try again
    if (dc.bufferedAmount > 0) return setTimeout(readBuffer, 20);
    const res = ev.target!.result as ArrayBuffer;

    dc.send(res);
    offset += res.byteLength;

    if (file.size > offset) {
      return readBuffer();
    }
  });

  const readBuffer = () => {
    const slice = file.slice(offset, offset + chunkSize);
    reader.readAsArrayBuffer(slice);
  };

  readBuffer();
};

export const sendAllFiles = async () => {
  const files = store.getState().localFiles;

  for (let file of files) {
    sendFile(file);
  }
};
