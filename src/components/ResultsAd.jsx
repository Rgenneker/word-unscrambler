import { useEffect, useRef } from "react";

export default function ResultsAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    window.atOptions = {
      key: "345494ce0dcf43bd899f77280fcd57c0",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/345494ce0dcf43bd899f77280fcd57c0/invoke.js";
    script.async = true;

    adRef.current.appendChild(script);
  }, []);

  return <div ref={adRef} className="w-[300px] h-[250px]" />;
}