import React from "react";
import IdentityConfig from "./Controls/IdentityConfig";
import { FolderDownloadIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { IdentityPair } from "../State/IdentitySlice";

export default function Header() {
  const id = useSelector((state: { identity: IdentityPair }) => state.identity.local.ID);

  return (
    <header className="mb-12 grid grid-cols-2">
      <section>
        <h1 className="font-bold text-2xl">Filewarp.io</h1>
        <p>p2p file transfer</p>
      </section>
      <section className="flex justify-end gap-2 h-min">
        <button
          onClick={() => navigator.clipboard.writeText(id)}
          className="flex items-center bg-slate-100 px-3 py-2 rounded-md hover:bg-slate-200 transition-colors focusable"
        >
          <p className="flex min-w-[80px]">
            <span className="font-semibold mr-1">ID: </span>
            <span>{id ? id : "******"}</span>
          </p>
        </button>
        <IdentityConfig />
        <button className="h-10 w-10 text-indigo-500 bg-slate-100 p-2 rounded-md hover:bg-slate-200 transition-colors focusable">
          <FolderDownloadIcon />
        </button>
      </section>
    </header>
  );
}
