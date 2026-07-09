import { useEffect, useState } from "react";

function useAdScript({ scriptId, containerId, options, src, attrs = {}, insertBefore = false, attempt = 0, onLoad, onError }) {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      // avoid duplicate script element
      if (document.getElementById(scriptId)) {
        console.debug("ad-loader: script already present", { scriptId });
        return;
      }

      if (options) {
        // expose options for provider script
        window.atOptions = options;
        console.debug("ad-loader: set atOptions", { scriptId, options, attempt });
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

      script.onload = () => {
        console.debug("ad-loader: script loaded", { scriptId, src, attempt });
        if (typeof onLoad === "function") onLoad();
      };

      script.onerror = (err) => {
        console.error("ad-loader: script failed to load", { scriptId, src, attempt, err });
        if (typeof onError === "function") onError(err);
      };

      const container = document.getElementById(containerId);
      if (container) {
        console.debug("ad-loader: attaching script to container", { scriptId, containerId, attempt });
        if (insertBefore && container.parentNode) {
          container.parentNode.insertBefore(script, container);
        } else {
          container.appendChild(script);
        }
      } else {
        console.debug("ad-loader: container not found, appending script to body", { scriptId, containerId, attempt });
        document.body.appendChild(script);
      }
    } catch (e) {
      console.error("ad-loader: unexpected error", e);
      if (typeof onError === "function") onError(e);
    }
    // re-run when attempt changes (parent can increment attempt to retry)
  }, [attempt]);
}

function AdSlot160x300() {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

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
    attempt,
    onError: () => {
      // retry strategy: 3 attempts
      if (attempt < 2) {
        const delay = [2000, 5000][attempt] || 5000;
        console.debug("ad-loader: will retry hp-160x300 in ms", delay);
        setTimeout(() => setAttempt((a) => a + 1), delay);
      } else {
        setFailed(true);
      }
    },
  });

  return (
    <div className="hidden xl:block fixed left-[40px] top-[180px] z-50 w-[160px] h-[300px] rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden">
      {!failed ? (
        <div id="ad-160x300" className="h-full w-full" />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-sm text-slate-400">
          Advertisement
        </div>
      )}
    </div>
  );
}

function NativeBannerSlot() {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  useAdScript({
    scriptId: "native-banner-script",
    containerId: "container-0f8e7be192fc2efa33c5da2e34e2f56a",
    src: "https://pl29741880.effectivecpmnetwork.com/0f8e7be192fc2efa33c5da2e34e2f56a/invoke.js",
    attrs: {
      async: "async",
      "data-cfasync": "false",
    },
    insertBefore: true,
    attempt,
    onError: () => {
      if (attempt < 2) {
        const delay = [2000, 5000][attempt] || 5000;
        setTimeout(() => setAttempt((a) => a + 1), delay);
      } else {
        setFailed(true);
      }
    },
  });

  return (
    <div className="hidden xl:block fixed right-[40px] top-[180px] z-50 w-[160px] h-[300px] rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl overflow-hidden">
      {!failed ? (
        <div id="container-0f8e7be192fc2efa33c5da2e34e2f56a" className="h-full w-full" />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-sm text-slate-400">
          Advertisement
        </div>
      )}
    </div>
  );
}

function AdSlot320x50() {
  const [isVisible, setIsVisible] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

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
    attempt,
    onError: () => {
      if (attempt < 2) {
        const delay = [2000, 5000][attempt] || 5000;
        setTimeout(() => setAttempt((a) => a + 1), delay);
      } else {
        setFailed(true);
      }
    },
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
          {!failed ? (
            <div id="ad-320x50" className="mt-1 h-[50px] w-[320px]" />
          ) : (
            <div className="h-[50px] w-[320px] flex items-center justify-center text-sm text-slate-400">
              Advertisement
            </div>
          )}
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
