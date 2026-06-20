import ToolGeoBlock from "../components/geo/ToolGeoBlock";

export default function DifficultWordleAnswers() {
  const words = [
    "queue",
    "jazzy",
    "fuzzy",
    "nymph",
    "fjord",
    "glyph",
    "quoth",
    "zesty",
    "vexed",
    "azure",
  ];

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-cyan-300">
          Difficult Wordle Answers
        </h1>

        <p className="mt-6 max-w-4xl text-slate-300">
          Challenging Wordle answers that frequently catch players out.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {words.map((word) => (
            <span
              key={word}
              className="rounded-2xl border border-cyan-400/20 bg-slate-900 px-4 py-2"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}