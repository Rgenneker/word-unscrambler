import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import words from "an-array-of-english-words";

export default function WordPage() {
  const { word } = useParams();
  const cleanWord = word.toLowerCase();

  const exists = words.includes(cleanWord);

  if (!exists) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <Helmet>
          <title>Word Not Found | WordShuffl</title>
        </Helmet>

        <h1 className="text-3xl font-bold mb-4">Word Not Found</h1>
        <p className="mb-4">This word is not available in the WordShuffl dictionary yet.</p>

        <Link to="/" className="text-blue-600 underline">
          Back to WordShuffl
        </Link>
      </main>
    );
  }

  const title = `${word} Meaning, Definition and Word Help | WordShuffl`;
  const description = `Learn the meaning of ${word}, its definition, word type and vocabulary help on WordShuffl.`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={`https://wordshuffl.com/word/${encodeURIComponent(word.toLowerCase())}`}
        />
      </Helmet>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">
          {word} Meaning and Definition
        </h1>

        <p className="text-lg mb-6">
          Looking for the meaning of <strong>{word}</strong>? Here is a simple definition and useful word information.
        </p>

        <section className="mb-8">
  <h2 className="text-2xl font-semibold mb-2">
    Definition
  </h2>

  <p>
    Definition for "{word}" will be added in a future update.
  </p>
</section>

        {word && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Part of Speech</h2>
            <p>{word}</p>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-2">WordShuffl Word Tools</h2>
          <p>
            Use WordShuffl to unscramble words, solve word games, improve vocabulary and discover new English words.
          </p>
        </section>
      </main>
    </>
  );
}