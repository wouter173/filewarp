import React, { useRef, useState } from "react";
import { FolderIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { addFiles } from "../State/FileSlice";

export default function () {
  const [filehover, setFilehover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const fileCount = useSelector(
    (state: { files: File[] }) => state.files.length
  );

  return (
    <div>
      <label
        onDragEnter={() => setFilehover(true)}
        onDragLeave={() => setFilehover(false)}
        onBlur={() => setFilehover(false)}
        onDrop={() => setFilehover(false)}
        className={`
          ${filehover ? "bg-indigo-50" : ""}
          ${fileCount > 0 ? "py-4" : "py-24 flex-col"}
          bg-slate-50 hover:bg-slate-100
          relative flex items-center justify-center border-dashed rounded-lg border-[4px] border-indigo-400 mb-8 cursor-pointer transition-colors
        `}
      >
        <input
          onChange={() => {
            dispatch(addFiles({ files: inputRef.current!.files }));
          }}
          ref={inputRef}
          type="file"
          className="bg-black w-full h-full absolute opacity-0"
          multiple
        />
        <FolderIcon className="h-16 w-16 text-indigo-500 stroke-[1.4]"></FolderIcon>
        <div>
          <p className="font-semibold">Upload files</p>
          <p className="text-gray-400 text-sm">(click or drag)</p>
        </div>
      </label>
      <button className="min-w-[500px] w-full py-3 px-32 bg-indigo-500 text-white text-sm font-semibold rounded-lg">
        Warp!
      </button>
    </div>
  );
}
