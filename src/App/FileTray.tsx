import React from "react";
import { useSelector } from "react-redux";
import { DocumentTextIcon } from "@heroicons/react/outline";

export default function FileTray() {
  const files = useSelector((state: { files: File[] }) => state.files);

  return (
    <div className="w-[500px] bg-slate-100 rounded-md p-4 mb-8">
      <ul className="grid grid-cols-5 gap-2">
        {files.map((file) => (
          <li className="bg-white grid text-center p-2 rounded-md">
            <DocumentTextIcon className="mx-auto w-12 h-12 text-indigo-400 stroke-2" />
            <p className="truncate text-xs">{file.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
