import FileInput from "./FileInput";
import FileTray from "./FileTray";
import Header from "./Header";

export default function App() {
  return (
    <section className="flex items-center justify-center w-full min-h-screen py-8 bg-slate-100">
      <main className="bg-white shadow-sm rounded-lg p-8">
        <Header />
        <FileTray />
        <FileInput />
      </main>
    </section>
  );
}
