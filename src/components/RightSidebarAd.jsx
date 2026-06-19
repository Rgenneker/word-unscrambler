import { useEffect, useRef } from "react";

export default function RightSidebarAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    window.atOptions = {
      key: "99b99bd48ed0c826c383982244d7b748",
      format: "iframe",
      height: 300,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/99b99bd48ed0c826c383982244d7b748/invoke.js";
    script.type = "text/javascript";
    script.async = true;

    adRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-[160px] h-[300px] overflow-hidden">
      <div ref={adRef} />
    </div>
  );
}