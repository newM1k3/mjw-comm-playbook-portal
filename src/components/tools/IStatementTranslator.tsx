import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSaveOutput } from '../../hooks/useSaveOutput';
import { generateText } from '../../lib/gemini';

export default function IStatementTranslator() {
  const [youStatement, setYouStatement] = useState('');
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');
  const { saveOutput, saved } = useSaveOutput();

  const handleTranslate = async () => {
    if (!youStatement.trim()) return;

    setLoading(true);
    setError('');
    setTranslation('');

    const systemPrompt = `You are an expert in assertive, non-defensive communication. Your job is to translate accusatory "You-Statements" into productive "I-Statements."

A You-Statement blames the other person and triggers defensiveness (e.g., "You are always late").
An I-Statement describes the impact of the behaviour on you without assigning blame (e.g., "I feel frustrated when meetings start late because it affects the whole team's schedule").

The user will provide one or more You-Statements. For each one, provide the translated I-Statement. Format your response as a simple list, one translation per line.

User's You-Statements: ${youStatement}`;

    try {
      const generatedText = await generateText(systemPrompt);
      setTranslation(generatedText);
      saveOutput('I-Statement Translator', `You-Statement:\n${youStatement}\n\nTranslation:\n${generatedText}`, youStatement.slice(0, 150));
    } catch (err) {
      setError('Failed to translate. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          I-Statement Translator
        </h1>
        <p className="text-[#a0aec0]">
          Turn accusatory "You-Statements" into productive, non-defensive "I-Statements" instantly.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            Enter your You-Statement
          </label>
          <textarea
            value={youStatement}
            onChange={(e) => setYouStatement(e.target.value)}
            placeholder="e.g., You are always late. You never listen. You keep changing the scope."
            rows={4}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleTranslate}
          disabled={!youStatement.trim() || loading}
          className="w-full py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Translating...
            </>
          ) : (
            'Translate to I-Statement'
          )}
        </button>

        {error && (
          <div className="p-4 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {translation && (
          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#00e5ff]">
                Your I-Statement Translation:
              </h2>
              {saved && (
                <p className="text-sm text-[#00e5ff]">Saved</p>
              )}
            </div>
            <div className="text-[#e2e8f0] whitespace-pre-wrap leading-relaxed">
              {translation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
