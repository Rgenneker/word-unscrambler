import { useMemo, useState } from "react";
import englishWords from "an-array-of-english-words";

function shuffleWords(words) {
  return [...words].sort(() => 0.5 - Math.random());
}

export default function WordsStartingWith() {
  const [letter, setLetter] = useState("a");
  const [refreshKey, setRefreshKey] = useState(0);

  const cleanLetter = letter.toLowerCase().replace(/[^a-z]/g, "").slice(0, 1);

  const words = useMemo(() => {
    if (!cleanLetter) return [];

    return shuffleWords(
      englishWords
        .filter((word) => /^[a-z]+$/.test(word))
        .filter((word) => word.toLowerCase().startsWith(cleanLetter))
    ).slice(0, 250);
  }, [cleanLetter, refreshKey]);

  function refreshWords() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed left-[30px] top-[90px] z-50 hidden xl:block">
  
</div>
            <div className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-black text-cyan-300">
              Words Starting With
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Type any letter to find English words that start with that letter.
              Refresh the list to generate a new set of words.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_10px_40px_rgba(34,211,238,0.15)]">
            <label className="mb-3 block text-sm font-semibold text-slate-200">
              Enter starting letter
            </label>

            <input
              value={letter}
              onChange={(e) => {
                setLetter(e.target.value);
                setRefreshKey((current) => current + 1);
              }}
              placeholder="Example: a"
              maxLength={1}
              className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 text-xl font-bold tracking-widest text-cyan-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-400">
                Showing words starting with:{" "}
                <span className="font-bold uppercase text-cyan-300">
                  {cleanLetter || "—"}
                </span>
              </p>

              <button
                type="button"
                onClick={refreshWords}
                className="rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:scale-105 hover:bg-cyan-300"
              >
                Refresh Words
              </button>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-cyan-200">
                Results
              </h2>

              <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                {words.length} words
              </span>
            </div>

            {words.length === 0 ? (
              <p className="text-slate-400">
                Enter a letter to generate words.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {words.map((word) => (
                  <span
                    key={`${word}-${refreshKey}`}
                    className="rounded-2xl border border-cyan-400/20 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                  >
                    {word}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
          </main>
  );
}