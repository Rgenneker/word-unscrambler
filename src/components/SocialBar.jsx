import { useEffect } from "react";

export default function SocialBar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://pl29741986.effectivecpmnetwork.com/28/25/96/28259667b9ee71a7c6ca1b8e6b8cdc64.js";
    script.async = true;
    script.setAttribute("data-social-bar", "true");

    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[data-social-bar="true"]'
      );

      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}