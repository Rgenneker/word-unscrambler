import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
const toolsRef = useRef(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setToolsOpen(false);
  };
  useEffect(() => {
  function handleClickOutside(event) {
    if (
      toolsRef.current &&
      !toolsRef.current.contains(event.target)
    ) {
      setToolsOpen(false);
    }
  }
  function handleEscape(event) {
  if (event.key === "Escape") {
    setToolsOpen(false);
  }
}

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
  };
}, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" onClick={closeMenus} className="text-xl font-black text-cyan-300 sm:text-2xl">
            WordShuffl
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 xl:flex">
            <Link to="/">Home</Link>

            <div ref={toolsRef} className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-2 hover:text-cyan-300"
              >
                Word Tools <ChevronDown className="h-4 w-4" />
              </button>

              {toolsOpen && (
                <div className="absolute left-0 top-full mt-3 max-h-[75vh] w-72 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
                  {[
                    ["5 Letter Words", "/5-letter-words"],
                    ["Words Starting With", "/words-starting-with"],
                    ["Words Ending With", "/words-ending-with"],
                    ["Words Ending With Ing", "/words-ending-with-ing"],
                    ["Words Starting With A", "/words-starting-with-a"],
                    ["Word Length", "/word-length"],
                    ["Letter Combinations", "/letter-combinations"],
                     ["Longest English Words", "/longest-english-words"],
  ["Common 7 Letter Words", "/common-7-letter-words"],
  ["Difficult Wordle Answers", "/difficult-wordle-answers"],
                  ].map(([label, path]) => (
                    <Link key={path} onClick={closeMenus} to={path} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10 hover:text-cyan-300">
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-and-conditions">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/articles">Articles</Link>
          </nav>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden text-cyan-300"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="pb-4 xl:hidden">
            <div className="max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-4 text-slate-200">
              <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/">
                Home
              </Link>

              <button
                type="button"
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 hover:bg-cyan-400/10"
              >
                Word Tools
                <ChevronDown className={`h-4 w-4 transition ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              {toolsOpen && (
                <div className="mt-2 space-y-1 rounded-2xl bg-slate-950/60 p-2">
                  {[
                    ["5 Letter Words", "/5-letter-words"],
                    ["Words Starting With", "/words-starting-with"],
                    ["Words Ending With", "/words-ending-with"],
                    ["Words Ending With Ing", "/words-ending-with-ing"],
                    ["Words Starting With A", "/words-starting-with-a"],
                    ["Word Length", "/word-length"],
                    ["Letter Combinations", "/letter-combinations"],
                     ["Longest English Words", "/longest-english-words"],
  ["Common 7 Letter Words", "/common-7-letter-words"],
  ["Difficult Wordle Answers", "/difficult-wordle-answers"],
                  ].map(([label, path]) => (
                    <Link key={path} onClick={closeMenus} to={path} className="block rounded-xl px-4 py-3 text-sm hover:bg-cyan-400/10 hover:text-cyan-300">
                      {label}
                    </Link>
                  ))}
                </div>
              )}

              <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/about">About</Link>
              <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/contact">Contact</Link>
              <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/privacy-policy">Privacy</Link>
              <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/terms-and-conditions">Terms</Link>
              <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/sitemap">Sitemap</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}