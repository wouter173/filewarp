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
        onDrop={() => setFilehover(false)}
        className={`
          ${filehover ? "bg-indigo-50" : ""}
          ${fileCount > 0 ? "py-4" : "py-24 flex-col"}
          bg-slate-50 hover:bg-slate-100
          border-indigo-400 hover:border-indigo-500
          border-[4px] border-dashed rounded-lg
          relative flex items-center justify-center  
           mb-8 cursor-pointer transition-colors
        `}
      >
        <input
          onChange={() => {
            dispatch(addFiles({ files: inputRef.current!.files }));
          }}
          ref={inputRef}
          type="file"
          className="bg-black w-full h-full absolute opacity-0 cursor-pointer"
          multiple
        />
        <FolderIcon className="h-16 w-16 text-indigo-500 stroke-[1.4]"></FolderIcon>
        <div>
          <p className="font-semibold">Upload files</p>
          <p className="text-gray-400 text-sm">(click or drag)</p>
        </div>
      </label>
    </div>
  );
}
