import { useEffect, useRef } from "react";

const AD_ID = "0f8e7be192fc2efa33c5da2e34e2f56a";
const SCRIPT_URL =
  "https://pl29741880.effectivecpmnetwork.com/0f8e7be192fc2efa33c5da2e34e2f56a/invoke.js";

export default function NativeBannerAd() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    // Clear anything left from an earlier render
    wrapper.innerHTML = "";

    // Adsterra requires this exact container ID
    const adContainer = document.createElement("div");
    adContainer.id = `container-${AD_ID}`;
    wrapper.appendChild(adContainer);

    // Load the Adsterra script
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = SCRIPT_URL;

    script.onload = () => {
      console.log("Adsterra Native Banner loaded successfully");
    };

    script.onerror = (error) => {
      console.error("Adsterra Native Banner failed to load", error);
    };

    wrapper.insertBefore(script, adContainer);

    return () => {
      wrapper.innerHTML = "";
    };
  }, []);

  return (
    <div className="my-6 flex w-full justify-center">
      <div ref={wrapperRef} className="w-full" />
    </div>
  );
}