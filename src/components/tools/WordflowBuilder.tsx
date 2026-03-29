import { useState } from 'react';
import { ChevronLeft, ChevronRight, Printer, Copy, RotateCcw } from 'lucide-react';
import { useSaveOutput } from '../../hooks/useSaveOutput';

const templates = [
  "I'd like to talk about something that's been on my mind. I want to make sure we're on the same page — is now a good time?",
  "I've noticed something recently that I think we should address together. Do you have a few minutes?",
  "I want to have an honest conversation with you about [topic]. I'm not here to criticize — I want us to find a solution together.",
  "There's something I've been meaning to bring up and I think it's important we talk about it. Can we find a few minutes today?"
];

export default function WordflowBuilder() {
  const [step, setStep] = useState(1);
  const [facts, setFacts] = useState('');
  const [idealOutcome, setIdealOutcome] = useState('');
  const [theirReaction, setTheirReaction] = useState('');
  const [walkAwayPosition, setWalkAwayPosition] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [openingLine, setOpeningLine] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const { saveOutput, saved } = useSaveOutput();

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template);
    setOpeningLine(template);
  };

  const handleGenerate = () => {
    setShowOutput(true);
    const outputContent = `YOUR WORDFLOW PREP SHEET\n\nYOUR FACTS (CLARIFY):\n${facts}\n\nYOUR GOAL (CALIBRATE):\nIdeal Outcome: ${idealOutcome}\nWalk-Away Position: ${walkAwayPosition}\n\nTHEIR PERSPECTIVE (CALIBRATE):\n${theirReaction}\n\nYOUR OPENING LINE (OPEN):\n${openingLine}`;
    saveOutput('Wordflow Builder', outputContent, idealOutcome.slice(0, 100));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    const text = `YOUR WORDFLOW PREP SHEET\n\nYOUR FACTS (CLARIFY):\n${facts}\n\nYOUR GOAL (CALIBRATE):\nIdeal Outcome: ${idealOutcome}\nWalk-Away Position: ${walkAwayPosition}\n\nTHEIR PERSPECTIVE (CALIBRATE):\n${theirReaction}\n\nYOUR OPENING LINE (OPEN):\n${openingLine}`;
    await navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleStartOver = () => {
    setStep(1);
    setFacts('');
    setIdealOutcome('');
    setTheirReaction('');
    setWalkAwayPosition('');
    setSelectedTemplate('');
    setOpeningLine('');
    setShowOutput(false);
  };

  if (showOutput) {
    return (
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#e2e8f0] mb-2">
            Your Wordflow
          </h1>
          <p className="text-[#a0aec0]">
            Your personalized conversation script
          </p>
          {saved && (
            <p className="text-sm text-[#00e5ff] mt-2 text-right">Saved</p>
          )}
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <h2 className="text-xl font-bold text-[#00e5ff] mb-4">
              Your Facts (Clarify)
            </h2>
            <p className="text-[#e2e8f0] whitespace-pre-wrap">{facts}</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <h2 className="text-xl font-bold text-[#00e5ff] mb-4">
              Your Goal (Calibrate)
            </h2>
            <div className="space-y-3 text-[#e2e8f0]">
              <div>
                <p className="font-medium text-[#a0aec0] mb-1">Ideal Outcome:</p>
                <p>{idealOutcome}</p>
              </div>
              <div>
                <p className="font-medium text-[#a0aec0] mb-1">Walk-Away Position:</p>
                <p>{walkAwayPosition}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <h2 className="text-xl font-bold text-[#00e5ff] mb-4">
              Their Perspective (Calibrate)
            </h2>
            <p className="text-[#e2e8f0] whitespace-pre-wrap">{theirReaction}</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg border border-[#2d3748]">
            <h2 className="text-xl font-bold text-[#00e5ff] mb-4">
              Your Opening Line (Open)
            </h2>
            <blockquote className="border-l-4 border-[#00e5ff] pl-4 py-2 bg-[#1a202c] rounded-r">
              <p className="text-[#e2e8f0] italic">{openingLine}</p>
            </blockquote>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#2d3748] text-[#e2e8f0] font-medium rounded-lg hover:bg-[#374151] transition-colors"
          >
            <Printer size={18} />
            Print
          </button>
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#2d3748] text-[#e2e8f0] font-medium rounded-lg hover:bg-[#374151] transition-colors"
          >
            <Copy size={18} />
            Copy to Clipboard
          </button>
          <button
            onClick={handleStartOver}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors"
          >
            <RotateCcw size={18} />
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          Wordflow Builder
        </h1>
        <p className="text-[#a0aec0]">
          Build your own personalized conversation script in your own words, step by step.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8 gap-1 sm:gap-2 flex-wrap">
        <div className={`flex items-center ${step >= 1 ? 'text-[#00e5ff]' : 'text-[#a0aec0]'}`}>
          <span className="font-semibold text-sm sm:text-base">Step 1: Clarify</span>
        </div>
        <ChevronRight size={16} className="text-[#a0aec0] flex-shrink-0" />
        <div className={`flex items-center ${step >= 2 ? 'text-[#00e5ff]' : 'text-[#a0aec0]'}`}>
          <span className="font-semibold text-sm sm:text-base">Step 2: Calibrate</span>
        </div>
        <ChevronRight size={16} className="text-[#a0aec0] flex-shrink-0" />
        <div className={`flex items-center ${step >= 3 ? 'text-[#00e5ff]' : 'text-[#a0aec0]'}`}>
          <span className="font-semibold text-sm sm:text-base">Step 3: Open</span>
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#e2e8f0] mb-4">
              Step 1: Clarify — The Facts
            </h2>
            <p className="text-[#a0aec0] mb-4">
              Write down the observable facts of the situation. Stick to what you can see, hear, or measure.
              No interpretations, no emotions — just facts.
            </p>
          </div>

          <div>
            <label className="block text-[#e2e8f0] font-medium mb-2">
              What are the facts? (list them one per line)
            </label>
            <textarea
              value={facts}
              onChange={(e) => setFacts(e.target.value)}
              placeholder="e.g., Jake has arrived late 8 times in the past month. The shift starts at 9am. He has not notified me in advance on any occasion."
              rows={6}
              className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
            />
          </div>

          <div>
            <label className="block text-[#e2e8f0] font-medium mb-2">
              What is the single ideal outcome of this conversation?
            </label>
            <input
              type="text"
              value={idealOutcome}
              onChange={(e) => setIdealOutcome(e.target.value)}
              placeholder="e.g., Jake commits to arriving on time and we agree on a clear consequence if it continues."
              className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!facts || !idealOutcome}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#e2e8f0] mb-4">
              Step 2: Calibrate — The Goal
            </h2>
            <p className="text-[#a0aec0] mb-4">
              Now think about the other person. What might they be feeling or thinking?
              What is your walk-away position if the conversation doesn't go well?
            </p>
          </div>

          <div>
            <label className="block text-[#e2e8f0] font-medium mb-2">
              How do you think the other person will react? What might they say in their defence?
            </label>
            <textarea
              value={theirReaction}
              onChange={(e) => setTheirReaction(e.target.value)}
              placeholder="e.g., He might get defensive and blame his commute. He may not realise how serious this is."
              rows={4}
              className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
            />
          </div>

          <div>
            <label className="block text-[#e2e8f0] font-medium mb-2">
              What is your walk-away position? (What will you do if nothing changes?)
            </label>
            <input
              type="text"
              value={walkAwayPosition}
              onChange={(e) => setWalkAwayPosition(e.target.value)}
              placeholder="e.g., If punctuality doesn't improve within two weeks, I will issue a formal written warning."
              className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#2d3748] text-[#e2e8f0] font-medium rounded-lg hover:bg-[#374151] transition-colors"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!theirReaction || !walkAwayPosition}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#e2e8f0] mb-4">
              Step 3: Open — Your Opening Line
            </h2>
            <p className="text-[#a0aec0] mb-4">
              Choose a template below as your starting point, then edit it in the box to make it sound like you.
            </p>
          </div>

          <div className="space-y-3">
            {templates.map((template, index) => (
              <label
                key={index}
                className="flex items-start gap-3 p-4 bg-[#111827] border border-[#2d3748] rounded-lg cursor-pointer hover:border-[#00e5ff] transition-colors"
              >
                <input
                  type="radio"
                  name="template"
                  checked={selectedTemplate === template}
                  onChange={() => handleTemplateSelect(template)}
                  className="mt-1 accent-[#00e5ff]"
                />
                <span className="text-[#e2e8f0] flex-1">{template}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-[#e2e8f0] font-medium mb-2">
              Your Final Opening Line (edit to make it yours):
            </label>
            <textarea
              value={openingLine}
              onChange={(e) => setOpeningLine(e.target.value)}
              placeholder="Select a template above or write your own opening line here."
              rows={4}
              className="w-full px-4 py-3 bg-[#111827] border border-[#2d3748] text-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
            <button
              onClick={() => setStep(2)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#2d3748] text-[#e2e8f0] font-medium rounded-lg hover:bg-[#374151] transition-colors"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              onClick={handleGenerate}
              disabled={!openingLine}
              className="w-full sm:w-auto px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate My Wordflow
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
