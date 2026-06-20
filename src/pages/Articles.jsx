import { Link } from "react-router-dom";
import { articles } from "../data/articles";

export default function Articles() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-cyan-300">WordShuffl Articles</h1>
        <p className="mt-5 max-w-3xl text-slate-300">
          Explore expert guides on Scrabble, Wordle, crosswords, vocabulary, spelling, anagrams and English word discovery.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
            >
              <p className="text-sm font-bold text-cyan-300">{article.category}</p>
              <h2 className="mt-3 text-2xl font-black">{article.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                By WordShuffl Authors
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}