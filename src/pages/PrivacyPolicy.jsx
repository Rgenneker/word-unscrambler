import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-black text-cyan-300">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-8 text-slate-300 leading-8">

          <p>
            The privacy of our visitors here at WordShuffl.com is very important to us.
          </p>

          <p>
            This page clearly outlines the types of personal information collected
            and recorded when you visit and use our website, why we collect certain
            information, and how we safeguard and use that information.
          </p>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Log Files
            </h2>

            <p className="mt-4">
              WordShuffl.com follows a standard procedure of using log files.
              These files log visitors when they visit websites. All hosting
              companies do this as part of hosting analytics.
            </p>

            <p className="mt-4">
              The information collected by log files include:
            </p>

            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>IP (Internet Protocol) Address</li>
              <li>ISP (Internet Service Provider)</li>
              <li>Web browser type</li>
              <li>Your visit time</li>
              <li>Date and time stamp</li>
              <li>Referring and exit pages</li>
            </ul>

            <p className="mt-6">
              These are not linked to any information that is personally identifiable.
            </p>

            <p className="mt-4">
              The purpose of this information is for:
            </p>

            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>Analyzing trends</li>
              <li>Administering the website</li>
              <li>Tracking user movement on the website</li>
              <li>Gathering demographic information</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Cookies & Web Beacons
            </h2>

            <p className="mt-4">
              Like many other websites, WordShuffl.com uses cookies.
            </p>

            <p className="mt-4">
              These cookies are used to store information including visitor preferences
              and the pages on the website that the visitor accessed or visited.
            </p>

            <p className="mt-4">
              The information is used to optimize the user's experience by customizing
              web page content based on browser type and other information.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Google Analytics
            </h2>

            <p className="mt-4">
              WordShuffl.com may use Google Analytics to better understand how
              visitors interact with the website.
            </p>

            <p className="mt-4">
              Analytics may collect anonymous usage data including pages visited,
              session duration, browser information, and general geographic location.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Google DoubleClick DART Cookie
            </h2>

            <p className="mt-4">
              Google is one of a third-party vendor on our site.
              It also uses cookies, known as DART cookies, to serve ads to our site
              visitors based upon their visit to this and other websites on the internet.
            </p>

            <p className="mt-4">
              Visitors may choose to decline the use of DART cookies by visiting:
            </p>

            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-cyan-300 hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>

            <p className="mt-6">
              You can opt out of personalized ads and control how Google shows ads by visiting:
            </p>

            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-cyan-300 hover:underline"
            >
              https://adssettings.google.com
            </a>

            <a
              href="http://www.aboutads.info/choices/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-cyan-300 hover:underline"
            >
              http://www.aboutads.info/choices/
            </a>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Our Advertising Partners
            </h2>

            <p className="mt-4">
              Some advertisers listed on our ads.txt may use cookies and web beacons.
            </p>

            <p className="mt-4">
              Each advertising partner has their own privacy policies regarding user data.
            </p>

            <div className="mt-6 space-y-3">
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">Google</a>

              <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">Amazon</a>

              <a href="https://www.sovrn.com/privacy-policy/" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">Sovrn</a>

              <a href="https://districtm.net/en/page/platforms-data-and-privacy-policy/" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">DistrictM</a>

              <a href="https://www.indexexchange.com/privacy/" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">Index Exchange</a>

              <a href="https://www.appnexus.com/platform-privacy-policy" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">AppNexus</a>

              <a href="https://www.openx.com/legal/privacy-policy/" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">OpenX</a>

              <a href="https://rubiconproject.com/privacy-policy/" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">Rubicon Project</a>

              <a href="https://pubmatic.com/legal/privacy-policy/" target="_blank" rel="noreferrer" className="block text-cyan-300 hover:underline">Pubmatic</a>
            </div>

            <p className="mt-6">
              Third-party ad servers or ad networks use technologies such as cookies,
              JavaScript, or Web Beacons that are used in their advertisements and links.
            </p>

            <p className="mt-4">
              These technologies are used to measure advertising effectiveness and personalize content.
            </p>

            <p className="mt-4">
              WordShuffl.com has no access to or control over cookies used by third-party advertisers.
            </p>

            <p className="mt-4">
              Users may disable cookies in their browser settings, although this may affect website usability.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Children's Information / CCPA
            </h2>

            <p className="mt-4">
              Protecting children while using the internet is one of our priorities.
            </p>

            <p className="mt-4">
              WordShuffl.com does not knowingly collect personally identifiable
              information from children under the age of 13.
            </p>

            <p className="mt-4">
              If you believe your child provided this type of information on our website,
              please contact us immediately and we will promptly remove such information.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Additional Privacy Commitment
            </h2>

            <p className="mt-4">
              WordShuffl respects your privacy and is committed to protecting your personal information.
            </p>

            <p className="mt-4">
              We may use cookies, analytics, and advertising technologies to improve user experience and website performance.
            </p>

            <p className="mt-4">
              Third-party services such as Google AdSense and analytics providers may collect non-personal browsing information.
            </p>

            <p className="mt-4">
              We do not sell personal information to third parties.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-8">
            <h2 className="text-3xl font-bold text-cyan-200">
              Consent
            </h2>

            <p className="mt-4">
              By using WordShuffl.com, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>

        </div>
      </div>
      </div>
    </main>
  );
}