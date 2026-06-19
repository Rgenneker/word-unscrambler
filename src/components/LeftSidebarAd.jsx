import { useEffect, useRef } from "react";

export default function LeftSidebarAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML = `
      atOptions = {
        'key' : 'e5939d4d819acd28bbb6d673a68887d4',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;

    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src =
      "https://www.highperformanceformat.com/e5939d4d819acd28bbb6d673a68887d4/invoke.js";

    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(invokeScript);

    return () => {
      if (adRef.current) adRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={adRef}
      className="w-[160px] min-h-[600px]"
    />
  );
}