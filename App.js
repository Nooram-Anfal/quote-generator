import { useEffect, useState } from "react";
import quotes from "./quotes.json";
import "./index.css";

const pastelThemes = {
  Blossom: {
    bg: "from-pink-100 via-pink-200 to-pink-300",
    text: "text-pink-900",
    btn: "bg-pink-200 hover:bg-pink-300 text-pink-900",
  },
  Mint: {
    bg: "from-green-100 via-green-200 to-green-300",
    text: "text-green-900",
    btn: "bg-green-200 hover:bg-green-300 text-green-900",
  },
  Sky: {
    bg: "from-blue-100 via-blue-200 to-blue-300",
    text: "text-blue-900",
    btn: "bg-blue-200 hover:bg-blue-300 text-blue-900",
  },
  Lavender: {
    bg: "from-purple-100 via-purple-200 to-purple-300",
    text: "text-purple-900",
    btn: "bg-purple-200 hover:bg-purple-300 text-purple-900",
  },
  Peach: {
    bg: "from-orange-100 via-orange-200 to-orange-300",
    text: "text-orange-900",
    btn: "bg-orange-200 hover:bg-orange-300 text-orange-900",
  },
  Lemon: {
    bg: "from-yellow-100 via-yellow-200 to-yellow-300",
    text: "text-yellow-900",
    btn: "bg-yellow-200 hover:bg-yellow-300 text-yellow-900",
  },
  Aqua: {
    bg: "from-teal-100 via-teal-200 to-teal-300",
    text: "text-teal-900",
    btn: "bg-teal-200 hover:bg-teal-300 text-teal-900",
  },
  Lilac: {
    bg: "from-indigo-100 via-indigo-200 to-indigo-300",
    text: "text-indigo-900",
    btn: "bg-indigo-200 hover:bg-indigo-300 text-indigo-900",
  },
  Autumn: {
    bg: "from-amber-100 via-rose-200 to-orange-300",
    text: "text-amber-900",
    btn: "bg-amber-200 hover:bg-amber-300 text-amber-900",
  },
  Spooky: {
    bg: "from-gray-900 via-black to-gray-800",
    text: "text-white",
    btn: "bg-gray-800 hover:bg-gray-700 text-white",
  },
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTheme, setSelectedTheme] = useState("Blossom");
  const [quote, setQuote] = useState(getRandomQuote("All", null));
  const [prevQuoteId, setPrevQuoteId] = useState(null);
  const [fade, setFade] = useState(false);

  function getRandomQuote(category, lastId) {
    const filtered = category === "All" ? quotes : quotes.filter((q) => q.category === category);
    let newQuote;
    do {
      newQuote = filtered[Math.floor(Math.random() * filtered.length)];
    } while (filtered.length > 1 && newQuote.id === lastId);
    return newQuote;
  }

  function handleNewQuote() {
    setFade(true);
    setTimeout(() => {
      const newQuote = getRandomQuote(selectedCategory, quote.id);
      setQuote(newQuote);
      setPrevQuoteId(quote.id);
      setFade(false);
    }, 300);
  }

  function handleCategoryChange(e) {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setQuote(getRandomQuote(newCategory, null));
  }

  function handleThemeChange(e) {
    setSelectedTheme(e.target.value);
  }

  function handleSpeakQuote() {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(`${quote.quote} by ${quote.author}`);
    synth.speak(utter);
  }

  function handleCopyQuote() {
    navigator.clipboard.writeText(`"${quote.quote}" — ${quote.author}`);
    alert("Quote copied to clipboard!");
  }

  const categories = ["All", ...new Set(quotes.map((q) => q.category))];
  const theme = pastelThemes[selectedTheme];

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${theme.bg} px-6 py-10 transition-all duration-500`}
    >
      <div
        className={`bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl p-10 w-full max-w-3xl ${theme.text} shadow-2xl text-center space-y-6 glow`}
      >
        <h1 className="text-4xl font-extrabold mb-2">Quote of the Day</h1>

        <p
          className={`text-2xl italic font-light leading-snug transition-opacity duration-500 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          “{quote.quote}”
        </p>
        <p className="text-lg font-medium tracking-wide">— {quote.author}</p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="rounded-lg px-4 py-2 bg-white/80 font-semibold shadow-md focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={selectedTheme}
            onChange={handleThemeChange}
            className="rounded-lg px-4 py-2 bg-white/80 font-semibold shadow-md focus:outline-none"
          >
            {Object.keys(pastelThemes).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <button
            onClick={handleNewQuote}
            className={`${theme.btn} font-semibold px-6 py-2 rounded-md shadow-lg transition duration-300`}
          >
            Inspire Me 
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button
            onClick={handleSpeakQuote}
            className={`${theme.btn} font-semibold px-4 py-2 rounded-full shadow`}
          >
            🔊 Read Quote
          </button>

          <button
            onClick={handleCopyQuote}
            className={`${theme.btn} font-semibold px-4 py-2 rounded-full shadow`}
          >
             Copy
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote.quote}" — ${quote.author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${theme.btn} font-semibold px-4 py-2 rounded-full shadow`}
          >
             Tweet
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
