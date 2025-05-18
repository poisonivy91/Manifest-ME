'use client';

import { useEffect, useState } from 'react';

const starterAffirmations = [
  "You are capable of achieving great things.",
  "You are worthy of love and respect.",
  "You have the power to create positive change.",
  "You are enough just as you are.",
  "You are deserving of happiness and success.",
  "You are strong and resilient.",
  "I am worthy of everything I desire.",
  "My dreams are valid and achievable.",
  "I radiate confidence and purpose.",
  "The universe supports my growth.",
  "I am becoming the best version of myself."
];

export default function AffirmationBox() {
  const [affirmations, setAffirmations] = useState(starterAffirmations);
  const [quote, setQuote] = useState('');
  const [input, setInput] = useState('');
  const [isFading, setIsFading] = useState(false);


  // Load saved affirmations from local storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('affirmations'));
    if (saved && saved.length) {
      setAffirmations(prev => [...prev, ...saved]);
    }
  }, []);

  // pick new affirmation

  useEffect(() => {
    if (affirmations.length) {
      setQuote(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }
  }, [affirmations]);

  // Save affirmations to local storage when they change

  const handleAdd = () => {
    if (!input.trim()) return;

    const updated = [...affirmations, input.trim()];
    localStorage.setItem('affirmations', JSON.stringify(updated.slice(starterAffirmations.length)));

    setAffirmations(updated);
    setInput('');
  };

  const handleNewQuote = () => {
    let newQuote = quote;
    while (newQuote === quote && affirmations.length > 1) {
      newQuote = affirmations[Math.floor(Math.random() * affirmations.length)];
    }
    setQuote(newQuote);
  };


  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-6 max-w-md mx-auto mt-8 transition-all duration-500">

      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        ✨ Daily Affirmation ✨
      </h2>

      <p className={`text-lg text-gray-700 mb-4 text-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'
        }`}>
        {quote}
      </p>

      <button
        onClick={handleNewQuote}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Get New Affirmation
      </button>


      <div className="pt-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write your own..."
          className="w-full text-gray-900 placeholder-gray-500 px-4 py-2 border border-gray-300 rounded-lg mb-2"
        />

        <button
          onClick={handleAdd}
          className="bg-purple-500 text-white px-4 py-2 rounded w-full hover:bg-purple-600 transition duration-200"
        >
          Add Affirmation
        </button>
      </div>
    </div>
  );
}