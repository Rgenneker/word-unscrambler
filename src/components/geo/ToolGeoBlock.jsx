import { toolFaqs } from "../../data/toolFaqs";
import { toolSeoContent } from "../../data/toolSeoContent";
import FAQSection from "./FAQSection";
import HowToUseSection from "./HowToUseSection";
import VocabularyGuidance from "./VocabularyGuidance";
import InternalLinks from "./InternalLinks";
import StructuredData from "./StructuredData";

const pageData = {
    "five-letter-words": {
  title: "5 Letter Words",
  url: "https://wordshuffl.com/5-letter-words",
  description:
    "Discover 5 letter words for Wordle, Scrabble, crosswords, spelling practice and vocabulary building.",
},
  "words-starting-with": {
    title: "Words Starting With",
    url: "https://wordshuffl.com/words-starting-with",
    description:
      "Find English words that start with a chosen letter for Wordle, Scrabble, crosswords and vocabulary building.",
  },
  "words-ending-with": {
    title: "Words Ending With",
    url: "https://wordshuffl.com/words-ending-with",
    description:
      "Find English words that end with a chosen letter for word games, spelling practice and vocabulary development.",
  },
  "words-ending-with-ing": {
    title: "Words Ending With ING",
    url: "https://wordshuffl.com/words-ending-with-ing",
    description:
      "Discover English words ending with ING for grammar learning, vocabulary building, Wordle and Scrabble.",
  },
  "words-starting-with-a": {
    title: "Words Starting With A",
    url: "https://wordshuffl.com/words-starting-with-a",
    description:
      "Explore English words starting with A for vocabulary learning, spelling practice and word games.",
  },
  "word-length": {
    title: "Words by Length",
    url: "https://wordshuffl.com/word-length",
    description:
      "Find English words by length for Scrabble, Wordle, crosswords and vocabulary practice.",
  },
  "letter-combinations": {
    title: "Letter Combinations",
    url: "https://wordshuffl.com/letter-combinations",
    description:
      "Find words using starting letters, ending letters and letter combinations for advanced word game strategy.",
  },
  "longest-english-words": {
  title: "Longest English Words",
  url: "https://wordshuffl.com/longest-english-words",
  description:
    "Explore the longest words in the English language and learn their meanings, origins and usage.",
},

"common-7-letter-words": {
  title: "Common 7 Letter Words",
  url: "https://wordshuffl.com/common-7-letter-words",
  description:
    "Browse common seven letter words used in Scrabble, Wordle, crosswords and vocabulary learning.",
},

"difficult-wordle-answers": {
  title: "Difficult Wordle Answers",
  url: "https://wordshuffl.com/difficult-wordle-answers",
  description:
    "Review challenging Wordle answers and improve your puzzle-solving strategy.",
},
};

