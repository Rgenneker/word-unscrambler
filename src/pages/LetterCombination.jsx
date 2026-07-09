import { useMemo, useState } from "react";
import englishWords from "an-array-of-english-words";

function clean(value) {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function shuffle(words) {
  return [...words].sort(() => Math.random() - 0.5);
}

export default function LetterCombination() {
  const [startsWith, setStartsWith] = useState("str");
  const [endsWith, setEndsWith] = useState("ing");
  const [contains, setContains] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const words = useMemo(() => {
    const start = clean(startsWith);
    const end = clean(endsWith);
    const middle = clean(contains);

    return shuffle(
      englishWords
        .filter((word) => /^[a-z]+$/.test(word))
        .filter((word) => !start || word.startsWith(start))
        .filter((word) => !end || word.endsWith(end))
        .filter((word) => !middle || word.includes(middle))
    ).slice(0, 250);
  }, [startsWith, endsWith, contains, refreshKey]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-black text-cyan-300">
              Letter Combination Finder
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
              Find words using custom combinations, such as words starting with STR and ending in ING.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 md:grid-cols-3">
            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-300">Starts with</span>
              <input value={startsWith} onChange={(e) => setStartsWith(e.target.value)} placeholder="str" className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 text-cyan-200 outline-none" />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-300">Contains</span>
              <input value={contains} onChange={(e) => setContains(e.target.value)} placeholder="optional" className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 text-cyan-200 outline-none" />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-300">Ends with</span>
              <input value={endsWith} onChange={(e) => setEndsWith(e.target.value)} placeholder="ing" className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 text-cyan-200 outline-none" />
            </label>

            <button
              onClick={() => setRefreshKey((v) => v + 1)}
              className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300 md:col-span-3"
            >
              Refresh Words
            </button>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-cyan-200">Results</h2>
              <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                {words.length} words
              </span>
            </div>

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
                  
    </main>
  );
}