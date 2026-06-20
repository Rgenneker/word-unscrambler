export default function HowToUseSection({ title, children }) {
  return (
    <section className="mt-16 rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-8">
      <h2 className="text-3xl font-black text-cyan-300">
        {title || "How To Use This Tool"}
      </h2>

      <div className="mt-6 space-y-5 leading-8 text-slate-300">
        {children}
      </div>
    </section>
  );
}