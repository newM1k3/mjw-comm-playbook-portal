interface Chapter4Props {
  onNextChapter: () => void;
}

export default function Chapter4({ onNextChapter }: Chapter4Props) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#e2e8f0] mb-6">
        Chapter 4: Getting Your Team to Actually Listen
      </h1>

      <p className="text-base sm:text-xl text-[#a0aec0] italic mb-8">
        Authority isn't taken — it's earned, through how you communicate every day
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        This chapter is about the steady background hum of communication that either builds or erodes your authority as a leader over time. Because here's what many small business owners quietly discover: they can get reasonably good at having hard conversations, and still find that their team doesn't really listen.
      </p>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        The Likeability Trap
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        The most common way small business owners lose authority is by prioritizing being liked over being respected. They soften feedback, let things slide, and say yes when they mean no. Over time, this produces a team that has learned that requests are negotiable and consequences are unlikely.
      </p>

      <div className="bg-[#111827] border-l-4 border-[#00e5ff] p-6 my-8 rounded-r">
        <p className="text-[#e2e8f0] text-lg font-medium">
          The hard truth is that being liked and being respected are not the same thing. And when you have to choose, respect is the one that makes your business function.
        </p>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#2d3748]">
              <th className="text-left py-3 px-4 text-[#00e5ff] font-semibold">What Undermines Your Authority</th>
              <th className="text-left py-3 px-4 text-[#00e5ff] font-semibold">What Builds It</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Over-apologising for decisions</td>
              <td className="py-3 px-4 text-[#e2e8f0]">Making decisions and explaining the reasoning clearly</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Softening feedback until the point is lost</td>
              <td className="py-3 px-4 text-[#e2e8f0]">Delivering feedback specifically and directly</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Letting standards slide 'just this once'</td>
              <td className="py-3 px-4 text-[#e2e8f0]">Holding the standard and addressing exceptions</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">Asking "would you mind..." for non-optional tasks</td>
              <td className="py-3 px-4 text-[#e2e8f0]">Assigning tasks directly, with context</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        Why People Tune Out
      </h2>

      <ul className="list-disc list-inside space-y-3 mb-8 text-[#e2e8f0]">
        <li><strong>Too Much Noise:</strong> If everything is urgent, nothing is. Reserve your most direct, serious communication for the things that are actually serious.</li>
        <li><strong>Mixed Signals:</strong> People stop listening when what you say and what you do stop matching. If you set a standard and then don't enforce it, the standard disappears.</li>
        <li><strong>No Two-Way Flow:</strong> You get more authority when you listen more. A leader who genuinely asks for and acts on input is more trusted than one who only directs.</li>
      </ul>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        The Non-Verbal Problem
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        Your body language, tone, and pace of speech send signals before your words arrive. If those signals contradict your words, people respond to the signal, not the words.
      </p>

      <ul className="list-disc list-inside space-y-2 mb-8 text-[#e2e8f0]">
        <li>Upward inflection at the end of statements sounds like a question and invites negotiation.</li>
        <li>Over-qualifying ("probably," "kind of," "sort of") reduces the weight of what you're saying.</li>
        <li>Filling silence with noise dilutes the message. Make the statement. Then be quiet.</li>
      </ul>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        The Assertiveness Sweet Spot
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        Assertiveness is being direct about what you need, want, or believe — in a way that still respects the other person. It's not harsh. It's not soft. It's honest and clear.
      </p>

      <h3 className="text-xl font-bold text-[#e2e8f0] mt-8 mb-4">
        The I-Statement Model
      </h3>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#2d3748]">
              <th className="text-left py-3 px-4 text-[#00e5ff] font-semibold">You-Statement (Shuts people down)</th>
              <th className="text-left py-3 px-4 text-[#00e5ff] font-semibold">I-Statement (Keeps it open)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">"You're always late."</td>
              <td className="py-3 px-4 text-[#e2e8f0]">"When the opening shift isn't covered on time, it creates problems I have to manage. I need that to change."</td>
            </tr>
            <tr className="border-b border-[#2d3748]">
              <td className="py-3 px-4 text-[#e2e8f0]">"You never communicate."</td>
              <td className="py-3 px-4 text-[#e2e8f0]">"I don't feel like I'm getting the information I need to plan. Let's figure out how to fix that."</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        The Listening Paradox
      </h2>

      <div className="bg-[#111827] border-l-4 border-[#00e5ff] p-6 my-8 rounded-r">
        <p className="text-[#e2e8f0] text-lg font-medium">
          You get more authority when you use less of it.
        </p>
      </div>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        The owners whose teams listen most closely are almost never the loudest voices in the room. They're the ones who speak deliberately, listen genuinely, and make it clear by their behaviour that what they say actually means something.
      </p>

      <h3 className="text-xl font-bold text-[#e2e8f0] mt-8 mb-4">
        What Active Listening Actually Looks Like:
      </h3>

      <ul className="list-disc list-inside space-y-2 mb-8 text-[#e2e8f0]">
        <li><strong>Ask before you tell.</strong> When a team member brings you a problem, ask: "What do you think the options are?"</li>
        <li><strong>Reflect back before you respond.</strong> Before sharing your view, paraphrase what you heard: "So what you're saying is..."</li>
        <li><strong>Don't interrupt.</strong> Let people finish.</li>
      </ul>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        The One Rule That Fixes 80% of Team Confusion
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-4">
        Before any meeting ends, ask: "What are we each doing, and by when?"
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-8">
        Every meeting ends with a stated list of next actions — who is doing what, by when. Then follow up.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">💡 Chapter Takeaway</h3>
        <p className="text-[#e2e8f0] mb-4">
          Your team's listening problem is almost never about defiance. It's about drift — caused by inconsistency, unclear signals, and communication patterns that have trained them that your words are optional.
        </p>
        <p className="text-[#e2e8f0]">
          The fix isn't a single conversation. It's a set of daily habits: hold your standards, match your words and actions, listen genuinely, and communicate assertively.
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
