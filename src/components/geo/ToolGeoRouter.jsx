import { useLocation } from "react-router-dom";
import ToolGeoBlock from "./ToolGeoBlock";
import PartnerLinks from "../PartnerLinks";

const routeMap = {
  "/5-letter-words": "5-letter-words",
  "/words-starting-with": "words-starting-with",
  "/words-ending-with": "words-ending-with",
  "/words-ending-with-ing": "words-ending-with-ing",
  "/words-starting-with-a": "words-starting-with-a",
  "/word-length": "word-length",
  "/letter-combinations": "letter-combinations",
  "/longest-english-words": "longest-english-words",
"/common-7-letter-words": "common-7-letter-words",
"/difficult-wordle-answers": "difficult-wordle-answers",
};

export default function ToolGeoRouter() {
  const location = useLocation();
  const page = routeMap[location.pathname];

  if (!page) return null;

  return (
    <div className="bg-slate-950 px-6 py-0 text-white">
      <div className="mx-auto max-w-7xl">
        <PartnerLinks />
        <ToolGeoBlock page={page} />
      </div>
    </div>
  );
}