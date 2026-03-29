import { useState } from 'react';
import { useSaveOutput } from '../../hooks/useSaveOutput';

export default function CCOPrepSheet() {
  const [who, setWho] = useState('');
  const [issue, setIssue] = useState('');
  const [duration, setDuration] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const { saveOutput, saved } = useSaveOutput();

  const getIssueSummary = () => {
    const words = issue.trim().split(/\s+/);
    const summary = words.slice(0, 8).join(' ');
    return summary + (words.length > 8 ? '...' : '');
  };

  const handleGenerate = () => {
    if (who && issue && duration) {
      setShowOutput(true);
      const outputContent = `CCO Prep Sheet — Conversation with: ${who}\nDuration: ${duration}\n\nC — Clarify: The Facts\nWrite down 3 observable, unchallengeable facts about the situation.\n\nC — Calibrate: The Goal\nWhat is the relationship goal with ${who}?\n\nO — Open: The Opening Line\n"I'd like to talk about ${issue.trim().split(/\s+/).slice(0, 8).join(' ')}${issue.trim().split(/\s+/).length > 8 ? '...' : ''} when you have a moment. I want to make sure we're on the same page. Is now a good time?"`;
      saveOutput('CCO Prep Sheet Generator', outputContent, `Conversation with ${who}: ${issue.trim().split(/\s+/).slice(0, 8).join(' ')}`);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          CCO Prep Sheet Generator
        </h1>
        <p className="text-[#a0aec0]">
          Answer three quick questions to get a personalized prep sheet based on the Clarify-Calibrate-Open framework.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            Who is this conversation with?
          </label>
          <input
            type="text"
            value={who}
            onChange={(e) => setWho(e.target.value)}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            What is the core issue?
          </label>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe the situation in a few sentences. What has been happening?"
            rows={4}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[#e2e8f0] font-medium mb-2">
            How long has this been a problem?
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
          >
            <option value="">Select duration...</option>
            <option value="A few days">A few days</option>
            <option value="A week">A week</option>
            <option value="A month">A month</option>
            <option value="A few months">A few months</option>
            <option value="A year or more">A year or more</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!who || !issue || !duration}
          className="w-full py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate My Prep Sheet
        </button>
      </div>

      {showOutput && (
        <div className="space-y-6 border-t border-[#2d3748] pt-8">
          {saved && (
            <p className="text-sm text-[#00e5ff] text-right">Saved</p>
          )}

          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <h2 className="text-xl font-bold text-[#00e5ff] mb-4">
              C — Clarify: The Facts
            </h2>
            <p className="text-[#e2e8f0] mb-4">
              Before you speak, write down three observable, unchallengeable facts about the situation.
              What can you state without interpretation or emotion?
            </p>
            <div className="space-y-2 text-[#a0aec0]">
              <p>Fact 1: ___</p>
              <p>Fact 2: ___</p>
              <p>Fact 3: ___</p>
            </div>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <h2 className="text-xl font-bold text-[#00e5ff] mb-4">
              C — Calibrate: The Goal
            </h2>
            <p className="text-[#e2e8f0] mb-4">
              What is the single, ideal outcome of this conversation? What do you want to be different after you talk?
            </p>
            <p className="text-[#e2e8f0] font-medium">
              What is the relationship goal with {who}?
            </p>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <h2 className="text-xl font-bold text-[#00e5ff] mb-4">
              O — Open: The Opening Line
            </h2>
            <p className="text-[#e2e8f0] mb-4">
              Here is a structured, neutral opening line you can adapt:
            </p>
            <blockquote className="border-l-4 border-[#00e5ff] pl-4 py-2 bg-[#1a202c] rounded-r">
              <p className="text-[#e2e8f0] italic">
                "I'd like to talk about {getIssueSummary()} when you have a moment.
                I want to make sure we're on the same page. Is now a good time?"
              </p>
            </blockquote>
            <p className="text-[#a0aec0] text-sm mt-4">
              <strong>Tip:</strong> Adapt this into your own words before you use it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
