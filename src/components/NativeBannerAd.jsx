import { useEffect } from "react";

const AD_ID = "0f8e7be192fc2efa33c5da2e34e2f56a";

export default function NativeBannerAd() {
  useEffect(() => {
    const scriptId = `adsterra-native-${AD_ID}`;

    // Prevent the same script from being added more than once
    if (document.getElementById(scriptId)) {
      return;
    }

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

    const adContainer = document.getElementById(`container-${AD_ID}`);

    if (adContainer) {
      adContainer.parentElement?.insertBefore(script, adContainer);
    }

    return () => {
      const existingScript = document.getElementById(scriptId);

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="my-6 flex w-full justify-center">
      <div id={`container-${AD_ID}`}></div>
    </div>
  );
}