import { useState } from 'react';
import { useSaveOutput } from '../../hooks/useSaveOutput';

export default function DebriefTool() {
  const [formData, setFormData] = useState({
    whatHappened: '',
    whatWorked: '',
    whatDifferently: ''
  });
  const [coachingNote, setCoachingNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { saveOutput, saved } = useSaveOutput();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCoachingNote('');

    if (!formData.whatHappened.trim() || !formData.whatWorked.trim() || !formData.whatDifferently.trim()) {
      setError('Please answer all three questions before generating your coaching note.');
      return;
    }

    setIsLoading(true);

    try {
      const prompt = `You are a communication coach for small business owners. A user has just had a difficult conversation and has completed a debrief. Based on their answers, write a short, practical, encouraging coaching note (3–4 paragraphs).

The coaching note should:
1. Acknowledge what they did well (based on their "What worked" answer).
2. Offer one specific, actionable suggestion for what they could do differently next time (based on their "What would you change" answer).
3. End with a brief, motivating closing line that reinforces that having hard conversations is a skill that improves with practice.

Do not use bullet points. Write in flowing paragraphs. Keep the tone warm, direct, and professional — like a trusted advisor, not a cheerleader.

Here is their debrief:

WHAT HAPPENED: ${formData.whatHappened}

WHAT WORKED: ${formData.whatWorked}

WHAT WOULD THEY CHANGE: ${formData.whatDifferently}`;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate coaching note');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setCoachingNote(generatedText);
      saveOutput('Post-Conversation Debrief Tool', `DEBRIEF\n\nWhat happened:\n${formData.whatHappened}\n\nWhat worked:\n${formData.whatWorked}\n\nWhat to do differently:\n${formData.whatDifferently}\n\nCoaching Note:\n${generatedText}`, formData.whatHappened.slice(0, 150));
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error generating coaching note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCoachingNote = () => {
    const paragraphs = coachingNote.split('\n\n').filter(p => p.trim());
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="text-[#e2e8f0] leading-relaxed mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#e2e8f0] mb-3">
        Post-Conversation Debrief
      </h1>
      <p className="text-[#a0aec0] mb-8">
        Had a hard conversation? Answer three questions and get a personalised coaching note.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            What happened in the conversation?
          </label>
          <textarea
            value={formData.whatHappened}
            onChange={(e) => setFormData({ ...formData, whatHappened: e.target.value })}
            placeholder="Give a brief summary. How did it open? How did the other person respond? What was the outcome?"
            rows={4}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] rounded-lg text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff] placeholder-[#4a5568] resize-none"
          />
        </div>

        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            What worked well?
          </label>
          <textarea
            value={formData.whatWorked}
            onChange={(e) => setFormData({ ...formData, whatWorked: e.target.value })}
            placeholder="What did you do or say that landed well? What felt right?"
            rows={4}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] rounded-lg text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff] placeholder-[#4a5568] resize-none"
          />
        </div>

        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            What would you do differently?
          </label>
          <textarea
            value={formData.whatDifferently}
            onChange={(e) => setFormData({ ...formData, whatDifferently: e.target.value })}
            placeholder="One thing you'd adjust — in your preparation, your opening, or how you handled a moment."
            rows={4}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] rounded-lg text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff] placeholder-[#4a5568] resize-none"
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-4 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Get My Coaching Note'}
        </button>
      </form>

      {coachingNote && (
        <div className="mt-8 bg-[#111827] border border-[#00e5ff] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#00e5ff] font-bold text-xl">
              Your Coaching Note
            </h2>
            {saved && (
              <p className="text-sm text-[#00e5ff]">Saved</p>
            )}
          </div>
          {renderCoachingNote()}
        </div>
      )}
    </div>
  );
}
