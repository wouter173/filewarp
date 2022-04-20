import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DocumentTextIcon } from "@heroicons/react/outline";

export default function FileTray() {
  const files = useSelector((state: { files: File[] }) => state.files);
  const trayListRef = useRef<HTMLUListElement>(null);
  const [trayListBottom, setTrayListBottom] = useState(false);

  const trayListScroll = (ev: React.UIEvent<HTMLUListElement>) => {
    const target = ev.target as HTMLUListElement;
    const trayListScrollOffset = target.scrollHeight - target.scrollTop - 200;

    setTrayListBottom(trayListScrollOffset <= 0);
  };

  if (files.length == 0) return <></>;
  return (
    <div className="relative w-[500px] bg-slate-100 rounded-md p-4 mb-8">
      <div
        className={`
          ${files.length > 10 && !trayListBottom ? "opacity-100" : "opacity-0"}
          absolute bg-gradient-to-t from-slate-200 to-transparent w-full h-1/2 bottom-0 left-0 
          rounded-md pointer-events-none transition-opacity 
        `}
      ></div>

      <ul
        onScroll={trayListScroll}
        className="grid grid-cols-5 gap-2 max-h-48 overflow-scroll"
      >
        {files.map((file) => (
          <li className=" grid text-center p-2 rounded-md">
            <DocumentTextIcon className="mx-auto w-12 h-12 text-indigo-400 stroke-2" />
            <p
              className="text-xs"
              style={{
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
              }}
            >
              {file.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
