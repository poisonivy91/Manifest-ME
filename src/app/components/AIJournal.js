'use client';

import { useState } from 'react';

export default function AIJournal() {
  const [entry, setEntry] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskUniverse = async () => {
    if (!entry.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ask-universe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entry }),
      });

      const data = await res.json();
      setResponse(data.output || "🌌 The universe is quiet. Try again.");
    } catch (err) {
      console.error("Error talking to Gemini route:", err);
      setResponse("⚠️ Couldn't reach the universe. Please try again later.");
    }

    setLoading(false);
    setEntry('');
  };

  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl shadow-xl p-6 mt-8 max-w-lg mx-auto space-y-4">
      <h3 className="text-xl font-semibold text-purple-900 text-center drop-shadow">🪄 Ask the Universe</h3>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="What are you feeling right now?"
        className="w-full h-28 p-4 rounded-lg border border-gray-300 text-gray-800"
      />

      <button
        onClick={handleAskUniverse}
        disabled={loading}
        className={`w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Asking the Universe...' : 'Ask the Universe'}
      </button>

      {response && (
        <div className="p-4 mt-4 text-center rounded-lg bg-white/60 text-indigo-800 font-medium shadow">
          {response}
        </div>
      )}
    </div>
  );
}
