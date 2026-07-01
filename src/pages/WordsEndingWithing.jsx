import { useMemo, useState } from "react";
import englishWords from "an-array-of-english-words";

// A more reliable modern shuffle slice 
function getShuffledWords(words, limit = 250) {
  return [...words].sort(() => Math.random() - 0.5).slice(0, limit);
}

export default function WordsEndingWithing() {
  const [startingLetter, setStartingLetter] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Clean the input to ensure it's just a single lowercase letter
  const cleanLetter = startingLetter.toLowerCase().replace(/[^a-z]/g, "").slice(0, 1);

  const words = useMemo(() => {
    // Filter down to only words that end in "ing"
    const ingWords = englishWords.filter((word) => 
      /^[a-z]+$/.test(word) && word.toLowerCase().endsWith("ing")
    );

    // If the user typed a starting letter, filter by it
    const filteredWords = cleanLetter
      ? ingWords.filter((word) => word.toLowerCase().startsWith(cleanLetter))
      : ingWords;

    return getShuffledWords(filteredWords, 250);
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
              Words Ending With &ldquo;ing&rdquo;
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Discover English words ending in <strong>-ing</strong>. Optional: Type a letter to filter by how the word starts!
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_10px_40px_rgba(34,211,238,0.15)]">
            <label className="mb-3 block text-sm font-semibold text-slate-200">
              Filter by starting letter (Optional)
            </label>

            <input
              value={startingLetter}
              onChange={(e) => setStartingLetter(e.target.value)}
              placeholder="Example: r (for running, reading...)"
              maxLength={1}
              className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 text-xl font-bold tracking-widest text-cyan-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-400">
                {cleanLetter ? (
                  <>
                    Showing &ldquo;-ing&rdquo; words starting with:{" "}
                    <span className="font-bold uppercase text-cyan-300">
                      {cleanLetter}
                    </span>
                  </>
                ) : (
                  'Showing random "-ing" words'
                )}
              </div>

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
                No words found ending in &ldquo;-ing&rdquo; with that starting letter.
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