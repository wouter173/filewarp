import { FolderDownloadIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { FilePair } from "../../State/FileSlice";

export default function ReceivedFileDisplay() {
  const receivedFiles = useSelector((state: { files: FilePair }) => state.files.receivedFiles);

  const downloadFile = async () => {
    const file = receivedFiles[0];
    console.log(await file.text());
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(receivedFiles[0]);
    a.href = url;
    a.setAttribute("download", file.name);
    a.click();
  };

  return (
    <button
      onClick={downloadFile}
      className="h-10 w-10 text-indigo-500 bg-slate-100 p-2 rounded-md hover:bg-slate-200 transition-colors focusable"
    >
      <FolderDownloadIcon />
    </button>
  );
}
