import React, { useRef, useState } from "react";
import { FolderIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../State/FileSlice";

export default function () {
  const [filehover, setFilehover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const files = useSelector<{ files: [] }>((state) => state.files) as [];
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        {files.map((a: File) => {
          return <p>{a.name}</p>;
        })}
      </div>

      <label
        onDragEnter={() => setFilehover(true)}
        onDragLeave={() => setFilehover(false)}
        onBlur={() => setFilehover(false)}
        onDrop={() => setFilehover(false)}
        className={`
          ${filehover ? "bg-indigo-50" : ""}
          bg-slate-50 hover:bg-slate-100
          relative flex flex-col items-center justify-center border-dashed rounded-lg border-[4px] border-indigo-400 mb-8 py-24 cursor-pointer transition-colors
        `}
      >
        <input
          onChange={() => {
            dispatch(addFiles(inputRef.current!.files));
          }}
          ref={inputRef}
          type="file"
          className="bg-black w-full h-full absolute opacity-0"
        />
        <FolderIcon className="h-16 w-16 text-indigo-500 stroke-[1.4]"></FolderIcon>
        <p className="font-semibold">Upload files</p>
        <p className="text-gray-400 text-sm">(click or drag)</p>
      </label>
      <button className="min-w-[500px] w-full py-3 px-32 bg-indigo-500 text-white text-sm font-semibold rounded-lg">
        Warp!
      </button>
    </div>
  );
}
