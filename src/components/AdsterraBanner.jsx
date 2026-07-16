import { useEffect, useRef } from "react";

export default function NativeBannerAd() {
  const adRef = useRef(null);

  useEffect(() => {
    const container = adRef.current;

    if (!container) return;

    // Prevent duplicate ads
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://pl29741880.effectivecpmnetwork.com/0f8e7be192fc2efa33c5da2e34e2f56a/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    script.onload = () => {
      console.log("Native banner loaded");
    };

    script.onerror = (e) => {
      console.error("Native banner failed to load", e);
    };

    container.appendChild(script);

    const adContainer = document.createElement("div");
    adContainer.id = "container-0f8e7be192fc2efa33c5da2e34e2f56a";

    container.appendChild(adContainer);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={adRef}></div>;
}