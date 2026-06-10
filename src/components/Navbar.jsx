import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToolsOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setToolsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            onClick={closeMenus}
            className="text-2xl font-black text-cyan-300"
          >
            WordShuffl
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
            <Link to="/" className="hover:text-cyan-300">
              Home
            </Link>

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-2 hover:text-cyan-300"
              >
                Word Tools
                <ChevronDown
                  className={`h-4 w-4 transition ${
                    toolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {toolsOpen && (
                <div className="absolute left-0 mt-3 w-64 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl">
                  <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/5-letter-words">
                    5 Letter Words
                  </Link>

                  <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/words-starting-with">
                    Words Starting With
                  </Link>

                  <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/words-ending-with">
                    Words Ending With
                  </Link>

                  <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/words-ending-with-ing">
                   Words Ending With Ing
                  </Link>

                  <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/words-starting-with-a">
                   Words Starting With A
                  </Link>

                  <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/word-length">
                    Word Length
                  </Link>

                  <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 hover:bg-cyan-400/10" to="/letter-combinations">
                    Letter Combinations
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-and-conditions">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-cyan-300"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="pb-4 lg:hidden">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-900 p-4">
              <Link onClick={closeMenus} className="block py-2" to="/">
                Home
              </Link>

              <div>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="flex w-full items-center justify-between py-2"
                >
                  Word Tools
                  <ChevronDown
                    className={`h-4 w-4 transition ${
                      toolsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {toolsOpen && (
                  <div className="ml-4 mt-2 space-y-2 border-l border-cyan-500/30 pl-4">
                    <Link onClick={closeMenus} className="block py-1" to="/5-letter-words">
                      5 Letter Words
                    </Link>

                    <Link onClick={closeMenus} className="block py-1" to="/words-starting-with">
                      Words Starting With
                    </Link>

                    <Link onClick={closeMenus} className="block py-1" to="/words-ending-with">
                      Words Ending With
                    </Link>
                    
                    <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 transition hover:bg-cyan-400/10 hover:text-cyan-300" to="/words-ending-with-ing">
                     Words Ending With Ing
                   </Link>

                    <Link onClick={closeMenus} className="block rounded-xl px-4 py-3 transition hover:bg-cyan-400/10 hover:text-cyan-300" to="/words-starting-with-a">
                     Words Starting With A
                    </Link>

                    <Link onClick={closeMenus} className="block py-1" to="/word-length">
                      Word Length
                    </Link>

                    <Link onClick={closeMenus} className="block py-1" to="/letter-combinations">
                      Letter Combinations
                    </Link>
                  </div>
                )}
              </div>

              <Link onClick={closeMenus} className="block py-2" to="/about">
                About
              </Link>

              <Link onClick={closeMenus} className="block py-2" to="/contact">
                Contact
              </Link>

              <Link onClick={closeMenus} className="block py-2" to="/privacy-policy">
                Privacy Policy
              </Link>

              <Link onClick={closeMenus} className="block py-2" to="/terms-and-conditions">
                Terms & Conditions
              </Link>

              <Link onClick={closeMenus} className="block py-2" to="/sitemap">
                Sitemap
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}