import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSaveOutput } from '../../hooks/useSaveOutput';

export default function CCOBlueprint() {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState('');
  const [error, setError] = useState('');
  const { saveOutput, saved } = useSaveOutput();

  const handleGenerate = async () => {
    if (!situation.trim()) return;

    setLoading(true);
    setError('');
    setBlueprint('');

    const systemPrompt = `You are an expert business communication coach specialising in helping small business owners have difficult but necessary conversations. Your framework is called CCO: Clarify, Calibrate, Open.

The user will describe a situation they are facing. Your job is to produce a complete, personalised CCO preparation plan for them. Structure your response with three clearly labelled sections:

**C — CLARIFY: The Facts**
List 3-5 specific, observable facts the user should anchor their conversation in. These must be unchallengeable observations, not interpretations.

**C — CALIBRATE: The Goal & The Other Person**
State the single ideal outcome of the conversation. Then describe how the other person is likely to feel or react, and suggest one empathy statement the user can use to acknowledge that reaction without backing down.

**C — OPEN: The Opening Line**
Write a specific, ready-to-use opening line the user can say or adapt. It should be neutral, non-accusatory, and invite dialogue rather than triggering defensiveness.

End with one sentence of encouragement.

User's situation: ${situation}`;

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          prompt: systemPrompt
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate blueprint');
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
      setBlueprint(generatedText);
      saveOutput('CCO Blueprint Generator', generatedText, situation.slice(0, 150));
    } catch (err) {
      setError('Failed to generate blueprint. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          CCO Blueprint Generator
        </h1>
        <p className="text-[#a0aec0]">
          Describe your situation and get a complete, personalized CCO preparation plan powered by AI.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            Describe your situation
          </label>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="e.g., I need to address a performance issue with an employee who has been missing deadlines for the past month..."
            rows={6}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!situation.trim() || loading}
          className="w-full py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating your blueprint...
            </>
          ) : (
            'Generate My Blueprint'
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {blueprint && (
          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            {saved && (
              <p className="text-sm text-[#00e5ff] text-right mb-2">Saved</p>
            )}
            <div className="prose prose-invert max-w-none">
              <div className="text-[#e2e8f0] whitespace-pre-wrap leading-relaxed">
                {blueprint.split('\n').map((line, index) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-xl font-bold text-[#00e5ff] mt-6 mb-3">
                        {line.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  return line ? <p key={index} className="mb-2">{line}</p> : <br key={index} />;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
