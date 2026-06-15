const fs = require("fs-extra");
const path = require("path");
const slugify = require("slugify");

const dictionary = require("../src/data/dictionary.json");

const outputDir = path.join(__dirname, "../src/pages/words");

function cleanSlug(word) {
  return slugify(word.toLowerCase(), {
    lower: true,
    strict: true,
  });
}

async function generatePages() {
  await fs.ensureDir(outputDir);

  for (const entry of dictionary) {
    if (!entry.word || !entry.definition) continue;

    const slug = cleanSlug(entry.word);
    const filePath = path.join(outputDir, `${slug}.jsx`);

    const page = `
import React from "react";

export default function ${toComponentName(slug)}() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">
        ${escapeText(entry.word)} Meaning, Definition and Word Help
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Looking for the meaning of <strong>${escapeText(entry.word)}</strong>? 
        Here is a simple definition, word type and useful language guidance.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Definition</h2>
        <p>${escapeText(entry.definition)}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Part of Speech</h2>
        <p>${escapeText(entry.partOfSpeech || "Word")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Use WordShuffl</h2>
        <p>
          Use WordShuffl to unscramble words, improve vocabulary, solve word games,
          and discover new English words.
        </p>
      </section>
    </main>
  );
}
`;

    await fs.writeFile(filePath, page.trim());
  }

  console.log(`Generated ${dictionary.length} word landing pages.`);
}

function toComponentName(slug) {
  return (
    "Word" +
    slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("")
      .replace(/[^a-zA-Z0-9]/g, "")
  );
}

function escapeText(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

generatePages();