export default function PartnerLinks() {
  return (
    <div className="mt-12 rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-8 text-center">
      <h3 className="mb-6 text-xl font-bold text-white">
        Explore More Helpful Tools
      </h3>

      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <a
          href="https://lexigenz.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-300"
        >
          For Better Vocabulary Visit LexigenZ
        </a>

        <a
          href="https://trufflshuffl.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-cyan-400 bg-slate-950 px-6 py-3 font-semibold text-cyan-300 transition hover:scale-105 hover:bg-cyan-400/10"
        >
          Need Help To Calculate & Convert? Visit TrufflShuffl
        </a>
      </div>
    </div>
  );
}