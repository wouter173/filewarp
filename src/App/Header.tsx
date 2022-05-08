import { FolderDownloadIcon } from "@heroicons/react/outline";
import IDDisplay from "./Controls/IDDisplay";
import IdentityConfig from "./Controls/IdentityConfig";

export default function Header() {
  return (
    <header className="mb-12 grid grid-cols-2">
      <section>
        <h1 className="font-bold text-2xl">Filewarp.io</h1>
        <p>p2p file transfer</p>
      </section>
      <section className="flex justify-end gap-2 h-min">
        <IDDisplay />
        <IdentityConfig />
        <button className="h-10 w-10 text-indigo-500 bg-slate-100 p-2 rounded-md hover:bg-slate-200 transition-colors focusable">
          <FolderDownloadIcon />
        </button>
      </section>
    </header>
  );
}
