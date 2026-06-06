import Footer from "../components/Footer";

export default function About() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
        
        <div className="p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-cyan-300">About WordShuffl</h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          WordShuffl is a modern AI-powered word unscrambler designed to help users quickly discover real English words from scrambled letters.
        </p>

        <p className="mt-4 text-lg leading-8 text-slate-300">
          Our tool helps players solve word games, crossword puzzles, Scrabble challenges, and vocabulary exercises using powerful filtering and scoring systems.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/50 p-6">
          <h2 className="text-2xl font-bold text-cyan-200">Features</h2>

          <ul className="mt-4 space-y-3 text-slate-300">
            <li>• Advanced word unscrambler</li>
            <li>• Word scoring system</li>
            <li>• Dictionary definitions</li>
            <li>• Word filters and patterns</li>
            <li>• Mobile-friendly interface</li>
            <li>• Fast search results</li>
          </ul>
        </div>
      </div>
      </div>
      <Footer />
    </main>
  );
}