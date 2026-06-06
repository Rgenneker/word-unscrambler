import { useMemo, useState } from "react";
import englishWords from "an-array-of-english-words";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function shuffle(words) {
  return [...words].sort(() => Math.random() - 0.5);
}

export default function WordLength() {
  const [length, setLength] = useState("5");
  const [refreshKey, setRefreshKey] = useState(0);

  const words = useMemo(() => {
    return shuffle(
      englishWords.filter((word) => /^[a-z]+$/.test(word) && word.length === Number(length))
    ).slice(0, 250);
  }, [length, refreshKey]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-black text-cyan-300">Words by Length</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
              Choose a word length and generate English words that match.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <label className="mb-3 block text-sm font-semibold text-slate-200">
              Choose word length
            </label>

            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 text-cyan-200 outline-none"
            >
              {Array.from({ length: 14 }, (_, i) => i + 2).map((num) => (
                <option key={num} value={num}>{num} letters</option>
              ))}
            </select>

            <button
              onClick={() => setRefreshKey((v) => v + 1)}
              className="mt-5 rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300"
            >
              Refresh Words
            </button>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="mb-6 text-2xl font-black text-cyan-200">
              {length}-Letter Words
            </h2>

            <div className="flex flex-wrap gap-3">
              {words.map((word) => (
                <span key={`${word}-${refreshKey}`} className="rounded-2xl border border-cyan-400/20 bg-slate-800 px-4 py-2 font-semibold text-slate-200">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}