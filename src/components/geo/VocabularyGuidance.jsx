export default function VocabularyGuidance({ children }) {
  return (
    <section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <h2 className="text-3xl font-black text-cyan-300">
        Vocabulary Guidance
      </h2>

      <div className="mt-6 space-y-5 leading-8 text-slate-300">
        {children}
      </div>
    </section>
  );
}