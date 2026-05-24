import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import SitemapPage from "./pages/SitemapPage";
import FiveLetterWords from "./pages/FiveLetterWords";
import WordsEndingWith from "./pages/WordsEndingWith";
import WordsStartingWith from "./pages/WordsStartingWith";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/5-letter-words" element={<FiveLetterWords />} />
        <Route path="/words-starting-with-a" element={<WordsStartingWith />} />
        <Route path="/words-ending-with" element={<WordsEndingWith />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/sitemap" element={<SitemapPage />} />
      </Routes>
    </BrowserRouter>
  );
}