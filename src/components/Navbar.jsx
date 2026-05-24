import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);

  const closeMenu = () => {
    setToolsOpen(false);
  };

  return (
    <header className="sticky top-0 z-[9999] border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={closeMenu} className="text-2xl font-black text-cyan-300">
          WordShuffl
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          <Link onClick={closeMenu} className="transition hover:text-cyan-300" to="/">
            Home
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsOpen((current) => !current)}
              className="flex items-center gap-2 transition hover:text-cyan-300"
            >
              Word Tools
              <ChevronDown
                className={`h-4 w-4 transition ${toolsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {toolsOpen && (
              <div className="absolute left-0 top-full z-[99999] mt-4 w-72 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl ring-1 ring-cyan-400/10">
                <Link onClick={closeMenu} className="block rounded-xl px-4 py-3 transition hover:bg-cyan-400/10 hover:text-cyan-300" to="/5-letter-words">
                  5 Letter Words
                </Link>

                <Link onClick={closeMenu} className="block rounded-xl px-4 py-3 transition hover:bg-cyan-400/10 hover:text-cyan-300" to="/words-starting-with">
                  Words Starting With
                </Link>

                <Link onClick={closeMenu} className="block rounded-xl px-4 py-3 transition hover:bg-cyan-400/10 hover:text-cyan-300" to="/words-ending-with">
                  Words Ending With
                </Link>

                <Link onClick={closeMenu} className="block rounded-xl px-4 py-3 transition hover:bg-cyan-400/10 hover:text-cyan-300" to="/word-length">
                  Word Length
                </Link>

                <Link onClick={closeMenu} className="block rounded-xl px-4 py-3 transition hover:bg-cyan-400/10 hover:text-cyan-300" to="/letter-combinations">
                  Letter Combinations
                </Link>
              </div>
            )}
          </div>

          <Link onClick={closeMenu} className="transition hover:text-cyan-300" to="/about">
            About
          </Link>

          <Link onClick={closeMenu} className="transition hover:text-cyan-300" to="/privacy-policy">
            Privacy
          </Link>

          <Link onClick={closeMenu} className="transition hover:text-cyan-300" to="/terms-and-conditions">
            Terms
          </Link>

          <Link onClick={closeMenu} className="transition hover:text-cyan-300" to="/contact">
            Contact
          </Link>

          <Link onClick={closeMenu} className="transition hover:text-cyan-300" to="/sitemap">
            Sitemap
          </Link>
        </nav>
      </div>
    </header>
  );
}