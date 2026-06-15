const fs = require("fs-extra");
const path = require("path");

const words = require("an-array-of-english-words");

const dictDir = path.join(__dirname, "../node_modules/wordnet-db/dict");
const outputFile = path.join(__dirname, "../src/data/dictionary.json");

const parts = [
  { pos: "noun", file: "data.noun" },
  { pos: "verb", file: "data.verb" },
  { pos: "adjective", file: "data.adj" },
  { pos: "adverb", file: "data.adv" },
];

function parseDataFile(filePath, partOfSpeech, allowedWords, results) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    if (!line || line.startsWith("  ")) continue;

    const glossSplit = line.split(" | ");
    if (glossSplit.length < 2) continue;

    const dataPart = glossSplit[0];
    const gloss = glossSplit[1].split(";")[0].trim();

    const tokens = dataPart.trim().split(/\s+/);

    const wordCountHex = tokens[3];
    const wordCount = parseInt(wordCountHex, 16);

    let index = 4;

    for (let i = 0; i < wordCount; i++) {
      const rawWord = tokens[index];
      index += 2;

      const cleanWord = rawWord.toLowerCase().replace(/_/g, " ");

      if (!allowedWords.has(cleanWord)) continue;
      if (results.has(cleanWord)) continue;

      results.set(cleanWord, {
        word: cleanWord,
        definition: gloss,
        partOfSpeech,
      });
    }
  }
}

async function generateDefinitions() {
  const allowedWords = new Set(words.map((word) => word.toLowerCase()));
  const results = new Map();

  for (const part of parts) {
    const filePath = path.join(dictDir, part.file);
    console.log(`Reading ${part.file}...`);
    parseDataFile(filePath, part.pos, allowedWords, results);
  }

  const dictionary = Array.from(results.values()).sort((a, b) =>
    a.word.localeCompare(b.word)
  );

  await fs.writeJson(outputFile, dictionary, { spaces: 2 });

  console.log(`Generated ${dictionary.length} definitions.`);
  console.log(`Saved to src/data/dictionary.json`);
}

generateDefinitions();