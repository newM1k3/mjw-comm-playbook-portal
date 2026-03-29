interface ConclusionProps {
  onMarkComplete: () => void;
  isCompleted: boolean;
}

export default function Conclusion({ onMarkComplete, isCompleted }: ConclusionProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#e2e8f0] mb-6">
        Conclusion: The Work Is the Conversation
      </h1>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        At the start of this report, I said that communication isn't a soft skill — it's a profit skill. If you've read this far, you probably see why.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        Every unaddressed performance issue, every un-clarified scope change, every un-had money conversation has a number attached to it. The work of a small business owner is not just the work of delivering a service or making a product. It's the work of having the conversations that protect the value of that work.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        The framework in this report is not a magic wand. It doesn't make hard conversations easy. It makes them manageable. It gives you a repeatable process for showing up to the conversations you've been avoiding with clarity, with a plan, and with the language to navigate them when they don't go the way you expect.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        That's the entire game. Not to be fearless. Not to be perfect. Just to be prepared.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-8">
        Your business is built on the quality of the conversations you're willing to have. The ones you have with your team, your clients, your suppliers — and most importantly, the one you have with yourself before you start.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed text-xl font-semibold mb-12">
        Go have the conversation.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">💡 Final Takeaway</h3>
        <p className="text-[#e2e8f0]">
          The cost of a difficult conversation is paid in the minutes you spend preparing for it. The cost of avoiding it is paid in the months you spend dealing with the consequences.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-[#2d3748]">
        <button
          onClick={onMarkComplete}
          disabled={isCompleted}
          className="w-full sm:w-auto px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isCompleted ? 'Completed ✓' : 'Mark as Complete ✓'}
        </button>
      </div>
    </div>
  );
}
