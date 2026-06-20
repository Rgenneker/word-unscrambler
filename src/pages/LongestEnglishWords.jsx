import ToolGeoBlock from "../components/geo/ToolGeoBlock";

export default function LongestEnglishWords() {
  const words = [
    "Pneumonoultramicroscopicsilicovolcanoconiosis",
    "Pseudopseudohypoparathyroidism",
    "Floccinaucinihilipilification",
    "Antidisestablishmentarianism",
    "Supercalifragilisticexpialidocious",
    "Honorificabilitudinitatibus",
    "Thyroparathyroidectomized",
    "Dichlorodifluoromethane",
  ];

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-cyan-300">
          Longest English Words
        </h1>

        <p className="mt-6 max-w-4xl text-slate-300">
          Explore some of the longest words found in the English language.
        </p>

        <div className="mt-10 grid gap-4">
          {words.map((word) => (
            <div
              key={word}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}