import { useEffect, useState } from "react";

function useAdScript({ scriptId, containerId, options, src, attrs = {}, insertBefore = false }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById(scriptId)) return;

    if (options) {
      window.atOptions = options;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;

    if (src) {
      script.src = src;
    }

    Object.entries(attrs).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    const container = document.getElementById(containerId);
    if (container) {
      if (insertBefore && container.parentNode) {
        container.parentNode.insertBefore(script, container);
      } else {
        container.appendChild(script);
      }
    } else {
      document.body.appendChild(script);
    }
  }, []);
}

function AdSlot160x300() {
  useAdScript({
    scriptId: "hp-160x300-script",
    containerId: "ad-160x300",
    options: {
      key: "99b99bd48ed0c826c383982244d7b748",
      format: "iframe",
      height: 300,
      width: 160,
      params: {},
    },
    src: "https://www.highperformanceformat.com/99b99bd48ed0c826c383982244d7b748/invoke.js",
    attrs: {},
  });

  return (
    <div className="hidden xl:block fixed left-[40px] top-[180px] z-50 w-[160px] h-[300px] rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl">
      <div id="ad-160x300" className="h-full w-full" />
    </div>
  );
}

function NativeBannerSlot() {
  useAdScript({
    scriptId: "native-banner-script",
    containerId: "container-0f8e7be192fc2efa33c5da2e34e2f56a",
    src: "https://pl29741880.effectivecpmnetwork.com/0f8e7be192fc2efa33c5da2e34e2f56a/invoke.js",
    attrs: {
      async: "async",
      "data-cfasync": "false",
    },
    insertBefore: true,
  });

  return (
    <div className="hidden xl:block fixed right-[40px] top-[180px] z-50 w-[160px] h-[300px] rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden">
      <div id="container-0f8e7be192fc2efa33c5da2e34e2f56a" className="h-full w-full" />
    </div>
  );
}

function AdSlot320x50() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hidden = localStorage.getItem("wordshuffl_ad_320x50_hidden");
    setIsVisible(hidden !== "true");
  }, []);

  useAdScript({
    scriptId: "hp-320x50-script",
    containerId: "ad-320x50",
    options: {
      key: "18c04c850a95bb40a9cd68d794020262",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    },
    src: "https://www.highperformanceformat.com/18c04c850a95bb40a9cd68d794020262/invoke.js",
    attrs: {},
  });

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="fixed bottom-0 left-0 right-0 z-50 block sm:static">
        <div className="mx-auto w-full max-w-[320px] rounded-t-3xl border border-white/10 bg-slate-950/95 px-4 py-2 shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:bg-slate-950/80 sm:px-0 sm:py-0">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 sm:hidden">
            <span>Ad</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("wordshuffl_ad_320x50_hidden", "true");
                  setIsVisible(false);
                }}
                className="text-slate-400 transition hover:text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
          <div id="ad-320x50" className="mt-1 h-[50px] w-[320px]" />
        </div>
      </div>
    </div>
  );
}

export default function AdSlots() {
  return (
    <>
      <AdSlot160x300 />
      <NativeBannerSlot />
      <AdSlot320x50 />
    </>
  );
}
