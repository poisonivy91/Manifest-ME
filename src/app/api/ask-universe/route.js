import { NextResponse } from 'next/server';

// Simple in-memory quota tracker (resets on server restart)
let requestCount = 0;
const DAILY_LIMIT = 100;
let lastReset = Date.now();

function resetQuotaIfNeeded() {
  const now = Date.now();
  // Reset every 24 hours
  if (now - lastReset > 24 * 60 * 60 * 1000) {
    requestCount = 0;
    lastReset = now;
  }
}

export async function POST(req) {
  resetQuotaIfNeeded();

  if (requestCount >= DAILY_LIMIT) {
    return NextResponse.json({
      error: 'Daily Gemini API quota reached. Please try again tomorrow to avoid extra charges.',
    }, { status: 429 });
  }

  requestCount++;

  const body = await req.json();
  const entry = body.entry;

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a short, uplifting affirmation in response to: "${entry}". The affirmation should be calming, supportive, and under 30 words.`
                }
              ]
            }
          ]
        })
      }
    );

    const result = await geminiRes.json();
    console.log("Gemini raw result:", JSON.stringify(result, null, 2));

    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({ output: text || '🌌 No wisdom from the stars today.' });
  } catch (err) {
    console.error('Gemini API Error:', err);
    return NextResponse.json({ error: 'Gemini API request failed.' }, { status: 500 });
  }
}
