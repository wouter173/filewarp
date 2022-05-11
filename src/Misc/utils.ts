const DELIMITER = "\nENDMETA\n";

export type Metadata = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

export const encodeFile = async (file: File) => {
  const content = await file.text();

  const metadata: Metadata = {
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
  };

  const body = new TextEncoder().encode(JSON.stringify(metadata) + DELIMITER + content);
  return body.buffer;
};

export const decodeFile = async (blob: Blob): Promise<File> => {
  const body = await blob.arrayBuffer();
  const data = new TextDecoder().decode(body);

  const [rawMeta, content] = data.split(DELIMITER);
  const meta = JSON.parse(rawMeta) as Metadata;

  const file = new File([content], meta.name, { type: meta.type, lastModified: meta.lastModified });
  //TODO: sizes dont match find out why
  console.log(file.size, meta.size);

  return file;
};
