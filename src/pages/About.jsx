import Footer from "../components/Footer";

export default function About() {
  return (
    <>
    <main className="min-h-screen bg-slate-950 text-slate-100">
  <section className="mx-auto max-w-7xl px-6 py-16">
    <div className="max-w-4xl">
      <h1 className="text-5xl font-black text-cyan-300">
        About WordShuffl
      </h1>

      <p className="mt-6 text-xl leading-9 text-slate-300">
        WordShuffl is a modern word unscrambler built to help users discover
        real English words from scrambled letters, improve vocabulary and solve
        word games faster.
      </p>

      <p className="mt-5 text-lg leading-8 text-slate-400">
        Whether you are playing Scrabble, solving Wordle, completing crossword
        puzzles or helping learners practise spelling, WordShuffl gives you a
        simple and powerful way to explore words.
      </p>
    </div>

    <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <p className="text-4xl font-black text-cyan-300">Fast</p>
        <p className="mt-2 text-slate-400">Instant word searches</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <p className="text-4xl font-black text-cyan-300">Free</p>
        <p className="mt-2 text-slate-400">No signup required</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <p className="text-4xl font-black text-cyan-300">15</p>
        <p className="mt-2 text-slate-400">Letters supported</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <p className="text-4xl font-black text-cyan-300">Smart</p>
        <p className="mt-2 text-slate-400">Filters and scoring</p>
      </div>
    </section>

    <section className="mt-14 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <h2 className="text-3xl font-black text-cyan-300">
        Core Features
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[
          ["🔤", "Word Unscrambler", "Generate useful English words from mixed letters."],
          ["🏆", "Score Ranking", "Find stronger words by viewing score-ranked results."],
          ["🎯", "Advanced Filters", "Filter by starts with, ends with, contains, length and patterns."],
          ["📖", "Definitions", "Check word meanings and expand your vocabulary."],
          ["📱", "Mobile Friendly", "Use WordShuffl easily on desktop, tablet or mobile."],
          ["⚡", "Fast Results", "Get results quickly without complicated steps."]
        ].map(([icon, title, text]) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-slate-950/50 p-6"
          >
            <div className="text-4xl">{icon}</div>
            <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="mt-14 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
  <h2 className="text-3xl font-black text-cyan-300">
    Who Uses WordShuffl?
  </h2>

  <p className="mt-4 max-w-3xl leading-8 text-slate-300">
    WordShuffl is designed for everyone who enjoys words, language learning and
    puzzle solving. Whether you are studying, teaching or competing, our tools
    help you discover stronger words in seconds.
  </p>

  <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {[
      ["🎓","Students"],
      ["👩‍🏫","Teachers"],
      ["🏆","Scrabble Players"],
      ["🟩","Wordle Players"],
      ["🧩","Crossword Fans"],
      ["✍️","Writers"],
      ["📚","Editors"],
      ["👨‍👩","Families"]
    ].map(([icon,title]) => (
      <div
        key={title}
        className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center transition hover:border-cyan-300/60"
      >
        <div className="text-5xl">{icon}</div>

        <h3 className="mt-4 text-lg font-bold text-white">
          {title}
        </h3>
      </div>
    ))}
  </div>
</section>
<section className="mt-14">
  <h2 className="text-3xl font-black text-cyan-300 text-center">
    Why Choose WordShuffl?
  </h2>

  <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <div className="text-5xl"></div>
      <h3 className="mt-5 text-xl font-bold">
        Lightning Fast
      </h3>
      <p className="mt-3 leading-7 text-slate-400">
        Find valid English words almost instantly.
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <div className="text-5xl"></div>
      <h3 className="mt-5 text-xl font-bold">
        Accurate Results
      </h3>
      <p className="mt-3 leading-7 text-slate-400">
        Intelligent filters help narrow down exactly the words you need.
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <div className="text-5xl"></div>
      <h3 className="mt-5 text-xl font-bold">
        Works Everywhere
      </h3>
      <p className="mt-3 leading-7 text-slate-400">
        Optimised for desktop, tablets and mobile devices.
      </p>
    </div>

    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <div className="text-5xl"></div>
      <h3 className="mt-5 text-xl font-bold">
        Completely Free
      </h3>
      <p className="mt-3 leading-7 text-slate-400">
        Use every feature without subscriptions or hidden charges.
      </p>
    </div>

  </div>
</section>
<section className="mt-16 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-12 text-center">

  <h2 className="text-4xl font-black text-cyan-300">
    Ready to Discover Better Words?
  </h2>

  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
    Start using WordShuffl today to unscramble words, improve your vocabulary,
    solve puzzles and become a stronger word game player.
  </p>

  <a
    href="/"
    className="mt-10 inline-block rounded-2xl bg-cyan-400 px-10 py-4 text-lg font-bold text-slate-950 transition hover:scale-105"
  >
    Start Unscrambling
  </a>

</section>
  </section>
</main>
    </>
  );
}