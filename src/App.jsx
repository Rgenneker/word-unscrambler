import LongestEnglishWords from "./pages/LongestEnglishWords";
import CommonSevenLetterWords from "./pages/CommonSevenLetterWords";
import DifficultWordleAnswers from "./pages/DifficultWordleAnswers";
import Articles from "./pages/Articles";
import ArticlePage from "./pages/ArticlePage";
import ToolGeoRouter from "./components/geo/ToolGeoRouter";
import WordPage from "./pages/WordPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import SitemapPage from "./pages/SitemapPage";
import FiveLetterWords from "./pages/FiveLetterWords";
import WordsEndingWith from "./pages/WordsEndingWith";
import WordsEndingWithing from "./pages/WordsEndingWithing";
import WordsStartingWith from "./pages/WordsStartingWith";
import WordsStartingWitha from "./pages/WordsStartingWitha";
import WordLength from "./pages/WordLength";
import LetterCombination from "./pages/LetterCombination";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* This fixes the scroll behavior for all links instantly */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word/:word" element={<WordPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/5-letter-words" element={<FiveLetterWords />} />
        <Route path="/words-starting-with" element={<WordsStartingWith />} />
        <Route path="/words-starting-with-a" element={<WordsStartingWitha />} />
        <Route path="/words-ending-with" element={<WordsEndingWith />} />
        <Route path="/words-ending-with-ing" element={<WordsEndingWithing />} />
        <Route path="/word-length" element={<WordLength />} />
        <Route path="/letter-combinations" element={<LetterCombination />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/word/:word" element={<WordPage />} />
        <Route path="/articles" element={<Articles />} />
<Route path="/articles/:slug" element={<ArticlePage />} />
<Route path="/longest-english-words" element={<LongestEnglishWords />} />
<Route path="/common-7-letter-words" element={<CommonSevenLetterWords />} />
<Route path="/difficult-wordle-answers" element={<DifficultWordleAnswers />} />
      </Routes>
      <ToolGeoRouter />
      <Footer />
         </BrowserRouter>
  );
}