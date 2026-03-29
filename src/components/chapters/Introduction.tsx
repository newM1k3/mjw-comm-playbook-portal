interface IntroductionProps {
  onNextChapter: () => void;
}

export default function Introduction({ onNextChapter }: IntroductionProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#e2e8f0] mb-6">
        Introduction: The Conversation You Keep Putting Off
      </h1>

      <p className="text-base sm:text-xl text-[#a0aec0] italic mb-8">
        It's costing more than you think
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        You already know what it is.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        There's a conversation you've been meaning to have — with an employee who keeps cutting corners, a client who keeps expanding the scope without expanding the budget, a supplier whose terms stopped making sense six months ago. You've thought about it. You've rehearsed versions of it in your head. You've told yourself you'll get to it when the timing is better.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-8">
        The timing is not going to get better. And the longer you wait, the more expensive the silence becomes.
      </p>

      <div className="bg-[#111827] border-l-4 border-[#00e5ff] p-6 my-8 rounded-r">
        <p className="text-[#e2e8f0] text-lg font-medium">
          Communication isn't a soft skill. It's a profit skill. Every avoided conversation has a price.
        </p>
      </div>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        This report is about the conversations that small business owners consistently avoid — and what those conversations cost when they're left unspoken. It's also, more practically, a guide to having them: how to prepare, how to open, what to say when things go sideways, and how to build the kind of day-to-day communication that makes hard conversations less necessary over time.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-8">
        The framework in this report is not about turning you into a confrontational person. It's about giving you enough structure and language that the conversations you've been dreading become manageable — and eventually, just part of how you run your business.
      </p>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-4">
        Who This Is For
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        This report is written for small business owners and managers running teams of one to fifteen people — the contractors, service businesses, operators, and freelancers who are responsible for both the work and the people doing it.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        At this scale, communication problems hit differently than they do in large organisations. There's no HR department to escalate to. No management layer to absorb the friction. When something goes unsaid, it lands directly on you. And when a conversation goes badly, the fallout is personal in a way that corporate environments rarely are.
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-8">
        If you've ever found yourself awake at 2am running through a conversation you haven't had yet, this report is for you.
      </p>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-4">
        How to Use This Report
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        You can read it front to back for the full picture, or skip straight to the chapter that's most relevant to whatever you're dealing with right now. Either approach works.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#2d3748]">
              <th className="text-left py-3 px-4 text-[#00e5ff] font-semibold">Chapter</th>
              <th className="text-left py-3 px-4 text-[#00e5ff] font-semibold">What It Covers</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Chapter 1</td>
              <td className="py-3 px-4 text-[#e2e8f0]">Why small business owners avoid hard conversations — and what that avoidance actually costs</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Chapter 2</td>
              <td className="py-3 px-4 text-[#e2e8f0]">The Clarify-Calibrate-Open framework: 15 minutes of preparation that changes every conversation</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Chapter 3</td>
              <td className="py-3 px-4 text-[#e2e8f0]">The Six Conversations: performance, boundaries, money, conflict, letting go, and asking</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Chapter 4</td>
              <td className="py-3 px-4 text-[#e2e8f0]">Getting your team to actually listen — the daily habits that build real communication authority</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Chapter 5</td>
              <td className="py-3 px-4 text-[#e2e8f0]">Recovery scripts: what to do when the conversation goes off the rails</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <p className="text-[#e2e8f0] leading-relaxed">
          <strong>One suggestion before you start:</strong> think of the conversation you've been putting off longest. Keep it in mind as you read. This report is most useful when it's applied to something specific.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-[#2d3748]">
        <button
          onClick={onNextChapter}
          className="w-full sm:w-auto px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors"
        >
          Next Chapter →
        </button>
      </div>
    </div>
  );
}
