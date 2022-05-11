import IDDisplay from "./Controls/IDDisplay";
import IdentityConfig from "./Controls/IdentityConfig";
import ReceivedFileDisplay from "./Controls/ReceivedFileDisplay";

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
        <ReceivedFileDisplay />
      </section>
    </header>
  );
}
