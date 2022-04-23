import { useDispatch } from "react-redux";
import { setSendDialog } from "../State/DialogSlice";
import FileInput from "./FileInput";
import FileTray from "./FileTray";
import Header from "./Header";
import SendDialog from "./SendDialog";

export default function App() {
  const dispatch = useDispatch();

  return (
    <section className="flex items-center justify-center w-full min-h-screen py-8 bg-slate-100">
      <main className="bg-white shadow-sm rounded-lg p-8 min-w-min w-2/5">
        <Header />
        <FileTray />
        <FileInput />
        <button
          onClick={() => dispatch(setSendDialog(true))}
          className="min-w-[500px] w-full py-3 px-32 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Next
        </button>
      </main>

      <SendDialog />
    </section>
  );
}
