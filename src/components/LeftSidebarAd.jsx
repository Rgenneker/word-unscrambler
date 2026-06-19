import { useEffect, useRef } from "react";

export default function LeftSidebarAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    window.atOptions = {
      key: "e5939d4d819acd28bbb6d673a68887d4",
      format: "iframe",
      height: 600,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/e5939d4d819acd28bbb6d673a68887d4/invoke.js";
    script.type = "text/javascript";
    script.async = true;

    adRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-[160px] h-[600px] overflow-hidden">
      <div ref={adRef} />
    </div>
  );
}