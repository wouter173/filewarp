import FileInput from "./FileInput";
import FileTray from "./FileTray";
import Header from "./Header";

export default function App() {
  return (
    <section className="flex items-center justify-center w-full min-h-screen py-8 bg-slate-100">
      <main className="bg-white shadow-sm rounded-lg p-8 min-w-min w-2/5">
        <Header />
        <FileTray />
        <FileInput />
        <button className="min-w-[500px] w-full py-3 px-32 bg-indigo-500 text-white text-sm font-semibold rounded-lg">
          Next
        </button>
      </main>
    </section>
  );
}
