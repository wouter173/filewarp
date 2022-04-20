import {
  FolderDownloadIcon,
  RefreshIcon,
  UserIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useSelector } from "react-redux";
import { Identity } from "../State/IdentitySlice";

export default function Header() {
  const id = useSelector((state: { identity: Identity }) => state.identity.id);

  return (
    <header className="mb-12 grid grid-cols-2">
      <h1 className="font-bold text-2xl col-start-1">Filewarp.io</h1>
      <p className="col-start-1">p2p file transfer</p>
      <div className="col-start-2 row-start-1 flex justify-end gap-2">
        <button className="flex items-center bg-slate-100 px-3 py-2 rounded-md hover:bg-slate-200 transition-colors">
          <p className="min-w-[80px]">
            <span className="font-semibold">ID: </span>
            <span>{id ? id : "______"}</span>
          </p>
        </button>
        <button className="h-10 w-10 text-indigo-500 bg-slate-100 p-2 rounded-md hover:bg-slate-200 transition-colors">
          <FolderDownloadIcon />
        </button>
      </div>
    </header>
  );
}
