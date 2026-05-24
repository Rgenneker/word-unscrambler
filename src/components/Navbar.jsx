import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-black text-cyan-300"
        >
          WordShuffl
        </Link>

        <nav className="hidden gap-6 text-sm font-medium text-slate-300 md:flex">
          <Link className="hover:text-cyan-300 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-cyan-300 transition" to="/about">
            About
          </Link>

          <Link className="hover:text-cyan-300 transition" to="/contact">
            Contact
          </Link>

          <Link className="hover:text-cyan-300 transition" to="/5-letter-words">
            5 Letter Words
          </Link>

          <Link className="hover:text-cyan-300 transition" to="/words-starting-with-a">
            Words Starting With 
          </Link>

          <Link className="hover:text-cyan-300 transition" to="/privacy-policy">
            Privacy
          </Link>

          <Link className="hover:text-cyan-300 transition" to="/terms-and-conditions">
            Terms
          </Link>

          <Link className="hover:text-cyan-300 transition" to="/sitemap">
            Sitemap
          </Link>
        </nav>

      </div>
    </header>
  );
}