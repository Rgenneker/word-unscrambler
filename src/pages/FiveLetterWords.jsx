import { useState } from "react";
import Footer from "../components/Footer";

const wordPool = {
  A: ["apple", "angel", "adore", "alive", "arena", "arrow", "agent", "amuse"],
  B: ["brain", "brave", "bloom", "beach", "basic", "baker", "blend", "boost"],
  C: ["candy", "cloud", "chair", "crisp", "crown", "cabin", "curve", "cable"],
  D: ["dream", "daisy", "drift", "doubt", "demon", "delta", "dance", "draft"],
  E: ["eager", "earth", "elite", "enjoy", "eagle", "entry", "event", "elect"],
  F: ["flame", "frost", "faith", "fresh", "focus", "fancy", "frame", "flash"],
  G: ["grace", "globe", "giant", "glory", "green", "grain", "guide", "ghost"],
  H: ["heart", "happy", "honor", "house", "human", "honey", "hover", "habit"],
  I: ["ivory", "image", "index", "ideal", "input", "issue", "irony", "inner"],
  J: ["jolly", "joker", "juice", "judge", "jazzy", "jewel", "joint", "japan"],
  K: ["knife", "known", "kneel", "karma", "koala", "kayak", "kitty", "knead"],
  L: ["light", "lucky", "lemon", "lunar", "lodge", "label", "layer", "laser"],
  M: ["magic", "metal", "model", "mango", "motor", "match", "moral", "music"],
  N: ["noble", "ninja", "night", "novel", "nurse", "north", "nerve", "naked"],
  O: ["ocean", "olive", "orbit", "opera", "omega", "order", "organ", "offer"],
  P: ["pride", "power", "peace", "piano", "panel", "phase", "point", "print"],
  Q: ["queen", "quick", "quest", "quiet", "quota", "quilt", "quake", "query"],
  R: ["river", "royal", "raven", "rough", "radio", "rider", "risky", "route"],
  S: ["stone", "smile", "spark", "sweet", "solar", "scale", "sugar", "storm"],
  T: ["tiger", "table", "trust", "tower", "torch", "theme", "track", "toast"],
  U: ["ultra", "union", "urban", "upset", "usage", "under", "unity", "usher"],
  V: ["vivid", "value", "vapor", "vocal", "visit", "video", "voice", "voter"],
  W: ["water", "world", "whale", "wrist", "woven", "watch", "worry", "wider"],
  X: ["xenon", "xylem", "xenic", "xerox", "xenial"],
  Y: ["young", "yield", "yearn", "yacht", "yummy", "yours", "youth", "yeast"],
  Z: ["zebra", "zesty", "zonal", "zippy", "zooms", "zebra", "zincs", "zesty"],
};

function getRandomWords(words, count = 5) {
  return [...words]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
}

export default function FiveLetterWords() {
  const [refreshKey, setRefreshKey] = useState(0);

  const generateWords = () => {
    const result = {};

    Object.keys(wordPool).forEach((letter) => {
      result[letter] = getRandomWords(wordPool[letter]);
    });

    return result;
  };

  const [displayWords, setDisplayWords] = useState(generateWords());

  const refreshWords = () => {
    setDisplayWords(generateWords());
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      <div className="p-10">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <h1 className="text-5xl font-black text-cyan-300">
              5 Letter Words
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Explore randomly generated five-letter English words
              organized alphabetically for puzzles, games, and vocabulary building.
            </p>

            <button
              onClick={refreshWords}
              className="mt-8 rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 hover:bg-cyan-300"
            >
              Refresh Words
            </button>
          </div>

          <div
            key={refreshKey}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >

            {Object.entries(displayWords).map(([letter, list]) => (
              <div
                key={letter}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-black text-cyan-300">
                    {letter}
                  </h2>

                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    5 words
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {list.map((word) => (
                    <span
                      key={word}
                      className="rounded-2xl border border-cyan-400/20 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}