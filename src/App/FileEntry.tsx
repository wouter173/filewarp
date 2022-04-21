import React, { useState } from "react";
import { DocumentTextIcon, XIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { removeFile } from "../State/FileSlice";

type Props = {
  file: File;
};

export default function FileEntry(props: Props) {
  const [hovering, setHovering] = useState(false);
  const dispatch = useDispatch();

  return (
    <li
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="max-h-24 max-w-24 relative grid text-center p-2 rounded-md z-10 aspect-square hover:bg-white"
    >
      <button
        onClick={() => dispatch(removeFile({ file: props.file }))}
        className={`
          ${hovering ? "opacity-100" : "opacity-0"}
          bg-red-500 hover:bg-red-600
          z-20 absolute right-1 top-1 w-5 h-5 text-white flex 
          justify-center items-center rounded-full transition-all
        `}
      >
        <XIcon className="h-4 w-4" />
      </button>
      <div className="block row-start-1 row-end-1">
        <DocumentTextIcon className="w-2/3 mx-auto aspect-square text-indigo-400 stroke-2" />
      </div>
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
        {props.file.name}
      </p>
    </li>
  );
}
