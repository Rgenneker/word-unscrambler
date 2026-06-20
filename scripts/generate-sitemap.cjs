const fs = require("fs");

const base = "https://wordshuffl.com";

const pages = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/sitemap",
  "/5-letter-words",
  "/words-starting-with",
  "/words-ending-with",
  "/words-ending-with-ing",
  "/words-starting-with-a",
  "/word-length",
  "/letter-combinations",
  "/articles",
];

const articles = [
  "best-5-letter-words-in-scrabble",
  "how-to-win-at-wordle",
  "common-english-prefixes",
  "common-english-suffixes",
  "100-powerful-vocabulary-words",
  "best-crossword-solving-strategies",
  "letter-frequency-in-english",
  "scrabble-words-with-q",
  "scrabble-words-with-x",
  "scrabble-words-with-z",
  "best-wordle-starting-words",
  "five-letter-words-ending-in-e",
  "five-letter-words-with-ai",
  "words-ending-in-ing",
  "words-starting-with-str",
  "words-ending-in-tion",
  "how-to-improve-vocabulary",
  "anagrams-explained",
  "how-to-solve-anagrams",
  "english-root-words",
  "vowels-and-consonants",
  "spelling-practice-strategies",
  "word-games-for-learning",
  "best-words-for-crosswords",
  "common-seven-letter-words",
  "longest-english-words",
  "difficult-wordle-answers",
  "how-scrabble-scoring-works",
  "wordle-pattern-strategy",
  "crossword-clue-techniques",
  "short-words-that-score-high",
  "two-letter-scrabble-words",
  "three-letter-scrabble-words",
  "four-letter-word-strategy",
  "five-letter-word-strategy",
  "six-letter-word-strategy",
  "seven-letter-word-strategy",
  "word-patterns-for-games",
  "prefixes-for-word-games",
  "suffixes-for-word-games",
  "how-to-build-better-words",
  "daily-vocabulary-habits",
  "spelling-bee-preparation",
  "word-discovery-for-students",
  "word-games-for-adults",
  "crossword-solving-for-beginners",
  "advanced-scrabble-strategy",
  "advanced-wordle-strategy",
  "english-language-word-formation",
  "why-word-games-improve-language",
];

const urls = [
  ...pages,
  ...articles.map((slug) => `/articles/${slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${base}${url}</loc>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync("public/sitemap.xml", sitemap);
console.log(`Generated sitemap with ${urls.length} URLs`);