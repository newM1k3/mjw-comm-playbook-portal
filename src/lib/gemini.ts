/**
 * Gemini API helper — calls Google Gemini directly from the browser.
 * Requires VITE_GEMINI_API_KEY environment variable.
 */

const GEMINI_MODEL = 'gemini-2.0-flash';

export async function generateText(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY environment variable');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No text returned from Gemini API');
  }
  return text;
}
