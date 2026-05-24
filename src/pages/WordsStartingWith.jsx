import Navbar from "../components/Navbar";

export default function WordsStartingWith() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="p-10">
      <h1 className="text-4xl font-black text-cyan-300">
        Words Starting With A to Z
      </h1>

      <p className="mt-4 text-lg text-slate-300">
        Find English words that start with the letter A to Z for
        word games, puzzles, Scrabble, and crosswords.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/50 p-6">
        <ul className="space-y-2 text-slate-200">
          <li>Apple</li>
          <li>Angle</li>
          <li>Animal</li>
          <li>Anchor</li>
          <li>Artist</li>
          <li>Amazing</li>
        </ul>
      </div>
      </div>
    </main>
  );
}