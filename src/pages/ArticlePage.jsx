import { articleContent } from "../data/articleContent";
import { Link, useParams } from "react-router-dom";
import { getArticleBySlug } from "../data/articles";
import StructuredData from "../components/geo/StructuredData";

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
const content = articleContent[slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <h1 className="text-4xl font-black text-cyan-300">Article not found</h1>
        <Link className="mt-6 block text-cyan-300 underline" to="/articles">
          Back to Articles
        </Link>
      </main>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: { "@type": "Organization", name: "WordShuffl Authors" },
    publisher: { "@type": "Organization", name: "WordShuffl" },
    mainEntityOfPage: `https://wordshuffl.com/articles/${article.slug}`,
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <StructuredData data={articleSchema} />

      <article className="mx-auto max-w-4xl">
        <Link className="text-cyan-300 hover:underline" to="/articles">
          ← Back to Articles
        </Link>

        <p className="mt-8 text-sm font-bold uppercase tracking-wide text-cyan-300">
          {article.category}
        </p>

        <h1 className="mt-4 text-5xl font-black text-white">
          {article.title}
        </h1>

        <p className="mt-4 text-slate-400">By WordShuffl Authors</p>

        <div className="mt-10 space-y-8 leading-8 text-slate-300">
          <p>
            {article.title} is an important topic for anyone interested in word games,
            vocabulary development, spelling improvement and English language learning.
            WordShuffl created this guide to help players, students, teachers and puzzle
            solvers understand how word patterns can improve performance and confidence.
          </p>

          <p>
            In games such as Scrabble, Wordle and crosswords, success often depends on
            recognising useful letter patterns quickly. Strong players do not only memorise
            words; they understand prefixes, suffixes, vowels, consonants, anagrams and
            common English structures. This article explains the topic in a practical way
            so that users can apply the knowledge immediately.
          </p>

          <h2 className="text-3xl font-black text-cyan-300">Why This Matters</h2>

          <p>
            Word knowledge improves with repeated exposure. When users study word groups,
            they begin to notice patterns that appear across many words. This improves
            reading fluency, spelling accuracy and problem-solving ability. For Wordle
            players, pattern awareness can reduce wasted guesses. For Scrabble players,
            it can reveal better tile placements. For crossword solvers, it can make
            clues easier to interpret.
          </p>

          <h2 className="text-3xl font-black text-cyan-300">How To Use This Knowledge</h2>

          <p>
            Start by reviewing examples, then practise applying them in real puzzles.
            Use WordShuffl tools such as 5 Letter Words, Words Starting With, Words
            Ending With, Word Length and Letter Combinations to explore related patterns.
            The more often you compare words, the faster your brain recognises useful
            combinations.
          </p>

          <p>
            Vocabulary learning should be active. Read the word, say it aloud, write it
            in a sentence and notice where it appears in other words. This approach works
            well for learners, teachers, writers and word game enthusiasts.
          </p>

          <h2 className="text-3xl font-black text-cyan-300">WordShuffl Recommendation</h2>

          <p>
            Use this article together with the WordShuffl tools. Explore words by length,
            starting letters, ending letters and letter combinations. This creates a
            stronger learning loop than reading alone. Over time, users build confidence
            with Scrabble, Wordle, crosswords, spelling and general English vocabulary.
          </p>

          <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-6">
            <h3 className="text-2xl font-black text-cyan-300">Explore related tools</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link className="rounded-full bg-cyan-400 px-5 py-3 font-bold text-slate-950" to="/5-letter-words">5 Letter Words</Link>
              <Link className="rounded-full border border-cyan-400/30 px-5 py-3 font-bold text-cyan-300" to="/words-starting-with">Words Starting With</Link>
              <Link className="rounded-full border border-cyan-400/30 px-5 py-3 font-bold text-cyan-300" to="/words-ending-with">Words Ending With</Link>
              <Link className="rounded-full border border-cyan-400/30 px-5 py-3 font-bold text-cyan-300" to="/letter-combinations">Letter Combinations</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}