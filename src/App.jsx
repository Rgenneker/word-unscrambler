import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FiveLetterWords from "./pages/FiveLetterWords";
import WordsStartingWith from "./pages/WordsStartingWith";
import WordsEndingWith from "./pages/WordsEndingWith";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/5-letter-words" element={<FiveLetterWords />} />
        <Route path="/words-starting-with-a" element={<WordsStartingWith />} />
        <Route path="/words-ending-in-ing" element={<WordsEndingWith />} />
      </Routes>
    </BrowserRouter>
  );
}