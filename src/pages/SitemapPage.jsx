import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-cyan-300">Website Sitemap</h1>

        <div className="space-y-4 text-lg">
  <Link className="block text-cyan-300 hover:underline" to="/">
    Home
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/about">
    About
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/contact">
    Contact
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/privacy-policy">
    Privacy Policy
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/terms-and-conditions">
    Terms & Conditions
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/5-letter-words">
    5 Letter Words
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/words-starting-with">
    Words Starting With
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/words-ending-with">
    Words Ending With
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/word-length">
    Word Length
  </Link>

  <Link className="block text-cyan-300 hover:underline" to="/letter-combinations">
    Letter Combinations
  </Link>
</div>
      </div>
      </div>
      import Footer from "../components/Footer";
    </main>
  );
}