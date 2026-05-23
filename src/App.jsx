import React, { useMemo, useState } from "react";
import englishWords from "an-array-of-english-words";
import {
  Search,
  Shuffle,
  SlidersHorizontal,
  RotateCcw,
  Copy,
  Check,
  Trophy,
  X
} from "lucide-react";

const LETTER_SCORES = {
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  k: 5,
  l: 1,
  m: 3,
  n: 1,
  o: 1,
  p: 3,
  q: 10,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  w: 4,
  x: 8,
  y: 4,
  z: 10
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

function cleanLetters(value) {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function cleanPattern(value) {
  return value.toLowerCase().replace(/[^a-z?_.]/g, "");
}

function getScore(word) {
  return word
    .toLowerCase()
    .split("")
    .reduce((total, letter) => total + (LETTER_SCORES[letter] || 0), 0);
}

function canBuildWord(word, availableLetters) {
  const letters = availableLetters.split("");

  for (const char of word) {
    const index = letters.indexOf(char);
    if (index === -1) return false;
    letters.splice(index, 1);
  }

  return true;
}

function patternMatches(word, pattern) {
  if (!pattern) return true;
  if (word.length !== pattern.length) return false;

  return pattern.split("").every((char, index) => {
    return char === "?" || char === "_" || char === "." || char === word[index];
  });
}

function vowelFilterMatches(word, filter) {
  if (!filter) return true;

  const vowelCount = word.split("").filter((letter) => VOWELS.has(letter)).length;
  const consonantCount = word.length - vowelCount;
  const startsWithVowel = VOWELS.has(word[0]);
  const endsWithVowel = VOWELS.has(word[word.length - 1]);

  if (filter === "has-vowel") return vowelCount > 0;
  if (filter === "no-vowels") return vowelCount === 0;
  if (filter === "more-vowels") return vowelCount > consonantCount;
  if (filter === "more-consonants") return consonantCount > vowelCount;
  if (filter === "starts-vowel") return startsWithVowel;
  if (filter === "starts-consonant") return !startsWithVowel;
  if (filter === "ends-vowel") return endsWithVowel;
  if (filter === "ends-consonant") return !endsWithVowel;

  return true;
}

const DICTIONARY = englishWords
  .filter((word) => /^[a-z]+$/.test(word) && word.length >= 2)
  .map((word) => ({
    word,
    score: getScore(word)
  }));

export default function App() {
  const [letters, setLetters] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [containsLetters, setContainsLetters] = useState("");
  const [wordLength, setWordLength] = useState("");
  const [exactPattern, setExactPattern] = useState("");
  const [excludeLetters, setExcludeLetters] = useState("");
  const [vowelFilter, setVowelFilter] = useState("");
  const [definitions, setDefinitions] = useState({});
  const [loadingDefinition, setLoadingDefinition] = useState("");
  const [copied, setCopied] = useState(false);

  const availableLetters = cleanLetters(letters);
  const cleanStarts = cleanLetters(startsWith);
  const cleanEnds = cleanLetters(endsWith);
  const cleanContains = cleanLetters(containsLetters);
  const cleanExclude = cleanLetters(excludeLetters);
  const cleanExactPattern = cleanPattern(exactPattern);

  const results = useMemo(() => {
    if (!hasSearched || availableLetters.length < 2) return [];

    return DICTIONARY.filter(({ word }) => {
      const matchesLetters = canBuildWord(word, availableLetters);
      const matchesStarts = !cleanStarts || word.startsWith(cleanStarts);
      const matchesEnds = !cleanEnds || word.endsWith(cleanEnds);
      const matchesContains = !cleanContains || cleanContains.split("").every((letter) => word.includes(letter));
      const matchesLength = !wordLength || word.length === Number(wordLength);
      const matchesPattern = patternMatches(word, cleanExactPattern);
      const matchesExclude = !cleanExclude || !cleanExclude.split("").some((letter) => word.includes(letter));
      const matchesVowelFilter = vowelFilterMatches(word, vowelFilter);

      return (
        matchesLetters &&
        matchesStarts &&
        matchesEnds &&
        matchesContains &&
        matchesLength &&
        matchesPattern &&
        matchesExclude &&
        matchesVowelFilter
      );
    }).sort((a, b) => b.score - a.score || b.word.length - a.word.length || a.word.localeCompare(b.word));
  }, [
    hasSearched,
    availableLetters,
    cleanStarts,
    cleanEnds,
    cleanContains,
    cleanExclude,
    cleanExactPattern,
    wordLength,
    vowelFilter
  ]);

  const totalPoints = useMemo(() => {
    return results.reduce((total, item) => total + item.score, 0);
  }, [results]);

  async function fetchDefinition(word) {
    if (definitions[word] || loadingDefinition === word) return;

    try {
      setLoadingDefinition(word);
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      const definition = data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found.";

      setDefinitions((current) => ({
        ...current,
        [word]: definition
      }));
    } catch {
      setDefinitions((current) => ({
        ...current,
        [word]: "Definition unavailable."
      }));
    } finally {
      setLoadingDefinition("");
    }
  }

  function generateWords() {
    setHasSearched(true);
    setCopied(false);
  }

  function clearLetters() {
    setLetters("");
    setHasSearched(false);
    setCopied(false);
  }

  function resetFilters() {
    setStartsWith("");
    setEndsWith("");
    setContainsLetters("");
    setWordLength("");
    setExactPattern("");
    setExcludeLetters("");
    setVowelFilter("");
  }

  async function copyResults() {
    if (!results.length) return;

    const text = results.map((item) => `${item.word} (${item.score} pts)`).join("\\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function useExample(value) {
    setLetters(value);
    setHasSearched(true);
    setCopied(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),linear-gradient(180deg,#020617,#0F172A)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900/60 ring-1 ring-white/15">
              <Shuffle className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-lg font-bold"><WordShuffl></WordShuffl></p>
              <p className="text-xs text-slate-400">Smart word unscrambler</p>
            </div>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-slate-900/50 px-4 py-2 text-sm text-slate-200 sm:block">
            Score-ranked • Fast • Mobile-friendly
          </div>
        </header>

        <section className="grid gap-8 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:pt-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              <Trophy className="h-4 w-4" />
              Find the highest-scoring words first
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Unscramble letters into real English words.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              Type or paste letters, generate valid words, refine the results, and copy the final list with scores.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-[0_10px_40px_rgba(34,211,238,0.15)] sm:p-6">
              <label htmlFor="letters" className="mb-3 block text-sm font-semibold text-slate-100">
                Enter your letters
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="letters"
                    value={letters}
                    onChange={(event) => setLetters(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") generateWords();
                    }}
                    placeholder="Example: listen"
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/70 pl-12 pr-12 text-lg font-semibold tracking-widest text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10"
                  />
                  {letters && (
                    <button
                      type="button"
                      onClick={clearLetters}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={generateWords}
                    className="h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-7 text-base font-bold text-slate-950 shadow-[0_10px_40px_rgba(34,211,238,0.18)] transition hover:from-cyan-300 hover:to-blue-400"
                  >
                    Generate Words
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowOptions((current) => !current)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-900/50 px-5 text-sm font-bold text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
                  >
                    <SlidersHorizontal className="h-4 w-4 text-cyan-100" />
                    Options
                  </button>
                </div>
              </div>

              {showOptions && (
                <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-100">Refine results</p>
                      <p className="text-sm text-slate-400">Filter by position, length, pattern, exclusions, and vowels.</p>
                    </div>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-800"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Starts with</span>
                      <input value={startsWith} onChange={(e) => setStartsWith(e.target.value)} placeholder="e.g. st" className="input-style" />
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Ends with</span>
                      <input value={endsWith} onChange={(e) => setEndsWith(e.target.value)} placeholder="e.g. ing" className="input-style" />
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Contains letters</span>
                      <input value={containsLetters} onChange={(e) => setContainsLetters(e.target.value)} placeholder="e.g. ea" className="input-style" />
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Word length</span>
                      <select value={wordLength} onChange={(e) => setWordLength(e.target.value)} className="input-style">
                        <option value="">Any length</option>
                        {Array.from({ length: Math.max(availableLetters.length, 10) - 1 }, (_, index) => index + 2).map((length) => (
                          <option key={length} value={length}>
                            {length} letters
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Exact pattern</span>
                      <input value={exactPattern} onChange={(e) => setExactPattern(e.target.value)} placeholder="e.g. s?l_nt" className="input-style" />
                      <p className="mt-1 text-xs text-slate-500">Use ? or _ for unknown letters.</p>
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Exclude letters</span>
                      <input value={excludeLetters} onChange={(e) => setExcludeLetters(e.target.value)} placeholder="e.g. qxz" className="input-style" />
                    </label>

                    <label className="sm:col-span-2">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Vowel / consonant filter</span>
                      <select value={vowelFilter} onChange={(e) => setVowelFilter(e.target.value)} className="input-style">
                        <option value="">Any vowel/consonant pattern</option>
                        <option value="has-vowel">Has at least one vowel</option>
                        <option value="no-vowels">No vowels</option>
                        <option value="more-vowels">More vowels than consonants</option>
                        <option value="more-consonants">More consonants than vowels</option>
                        <option value="starts-vowel">Starts with a vowel</option>
                        <option value="starts-consonant">Starts with a consonant</option>
                        <option value="ends-vowel">Ends with a vowel</option>
                        <option value="ends-consonant">Ends with a consonant</option>
                      </select>
                    </label>
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="py-2 text-slate-400">Try:</span>
                {["listen", "react", "stone", "large", "apple"].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => useExample(example)}
                    className="rounded-full border border-white/10 bg-slate-900/50 px-3 py-2 text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_40px_rgba(34,211,238,0.15)] sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Results</h2>
                <p className="text-sm text-slate-400">
                  {hasSearched
                    ? `${results.length} word${results.length === 1 ? "" : "s"} found • ${totalPoints} total points`
                    : "Your words will appear here"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {results.length > 0 && (
                  <button
                    type="button"
                    onClick={copyResults}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-bold text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4 text-cyan-100" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                )}

                <div className="rounded-2xl bg-slate-950/60 px-4 py-3 text-center ring-1 ring-white/10">
                  <p className="text-xs text-slate-400">Letters</p>
                  <p className="text-lg font-black tracking-widest text-cyan-100">{availableLetters || "—"}</p>
                </div>
              </div>
            </div>

            {hasSearched && results.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-400">Highest score</p>
                  <p className="mt-1 flex items-center gap-2 font-black text-cyan-100">
                    <Trophy className="h-4 w-4" /> {results[0].word} • {results[0].score} pts
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                  <p className="text-xs text-slate-400">Total score</p>
                  <p className="mt-1 font-black text-cyan-100">{totalPoints} pts</p>
                </div>
              </div>
            )}

            {!hasSearched && (
              <div className="grid min-h-[320px] place-items-center rounded-3xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-center">
                <div>
                  <Shuffle className="mx-auto mb-4 h-12 w-12 text-cyan-100" />
                  <p className="text-lg font-semibold">Start by entering letters.</p>
                  <p className="mt-2 text-sm text-slate-400">Results will be sorted by highest score.</p>
                </div>
              </div>
            )}

            {hasSearched && availableLetters.length < 2 && (
              <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 text-amber-100">
                Please enter at least two letters.
              </div>
            )}

            {hasSearched && availableLetters.length >= 2 && results.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6 text-slate-200">
                No matches found. Try changing your letters or clearing the filters.
              </div>
            )}

            {results.length > 0 && (
              <div className="max-h-[560px] overflow-y-auto pr-1">
                <div className="flex flex-wrap gap-2">
                  {results.map((item) => (
                    <div
                      key={item.word}
                      className="group relative"
                      onMouseEnter={() => fetchDefinition(item.word)}
                      onClick={() => fetchDefinition(item.word)}
                    >
                      <button className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-2.5 font-bold text-slate-100 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-cyan-300/20 hover:text-cyan-100 hover:shadow-[0_0_25px_rgba(34,211,238,0.22)]">
                        {item.word}
                        <span className="ml-2 rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-100">
                          {item.score}
                        </span>
                      </button>

                      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-900 p-3 text-left text-sm text-slate-200 opacity-0 shadow-[0_10px_40px_rgba(34,211,238,0.15)] transition group-hover:opacity-100">
                        <p className="font-bold text-cyan-100">
                          {item.word} • {item.score} pts
                        </p>
                        <p className="mt-1 leading-5 text-slate-200">
                          {definitions[item.word]
                            ? definitions[item.word]
                            : loadingDefinition === item.word
                              ? "Loading definition..."
                              : "Hover or tap to load definition."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5">
            <p className="font-bold text-slate-100">Score ranked</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Highest scoring words appear first.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5">
            <p className="font-bold text-slate-100">Advanced filters</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Filter by starts, ends, contains, pattern, exclusions, and vowels.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-5">
            <p className="font-bold text-slate-100">Copy results</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Copy all words and scores in one click.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
