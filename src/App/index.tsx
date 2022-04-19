import FileInput from "./FileInput";
import Header from "./Header";

export default function App() {
  return (
    <section className="flex items-center justify-center w-full h-screen bg-slate-100">
      <main className="bg-white shadow-sm rounded-lg p-8">
        <Header />
        <FileInput />
      </main>
    </section>
  );
}
