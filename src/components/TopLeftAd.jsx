import { useEffect, useRef } from "react";

export default function TopLeftAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    window.atOptions = {
      key: "f0f1e89d0da29b92cdb449717029c6a1",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/f0f1e89d0da29b92cdb449717029c6a1/invoke.js";
    script.async = true;

    adRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-[300px] h-[250px] overflow-hidden">
      <div ref={adRef} />
    </div>
  );
}