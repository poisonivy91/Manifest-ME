import { NextResponse } from 'next/server';

export async function POST(req) {
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
