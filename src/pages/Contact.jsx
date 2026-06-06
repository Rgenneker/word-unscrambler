import Footer from "../components/Footer";

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
       
        <div className="p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-cyan-300">Contact Us</h1>

        <p className="mt-6 text-lg text-slate-300">
          Need assistance, found an issue, or want to suggest new features?
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/50 p-8">
          <p className="text-xl font-semibold text-cyan-200">
            Email Support
          </p>

          <p className="mt-3 text-lg text-slate-300">
  <a
    href="mailto:support@wordshuffl.com"
    className="text-cyan-300 transition hover:underline"
  >
    support@wordshuffl.com
  </a>
</p>

          <p className="mt-6 text-slate-400 leading-7">
            We aim to respond to all inquiries within 24–48 hours.
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </main>
  );
}