import dictionary from "../data/dictionary.json";

export function findWord(word) {
  const cleanWord = word.toLowerCase().trim();

  return dictionary.find(
    (entry) => entry.word.toLowerCase() === cleanWord
  );
}