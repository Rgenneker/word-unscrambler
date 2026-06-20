export default function FAQSection({ faqs = [] }) {
  return (
    <section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <h2 className="text-3xl font-black text-cyan-300">
        Frequently Asked Questions
      </h2>

      <div className="mt-8 space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl bg-slate-950/60 p-5">
            <h3 className="text-lg font-bold text-white">
              {faq.question}
            </h3>
            <p className="mt-3 leading-7 text-slate-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}