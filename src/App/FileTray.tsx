import { useState, UIEvent } from "react";
import { useSelector } from "react-redux";
import { Store } from "../State/Store";
import FileEntry from "./FileEntry";

export default function FileTray() {
  const files = useSelector((state: Store) => state.localFiles);
  const [trayListBottom, setTrayListBottom] = useState(false);

  const trayListScroll = (ev: UIEvent<HTMLUListElement>) => {
    const target = ev.target as HTMLUListElement;
    const trayListScrollOffset = target.scrollHeight - target.scrollTop - 200;

    setTrayListBottom(trayListScrollOffset <= 0);
  };

  if (files.length == 0) return <></>;
  return (
    <div className="relative bg-slate-100 rounded-md p-4 mb-8">
      <div
        className={`
          ${files.length > 10 && !trayListBottom ? "opacity-100" : "opacity-0"}
          absolute bg-gradient-to-t from-slate-200 to-transparent w-full h-1/2 bottom-0 left-0 
          rounded-md pointer-events-none transition-opacity z-30
        `}
      ></div>

      <ul
        onScroll={trayListScroll}
        className="grid gap-2 max-h-48 overflow-scroll"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(80px,1fr))",
        }}
      >
        {files.map((file) => (
          <FileEntry file={file} key={file.name} />
        ))}
      </ul>
    </div>
  );
}
