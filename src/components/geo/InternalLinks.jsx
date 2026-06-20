import { Link } from "react-router-dom";

export default function InternalLinks() {
  const links = [
    ["5 Letter Words", "/5-letter-words"],
    ["Words Starting With", "/words-starting-with"],
    ["Words Ending With", "/words-ending-with"],
    ["Word Length", "/word-length"],
    ["Letter Combinations", "/letter-combinations"],
    ["About WordShuffl", "/about"],
    ["Contact", "/contact"],
  ];

  return (
    <section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <h2 className="text-3xl font-black text-cyan-300">
        Explore More WordShuffl Tools
      </h2>

      <div className="mt-6 flex flex-wrap gap-3">
        {links.map(([label, path]) => (
          <Link
            key={path}
            to={path}
            className="rounded-full border border-cyan-400/30 bg-slate-950 px-5 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/10"
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}