function buildFaqs(title) {
  return [
    {
      question: `What is the ${title} tool?`,
      answer: `The ${title} tool helps users discover English words based on a specific word pattern. It is useful for Scrabble, Wordle, crossword solving, spelling practice and vocabulary development.`,
    },
    {
      question: `How do I use the ${title} tool?`,
      answer:
        "Enter the required letter or pattern, review the generated words, and refresh the results if you want a different set of examples.",
    },
    {
      question: "Can this tool help with Scrabble?",
      answer:
        "Yes. It can help Scrabble players discover useful words, recognise patterns and improve tile placement strategy.",
    },
    {
      question: "Can this tool help with Wordle?",
      answer:
        "Yes. Wordle players can use word pattern tools to test possible answers and improve guessing strategy.",
    },
    {
      question: "Can this tool improve vocabulary?",
      answer:
        "Yes. Regular exposure to new words helps improve spelling, reading comprehension and word recognition.",
    },
    {
      question: "Can this tool help with crosswords?",
      answer:
        "Yes. Crossword solvers often need words that match specific patterns, starts, endings or lengths.",
    },
    {
      question: "Are the words real English words?",
      answer:
        "WordShuffl uses English word lists and filtering logic to produce valid word suggestions.",
    },
    {
      question: "Can students use this tool?",
      answer:
        "Yes. Students can use it for spelling practice, vocabulary building and language learning.",
    },
    {
      question: "Can teachers use this tool?",
      answer:
        "Yes. Teachers can use it for classroom activities, word games, vocabulary lessons and spelling exercises.",
    },
    {
      question: "Why are word patterns important?",
      answer:
        "Word patterns help users understand prefixes, suffixes, roots, spelling structures and common English formations.",
    },
    {
      question: "What are prefixes?",
      answer:
        "Prefixes are groups of letters added to the beginning of words to change or shape meaning.",
    },
    {
      question: "What are suffixes?",
      answer:
        "Suffixes are groups of letters added to the end of words to create new forms or meanings.",
    },
    {
      question: "What is an anagram?",
      answer:
        "An anagram is a word formed by rearranging the letters of another word or group of letters.",
    },
    {
      question: "Why is English word structure important?",
      answer:
        "Understanding English word structure improves spelling, reading fluency, writing skills and word game performance.",
    },
    {
      question: "Can I refresh the word results?",
      answer:
        "Yes. Pages with refresh functionality allow users to generate a new set of word suggestions.",
    },
    {
      question: "Does word length matter in games?",
      answer:
        "Yes. Different word lengths are useful in Scrabble, Wordle, crosswords and other word games.",
    },
    {
      question: "Why are vowels important?",
      answer:
        "Vowels help form most English words and are important when identifying possible word patterns.",
    },
    {
      question: "Why are consonants important?",
      answer:
        "Consonants shape word sounds, spelling patterns and scoring opportunities in many word games.",
    },
    {
      question: "Can this help with spelling bees?",
      answer:
        "Yes. Pattern recognition and repeated word exposure can support spelling bee preparation.",
    },
    {
      question: "How often should I practise vocabulary?",
      answer:
        "Short daily practice is often more effective than occasional long study sessions.",
    },
    {
      question: "Can this tool help language learners?",
      answer:
        "Yes. English learners can use WordShuffl to discover patterns and learn new words.",
    },
    {
      question: "Is this tool mobile friendly?",
      answer:
        "Yes. WordShuffl is designed to work on phones, tablets, laptops and desktop computers.",
    },
    {
      question: "Can I use this for writing?",
      answer:
        "Yes. Writers can use word discovery tools to find alternatives and expand vocabulary.",
    },
    {
      question: "Can this tool help with reading?",
      answer:
        "Yes. Improving vocabulary supports better reading comprehension and fluency.",
    },
    {
      question: "Are uncommon words included?",
      answer:
        "Some results may include uncommon words, which can be useful for advanced word games and vocabulary growth.",
    },
    {
      question: "What makes WordShuffl useful?",
      answer:
        "WordShuffl combines fast word discovery, clean design, pattern filtering and educational guidance.",
    },
    {
      question: "Should I memorise every word?",
      answer:
        "No. Focus on understanding useful patterns and learning words gradually.",
    },
    {
      question: "Can this tool help with difficult puzzles?",
      answer:
        "Yes. Pattern-based word tools are useful when solving difficult word puzzles.",
    },
    {
      question: "Does WordShuffl replace a dictionary?",
      answer:
        "No. WordShuffl is a discovery tool and should be used alongside dictionaries for definitions and usage.",
    },
    {
      question: "Who is WordShuffl for?",
      answer:
        "WordShuffl is for word game players, students, teachers, writers, crossword solvers and vocabulary learners.",
    },
  ];
}

export default function ToolGeoBlock({ page }) {
  
  const content = toolSeoContent[page];
  const data = pageData[page];
  if (!data) return null;

  const faqs = toolFaqs[page] || buildFaqs(data.title);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.title,
    description: data.description,
    url: data.url,
    isPartOf: {
      "@type": "WebSite",
      name: "WordShuffl",
      url: "https://wordshuffl.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://wordshuffl.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.title,
        item: data.url,
      },
    ],
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={breadcrumbSchema} />

      <section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
        <h2 className="text-3xl font-black text-cyan-300">
          About {data.title}
        </h2>

        <p className="mt-6 whitespace-pre-line leading-8 text-slate-300">
  {content?.intro || data.description}
</p>
      </section>

      <HowToUseSection title={`How To Use The ${data.title} Tool`}>
        <p className="whitespace-pre-line">
  {content?.howToUse}
</p>
             </HowToUseSection>

      <VocabularyGuidance>
        <p className="whitespace-pre-line">
  {content?.vocabularyGuidance}
</p>

            </VocabularyGuidance>

            {content?.extendedGuide && (
  <section className="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
    <h2 className="text-3xl font-black text-cyan-300">
      Complete Guide to {data.title}
    </h2>

    <div className="mt-6 whitespace-pre-line leading-8 text-slate-300">
      {content.extendedGuide}
    </div>
  </section>
)}

<FAQSection faqs={faqs} />

      
      <InternalLinks />
    </>
  );
}