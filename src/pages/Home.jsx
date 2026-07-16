import { Helmet } from "react-helmet-async";
import NativeBannerAd from "../components/NativeBannerAd";
import { homepageContent } from "../data/homepageContent";
import Footer from "../components/Footer";
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

export default function Home() {
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
  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What dictionaries does WordShuffl use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WordShuffl uses comprehensive English word lists to generate valid word combinations for word games, vocabulary building and educational use."
      }
    },
    {
      "@type": "Question",
      name: "Can I use blank tiles or wildcards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can enter a question mark or an asterisk to represent a blank tile and WordShuffl will calculate possible letter substitutions."
      }
    },
    {
      "@type": "Question",
      name: "Is WordShuffl free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. WordShuffl is free to use and is designed for students, teachers, writers and word game enthusiasts."
      }
    },
    {
      "@type": "Question",
      name: "How are words ranked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Results are organised to help users identify useful words based on length and scoring."
      }
    }
  ]
};

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
    <>
    <Helmet>
      <title>WordShuffl | Free Word Unscrambler and Word Finder</title>
      <meta
        name="description"
        content="Use WordShuffl to unscramble letters, find high-scoring words, solve word games, improve vocabulary and explore English word patterns."
      />
      <link rel="canonical" href="https://wordshuffl.com/" />
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <NativeBannerAd />
      <div className="hidden xl:block fixed left-[40px] top-[180px] z-50 w-[160px] h-[600px]">
  
</div>
<div className="hidden xl:block fixed right-[40px] top-[180px] z-50 w-[160px] h-[300px]">
  
