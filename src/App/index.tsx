import ConfirmDialog from "./Dialogs/ConfirmationDialog";
import EngageDialog from "./Dialogs/EngageDialog";
import InformationDialog from "./Dialogs/InformationDialog";
import SendDialog from "./Dialogs/SendDialog";
import FileInput from "./FileInput";
import FileTray from "./FileTray";
import Header from "./Header";
import NextButton from "./NextButton";

export default function App() {
  return (
    <section className="flex items-center justify-center w-full min-h-screen py-8 bg-slate-100">
      <main className="bg-white shadow-sm rounded-lg p-8 min-w-min w-2/5">
        <Header />
        <FileTray />
        <FileInput />
        <NextButton />
      </main>
      <EngageDialog />
      <SendDialog />
      <ConfirmDialog />
      <InformationDialog />
    </section>
  );
}
