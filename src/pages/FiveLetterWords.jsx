import Navbar from "../components/Navbar";

export default function FiveLetterWords() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-cyan-300">5 Letter Words</h1>

        <p className="mt-6 text-lg text-slate-300 leading-8">
          Discover useful 5-letter words for Scrabble, Wordle, crossword puzzles, and other word games.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/50 p-6">
          <div className="flex flex-wrap gap-3 text-slate-200">
            <span>apple</span>
            <span>stone</span>
            <span>light</span>
            <span>brain</span>
            <span>smile</span>
            <span>water</span>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}