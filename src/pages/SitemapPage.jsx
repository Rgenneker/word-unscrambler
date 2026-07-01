import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function SitemapPage() {
  return (
    <>
  <div className="hidden xl:block fixed left-[40px] top-[180px] z-50 w-[160px] h-[600px]">
    
  </div>

  <div className="hidden xl:block fixed right-[40px] top-[180px] z-50 w-[160px] h-[300px]">
   
  </div>
    <main className="min-h-screen bg-slate-950 text-white">
        
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

  <Link className="block text-cyan-300 hover:underline"  to="/longest-english-words">Longest English Words</Link>
<Link className="block text-cyan-300 hover:underline" to="/common-7-letter-words">Common 7 Letter Words</Link>
<Link className="block text-cyan-300 hover:underline" to="/difficult-wordle-answers">Difficult Wordle Answers</Link>
<Link className="block text-cyan-300 hover:underline" to="/articles">Articles</Link>
</div>
      </div>
      </div>
    
    </main>
    </>
  );
}