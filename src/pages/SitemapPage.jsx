import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black text-cyan-300">Website Sitemap</h1>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/50 p-8">
          <ul className="space-y-4 text-lg">
            <li><Link className="text-cyan-300 hover:underline" to="/">Home</Link></li>
            <li><Link className="text-cyan-300 hover:underline" to="/about">About</Link></li>
            <li><Link className="text-cyan-300 hover:underline" to="/contact">Contact</Link></li>
            <li><Link className="text-cyan-300 hover:underline" to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="text-cyan-300 hover:underline" to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link className="text-cyan-300 hover:underline" to="/5-letter-words">5 Letter Words</Link></li>
            <li><Link className="text-cyan-300 hover:underline" to="/words-starting-with-a">Words Starting With A</Link></li>
          </ul>
        </div>
      </div>
      </div>
    </main>
  );
}