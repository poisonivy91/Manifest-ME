import { NextResponse } from 'next/server';

// Simple in-memory quota tracker (resets on server restart)
let requestCount = 0;
const DAILY_LIMIT = 25;
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

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing GEMINI_API_KEY environment variable.' },
      { status: 500 }
    );
  }

  requestCount++;

  try {
    const body = await req.json();
    const entry = body.entry;

    if (!entry || !entry.trim()) {
      return NextResponse.json(
        { error: 'Entry is required.' },
        { status: 400 }
      );
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
                  text: `Write one calming, supportive affirmation in response to: "${entry}". Return one complete sentence between 12 and 22 words.`
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 120,
            temperature: 0.8,
            thinkingConfig: {
              thinkingBudget: 0
            }
          }
        })
      }
    );

    const rawText = await geminiRes.text();

    if (!geminiRes.ok) {
      let details = rawText;

      try {
        const upstream = JSON.parse(rawText);
        details = upstream?.error?.message || rawText;
      } catch {
        // Keep raw text when upstream payload is not JSON.
      }

      return NextResponse.json(
        { error: `Gemini API error: ${geminiRes.status}`, details },
        { status: geminiRes.status }
      );
    }

    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: 'Gemini returned invalid JSON.', details: rawText },
        { status: 500 }
      );
    }

    const text =
      result?.candidates?.[0]?.content?.parts
        ?.map(part => (typeof part?.text === 'string' ? part.text : ''))
        ?.filter(Boolean)
        ?.join(' ')
        ?.trim() || '';

    if (!text) {
      return NextResponse.json(
        { error: 'Gemini returned no text.', raw: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ output: text });
  } catch (err) {
    console.error('Gemini API Error:', err);
    return NextResponse.json({ error: 'Gemini API request failed.' }, { status: 500 });
  }
}