</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),linear-gradient(180deg,#020617,#0F172A)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900/60 ring-1 ring-white/15">
              <Shuffle className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-lg font-bold">WordShuffl</p>
              <p className="text-xs text-slate-400">Smart word unscrambler</p>
            </div>
          </div>
           <div className="bg-slate-950 text-white p-4">

</div>
          <div className="hidden rounded-full border border-white/10 bg-slate-900/50 px-4 py-2 text-sm text-slate-200 sm:block">
            Score-ranked • Fast • Mobile-friendly
          </div>
        </header>

        <section className="pt-10 lg:pt-16">
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

            </div>
            </section>
                      

<div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">

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
                      <input value={startsWith} onChange={(e) => setStartsWith(e.target.value)} placeholder="e.g. st" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10" />
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Ends with</span>
                      <input value={endsWith} onChange={(e) => setEndsWith(e.target.value)} placeholder="e.g. ing" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10" />
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Contains letters</span>
                      <input value={containsLetters} onChange={(e) => setContainsLetters(e.target.value)} placeholder="e.g. ea" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10" />
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Word length</span>
                      <select value={wordLength} onChange={(e) => setWordLength(e.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10">
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
                      <input value={exactPattern} onChange={(e) => setExactPattern(e.target.value)} placeholder="e.g. s?l_nt" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10" />
                      <p className="mt-1 text-xs text-slate-500">Use ? or _ for unknown letters.</p>
                    </label>

                    <label>
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Exclude letters</span>
                      <input value={excludeLetters} onChange={(e) => setExcludeLetters(e.target.value)} placeholder="e.g. qxz" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10" />
                    </label>

                    <label className="sm:col-span-2">
                      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Vowel / consonant filter</span>
                      <select value={vowelFilter} onChange={(e) => setVowelFilter(e.target.value)} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 font-semibold text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-4 focus:ring-cyan-300/10">
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
<div className="lg:mt-[80px] rounded-[2rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_40px_rgba(34,211,238,0.15)] sm:p-6">
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
              <div className="grid min-h-[380px] place-items-center rounded-3xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-center">
                <div>
                  <Shuffle className="mx-auto mb-4 h-12 w-12 text-cyan-100" />
                  <p className="text-lg font-semibold">Start by entering letters.</p>
                  <p className="mt-2 text-sm text-slate-400">Results will be sorted by highest score.</p>
                </div>
              </div>
            )}
<div className="mt-6 flex justify-center">
  
</div>
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

                      <div className="pointer-events-none fixed left-1/2 top-24 z-[9999] w-[90vw] max-w-xl -translate-x-1/2 rounded-3xl border border-cyan-300/20 bg-slate-950 p-5 text-left text-sm text-slate-200 opacity-0 shadow-[0_20px_80px_rgba(34,211,238,0.25)] ring-1 ring-white/10 transition group-hover:opacity-100 group-focus-within:opacity-100">
  <p className="text-lg font-black text-cyan-100">
    {item.word} • {item.score} pts
  </p>

  <p className="mt-3 max-h-56 overflow-y-auto leading-7 text-slate-200">
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
              </div>
             
{/* Game Strategies + How To */}
<section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <div className="grid gap-8 lg:grid-cols-1 lg:items-start">
    

    <div>
      <h2 className="text-3xl font-black text-cyan-300">
        How to Use the WordShuffl Unscrambler Tool
      </h2>

      <p className="mt-6 leading-8 text-slate-300">
        Unscrambling letters and finding the highest-scoring combinations should not be a guessing game. WordShuffl uses a powerful dictionary engine to analyse your letter combinations in seconds, helping you discover valid English words quickly and efficiently.
      </p>

      <ol className="mt-6 space-y-6 list-decimal pl-6 text-slate-300 leading-8">
        <li>
          <strong className="text-cyan-300">Enter Your Letters</strong><br />
          Type up to 15 letters into the search box. If you are playing games such as Scrabble or Words With Friends, you can also include blank tiles using ? or *.
        </li>

        <li>
          <strong className="text-cyan-300">Apply Advanced Filters</strong><br />
          Open the options panel to narrow your results by starting letters, ending letters, required characters, excluded letters, patterns and other useful search criteria.
        </li>

        <li>
          <strong className="text-cyan-300">Review Your Results</strong><br />
          Browse words organised by length and score so you can quickly identify the strongest possible plays.
        </li>

        <li>
          <strong className="text-cyan-300">Copy Your Results</strong><br />
          Use the Copy Results button to copy your complete list to your clipboard for studying, practising or sharing.
        </li>
      </ol>
    </div>
  </div>
</section>
<section className="mt-8">
  <div className="mb-5 text-center">
    <p className="text-sm font-medium tracking-wide text-slate-400">
      Improve your vocabulary and sharpen your word skills by exploring more word games below.
    </p>
  </div>

  <div className="flex flex-wrap items-center justify-center gap-3">
    <a
      href="https://nyt-wordle-app.vercel.app"
      target="_blank"
      rel="noreferrer"
     className="w-[170px] rounded-2xl border border-cyan-400/20 bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-cyan-200 transition hover:scale-105 hover:bg-cyan-400/10"
    >
      Play Wordle
    </a>

    <a
      href="https://playscrabble.com/"
      target="_blank"
      rel="noreferrer"
      className="w-[170px] rounded-2xl border border-cyan-400/20 bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-cyan-200 transition hover:scale-105 hover:bg-cyan-400/10"
    >
      Play Scrabble
    </a>

    <a
      href="https://www.wordgames.com/"
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl border border-purple-400/20 bg-slate-900 px-5 py-3 text-sm font-semibold text-purple-200 transition hover:scale-105 hover:bg-purple-400/10"
    >
      Play Word Games
    </a>

    <a
      href="https://www.wordplays.com/crossword-solver/PRO"
      target="_blank"
      rel="noreferrer"
      className="w-[170px] rounded-2xl border border-emerald-400/20 bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-emerald-200 transition hover:scale-105 hover:bg-emerald-400/10"
    >
      WordPlay
    </a>
  </div> 
</section>

<section className="mt-0 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Frequently Asked Questions
  </h2>

  <div className="mt-8 space-y-8">

    <div>
      <h3 className="text-xl font-bold text-white">
        What dictionaries does WordShuffl use?
      </h3>

      <p className="mt-2 leading-8 text-slate-300">
        WordShuffl uses comprehensive English word lists to generate valid word
        combinations for word games, vocabulary building and educational use.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-bold text-white">
        Can I use blank tiles or wildcards?
      </h3>

      <p className="mt-2 leading-8 text-slate-300">
        Yes. Simply enter a question mark (?) or an asterisk (*) to represent a
        blank tile and WordShuffl will calculate possible letter substitutions.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-bold text-white">
        Is WordShuffl free?
      </h3>

      <p className="mt-2 leading-8 text-slate-300">
        Yes. WordShuffl is completely free to use and is designed for students,
        teachers, writers and word game enthusiasts around the world.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-bold text-white">
        How are words ranked?
      </h3>

      <p className="mt-2 leading-8 text-slate-300">
        Results are organised to help you quickly identify useful words based
        on length and scoring, making it easier to find your best possible
        plays.
      </p>
    </div>

  </div>
</section>
<section className="-mt-112 flex flex-col gap-4 max-w-md">
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


        
        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    About WordShuffl
  </h2>

  <p className="mt-6 whitespace-pre-line leading-8 text-slate-300">
    {homepageContent.content}
  </p>
</section>

        
        {/* How to Use WordShuffl */}


{/* FAQ */}

<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Explore More Word Tools
  </h2>

  <p className="mt-6 leading-8 text-slate-300">
    WordShuffl offers much more than a simple word unscrambler. Explore our
    growing collection of free word tools designed for students, teachers,
    puzzle enthusiasts, writers and competitive word game players.
  </p>

  <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

    <a
      href="/5-letter-words"
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-cyan-300 transition"
    >
      <h3 className="font-bold text-white">5 Letter Words</h3>
      <p className="mt-2 text-slate-400">
        Browse thousands of useful five-letter words for Wordle and other games.
      </p>
    </a>

    <a
      href="/word-length"
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-cyan-300 transition"
    >
      <h3 className="font-bold text-white">Words by Length</h3>
      <p className="mt-2 text-slate-400">
        Find words from two letters through to the longest English words.
      </p>
    </a>

    <a
      href="/words-starting-with"
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-cyan-300 transition"
    >
      <h3 className="font-bold text-white">Words Starting With</h3>
      <p className="mt-2 text-slate-400">
        Discover words beginning with any letter or letter combination.
      </p>
    </a>

    <a
      href="/words-ending-with"
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-cyan-300 transition"
    >
      <h3 className="font-bold text-white">Words Ending With</h3>
      <p className="mt-2 text-slate-400">
        Search words ending in specific suffixes or letter patterns.
      </p>
    </a>

    <a
      href="/letter-combinations"
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-cyan-300 transition"
    >
      <h3 className="font-bold text-white">Letter Combinations</h3>
      <p className="mt-2 text-slate-400">
        Learn common English letter combinations and improve your vocabulary.
      </p>
    </a>

    <a
      href="/longest-english-words"
      className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 hover:border-cyan-300 transition"
    >
      <h3 className="font-bold text-white">Longest English Words</h3>
      <p className="mt-2 text-slate-400">
        Explore fascinating long English words and their meanings.
      </p>
    </a>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Understanding Word Unscramblers
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      A word unscrambler is a tool that rearranges a collection of letters into
      valid English words. While the concept appears simple, it has practical
      applications in education, competitive word games, language learning and
      creative writing.
    </p>

    <p>
      Instead of manually trying hundreds of possible letter combinations,
      WordShuffl analyses your available letters and presents valid words in a
      matter of seconds. This saves time while helping users recognise letter
      patterns that become easier to identify with practice.
    </p>

    <p>
      Word unscramblers are widely used by students studying English,
      crossword enthusiasts, Scrabble players, Words With Friends
      competitors, Wordle fans and anyone interested in expanding their
      vocabulary.
    </p>

    <p>
      Regular practice with an unscrambler also improves spelling,
      pronunciation awareness and recognition of prefixes, suffixes and common
      word endings. Over time these skills become valuable in both academic and
      professional communication.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    The Science Behind English Word Patterns
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      The English language is built on thousands of predictable letter
      combinations. Certain letters naturally appear together more often than
      others, making it easier for experienced readers and word game players to
      recognise possible words. Examples include combinations such as <strong>TH</strong>,
      <strong> CH</strong>, <strong>SH</strong>, <strong>ING</strong>,
      <strong>TION</strong> and <strong>ER</strong>.
    </p>

    <p>
      Recognising these common patterns is one of the fastest ways to improve
      your ability to solve anagrams, complete crosswords and identify hidden
      words from a random collection of letters. Instead of viewing letters
      individually, experienced players learn to recognise familiar groups of
      letters that frequently appear together.
    </p>

    <p>
      WordShuffl helps reinforce this learning process by instantly generating
      valid words from your available letters. As you compare the generated
      results, you naturally become more familiar with prefixes, suffixes,
      vowel placement and common consonant clusters that appear throughout the
      English language.
    </p>

    <p>
      Over time, regular exposure to these patterns strengthens spelling,
      reading comprehension and vocabulary recall. These skills benefit not
      only competitive word game players but also students, teachers, writers,
      editors and professionals who work with language every day.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Build Your Vocabulary One Word at a Time
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      Every new word you learn increases your ability to communicate clearly,
      understand written information and express ideas with greater confidence.
      Building vocabulary is not only important for school and university
      studies but also for business communication, public speaking and everyday
      conversations.
    </p>

    <p>
      One of the easiest ways to expand your vocabulary is to explore words
      that share common roots, prefixes and suffixes. When you understand how
      words are formed, you begin recognising unfamiliar words more quickly and
      can often predict their meanings from their structure.
    </p>

    <p>
      WordShuffl encourages this learning by presenting multiple valid words
      from the same group of letters. Instead of discovering a single answer,
      users can compare different word lengths, spelling patterns and letter
      arrangements, creating valuable opportunities for learning.
    </p>

    <p>
      Whether you are preparing for examinations, improving your spelling,
      writing professionally or simply enjoying daily word puzzles, consistent
      vocabulary practice develops stronger language skills that last a
      lifetime.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Winning Strategies for Popular Word Games
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      Every word game rewards a slightly different strategy. While a large
      vocabulary is always an advantage, understanding the rules and scoring
      system of each game can dramatically improve your results. WordShuffl
      helps you identify possible words quickly, allowing you to spend more
      time planning your next move and less time rearranging letters.
    </p>

    <h3 className="text-xl font-bold text-white">
      Scrabble
    </h3>

    <p>
      Success in Scrabble depends on more than finding long words. High-scoring
      letters such as Q, Z, X and J can dramatically increase your score when
      placed on premium board squares. Short words can often score more points
      than longer ones when they create multiple words in a single move.
      Learning common two-letter and three-letter words is one of the quickest
      ways to improve your overall performance.
    </p>

    <h3 className="text-xl font-bold text-white">
      Words With Friends
    </h3>

    <p>
      Although similar to Scrabble, Words With Friends uses different letter
      values and board layouts. Understanding these differences allows players
      to maximise scoring opportunities while protecting valuable bonus
      squares from opponents.
    </p>

    <h3 className="text-xl font-bold text-white">
      Wordle
    </h3>

    <p>
      Wordle rewards logical elimination rather than guessing. Begin with words
      that contain common vowels and frequently used consonants. After each
      guess, remove impossible letters and narrow the remaining possibilities.
      WordShuffl can help generate valid combinations once you know which
      letters belong in the solution.
    </p>

    <h3 className="text-xl font-bold text-white">
      Crossword Puzzles
    </h3>

    <p>
      Crossword solving becomes easier when you combine known letters with word
      length and pattern matching. Searching for words that begin or end with
      particular letters often reduces hundreds of possibilities to just a
      handful of likely answers.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Common English Prefixes
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      Prefixes are groups of letters added to the beginning of words to change
      their meaning. Understanding prefixes helps you recognise unfamiliar
      vocabulary and identify possible words during word games.
    </p>

    <div className="overflow-x-auto">
      <table className="mt-6 w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-3 text-left text-cyan-300">Prefix</th>
            <th className="py-3 text-left text-cyan-300">Meaning</th>
            <th className="py-3 text-left text-cyan-300">Example</th>
          </tr>
        </thead>

        <tbody>

          <tr className="border-b border-white/5">
            <td className="py-3">Un-</td>
            <td>Not</td>
            <td>Unhappy</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">Re-</td>
            <td>Again</td>
            <td>Rewrite</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">Pre-</td>
            <td>Before</td>
            <td>Preview</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">Dis-</td>
            <td>Opposite</td>
            <td>Disagree</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">Inter-</td>
            <td>Between</td>
            <td>International</td>
          </tr>

        </tbody>
      </table>
    </div>

    <p>
      Recognising these prefixes makes it easier to build larger words from a
      smaller collection of letters and improves vocabulary development over
      time.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Common English Suffixes
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      Suffixes are groups of letters added to the end of a word to change its
      meaning or grammatical function. Recognising common suffixes helps players
      identify longer words, improve spelling and understand unfamiliar
      vocabulary.
    </p>

    <div className="overflow-x-auto">
      <table className="mt-6 w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-3 text-left text-cyan-300">Suffix</th>
            <th className="py-3 text-left text-cyan-300">Purpose</th>
            <th className="py-3 text-left text-cyan-300">Example</th>
          </tr>
        </thead>

        <tbody>

          <tr className="border-b border-white/5">
            <td className="py-3">-ing</td>
            <td>Continuous action</td>
            <td>Running</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">-ed</td>
            <td>Past tense</td>
            <td>Played</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">-er</td>
            <td>Person or comparison</td>
            <td>Teacher</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">-est</td>
            <td>Highest degree</td>
            <td>Fastest</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">-tion</td>
            <td>Noun formation</td>
            <td>Education</td>
          </tr>

        </tbody>
      </table>
    </div>

    <p>
      Learning suffixes improves vocabulary recognition and makes it easier to
      discover additional words from the same collection of letters.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    High-Scoring Scrabble Letters
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      One of the fastest ways to improve your Scrabble performance is to learn
      the value of individual letters. While common letters appear more often,
      rare letters generally carry higher scores and can produce exceptional
      results when placed on premium board squares.
    </p>

    <div className="overflow-x-auto">

      <table className="mt-6 w-full border-collapse">

        <thead>

          <tr className="border-b border-white/10">
            <th className="py-3 text-left text-cyan-300">Letter</th>
            <th className="py-3 text-left text-cyan-300">Typical Value</th>
            <th className="py-3 text-left text-cyan-300">Strategy</th>
          </tr>

        </thead>

        <tbody>

          <tr className="border-b border-white/5">
            <td className="py-3">Q</td>
            <td>10</td>
            <td>Combine with U whenever possible.</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">Z</td>
            <td>10</td>
            <td>Excellent on double and triple letter squares.</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">X</td>
            <td>8</td>
            <td>Creates valuable short words.</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">J</td>
            <td>8</td>
            <td>Powerful when combined with vowels.</td>
          </tr>

          <tr className="border-b border-white/5">
            <td className="py-3">K</td>
            <td>5</td>
            <td>Useful for extending existing words.</td>
          </tr>

        </tbody>

      </table>

    </div>

    <p>
      Remember that the best move is not always the longest word. Board
      position, bonus squares and creating multiple words often produce higher
      overall scores.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    The Most Common English Letter Combinations
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      English words are built from recurring groups of letters. Becoming
      familiar with these combinations helps you recognise possible words more
      quickly and improves both spelling and vocabulary.
    </p>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

      <div className="rounded-xl bg-slate-900/50 p-4">
        <strong className="text-cyan-300">TH</strong>
        <p className="mt-2">think, three, thank, those</p>
      </div>

      <div className="rounded-xl bg-slate-900/50 p-4">
        <strong className="text-cyan-300">CH</strong>
        <p className="mt-2">chair, change, choice</p>
      </div>

      <div className="rounded-xl bg-slate-900/50 p-4">
        <strong className="text-cyan-300">SH</strong>
        <p className="mt-2">share, short, shell</p>
      </div>

      <div className="rounded-xl bg-slate-900/50 p-4">
        <strong className="text-cyan-300">ING</strong>
        <p className="mt-2">running, reading, writing</p>
      </div>

      <div className="rounded-xl bg-slate-900/50 p-4">
        <strong className="text-cyan-300">TION</strong>
        <p className="mt-2">education, action, solution</p>
      </div>

      <div className="rounded-xl bg-slate-900/50 p-4">
        <strong className="text-cyan-300">ER</strong>
        <p className="mt-2">teacher, player, reader</p>
      </div>

    </div>

    <p>
      The more frequently you encounter these patterns, the easier it becomes
      to identify hidden words from scrambled letters and solve increasingly
      difficult word puzzles.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    The History of Word Games
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      Word games have entertained and educated people for centuries. Long before
      computers and mobile phones, families gathered around tables to solve
      crossword puzzles, spelling challenges and vocabulary games that tested
      memory, language skills and logical thinking.
    </p>

    <p>
      One of the most recognised word games is Scrabble, introduced in the
      twentieth century and now played by millions of people around the world.
      The game's combination of vocabulary, mathematics and strategy has made it
      popular among both casual players and international tournament
      competitors.
    </p>

    <p>
      In recent years, digital games such as Wordle and Words With Friends have
      introduced a new generation to the enjoyment of word puzzles. These games
      encourage players to think critically, recognise letter patterns and
      expand their vocabulary while competing against friends or solving daily
      challenges.
    </p>

    <p>
      Today, online tools such as WordShuffl help players learn from every game.
      Rather than simply providing answers, they encourage users to discover new
      words, recognise common letter combinations and strengthen their language
      skills over time.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    WordShuffl Learning Centre
  </h2>

  <div className="mt-8 grid gap-6 lg:grid-cols-2">

    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
      <h3 className="text-xl font-bold text-white">
        Learn New Vocabulary
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        Discover unfamiliar words, understand common spelling patterns and
        improve your everyday communication through regular vocabulary practice.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
      <h3 className="text-xl font-bold text-white">
        Improve Spelling
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        Explore words grouped by similar letters, helping you recognise correct
        spelling while reducing common mistakes.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
      <h3 className="text-xl font-bold text-white">
        Strengthen Memory
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        Regular exposure to new words improves memory recall and helps learners
        remember vocabulary more effectively.
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
      <h3 className="text-xl font-bold text-white">
        Practise Every Day
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        Spending just a few minutes each day exploring new words can gradually
        build stronger language skills and greater confidence.
      </p>
    </div>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Helping Children Develop Stronger Language Skills
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      Parents and teachers play an important role in developing children's
      vocabulary. Encouraging learners to experiment with letters, discover new
      words and understand spelling patterns creates lasting language skills
      that support reading, writing and communication.
    </p>

    <p>
      WordShuffl can be incorporated into classroom activities, homework,
      spelling competitions and vocabulary games. Instead of simply memorising
      words, learners actively explore how letters combine to form meaningful
      language.
    </p>

    <p>
      Teachers can also use the tool when preparing spelling tests, classroom
      challenges and reading exercises, while parents can encourage daily word
      practice as part of homework or family game nights.
    </p>

    <p>
      By making vocabulary practice enjoyable and interactive, learners become
      more confident readers, writers and communicators.
    </p>

  </div>
</section>
<section className="mt-16 mb-20 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Become a Better Word Player Every Day
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">

    <p>
      Improving your word game skills is a gradual process. Every puzzle you
      solve and every new word you learn strengthens your vocabulary and your
      ability to recognise letter patterns more quickly.
    </p>

    <p>
      Challenge yourself to learn a few unfamiliar words each day, explore
      different word lengths, practise recognising prefixes and suffixes, and
      experiment with different letter combinations. Over time, these habits
      will improve both your confidence and your overall performance in word
      games.
    </p>

    <p>
      Whether you are solving today's Wordle, competing in Scrabble, completing
      a crossword puzzle or expanding your vocabulary for school or work,
      WordShuffl is designed to make word discovery faster, easier and more
      enjoyable.
    </p>

    <p>
      Keep exploring, keep learning and keep challenging yourself. Every new
      word opens the door to better communication, stronger language skills and
      more rewarding word game experiences.
    </p>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Why WordShuffl Helps You Find Better Words
  </h2>

  <div className="mt-8 space-y-6 leading-8 text-slate-300">
    <p>
      WordShuffl is built to help you move beyond random guessing. Instead of
      trying letters one by one, you can enter your available letters and let
      the tool generate useful word combinations quickly.
    </p>

    <p>
      This makes it helpful for word games, classroom activities, spelling
      practice, vocabulary development, creative writing and puzzle solving.
      Whether you are looking for short words, long words, high-scoring words or
      specific letter patterns, WordShuffl gives you a faster way to explore the
      English language.
    </p>

    <p>
      The tool is especially useful when you need to compare multiple word
      options. You can test different letters, apply filters and copy your
      results without having to search manually through long word lists.
    </p>
  </div>
</section>
      </div>
        
    </main>
    </>
  );
}
