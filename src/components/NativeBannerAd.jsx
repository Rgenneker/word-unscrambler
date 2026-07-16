import { useEffect } from "react";

const AD_ID = "0f8e7be192fc2efa33c5da2e34e2f56a";

export default function NativeBannerAd() {
  useEffect(() => {
    const scriptId = `adsterra-script-${AD_ID}`;

    if (document.getElementById(scriptId)) return;

    const container = document.getElementById(`container-${AD_ID}`);

    if (!container) return;

    const script = document.createElement("script");

    script.id = scriptId;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl29741880.effectivecpmnetwork.com/0f8e7be192fc2efa33c5da2e34e2f56a/invoke.js";

    script.onload = () => {
      console.log("Adsterra Native Banner loaded successfully");
    };

    script.onerror = () => {
      console.error("Adsterra Native Banner failed to load");
    };

    container.parentNode?.insertBefore(script, container);
  }, []);

  return (
    <div className="w-full border-b border-white/10 bg-slate-950/90 px-4 py-3">
      <div className="mx-auto flex min-h-[90px] max-w-7xl items-center justify-center">
        <div
          id={`container-${AD_ID}`}
          className="w-full text-center"
        />
      </div>
    </div>
  );
}