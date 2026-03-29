interface Chapter5Props {
  onNextChapter: () => void;
}

export default function Chapter5({ onNextChapter }: Chapter5Props) {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#e2e8f0] mb-6">
        Chapter 5: Recovery Scripts
      </h1>

      <p className="text-base sm:text-xl text-[#a0aec0] italic mb-8">
        What to do when the conversation goes off the rails — before, during, and after
      </p>

      <p className="text-[#e2e8f0] leading-relaxed mb-8">
        Even with solid preparation, conversations don't always go as planned. This chapter is a reference guide for those moments. Six specific derailment patterns, what causes each one, and the exact language to pull things back on track.
      </p>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        Scenario 1: They shut down completely
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        You've opened the conversation, and the other person has gone quiet. Not the productive silence of someone thinking — the closed silence of someone who has mentally left the room.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">Recovery Scripts:</h3>
        <ul className="space-y-3 text-[#e2e8f0]">
          <li>• "I can see this is landing hard. Take a moment. I'm not going anywhere."</li>
          <li>• "You don't have to respond right now. I'd rather you take time to think than say something you don't mean. Can we come back to this tomorrow?"</li>
          <li>• "I notice you've gone quiet. I want to understand what's going on for you right now — is there something I said that I should clarify?"</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        Scenario 2: They get angry or emotional
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        They raise their voice, get defensive, or start to cry. The emotional temperature of the room has spiked.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">Recovery Scripts:</h3>
        <ul className="space-y-3 text-[#e2e8f0]">
          <li>• "I can see this is upsetting. Let's pause for a minute. I'm not trying to attack you."</li>
          <li>• "I hear your frustration. I'm not asking you to agree with me right now — I'm asking you to hear me out."</li>
          <li>• <strong>If they're crying:</strong> "It's okay to be upset. Take the time you need." Then wait. Don't immediately retract what you said.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        Scenario 3: They deflect or change the subject
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        Instead of addressing the issue you've raised, they bring up something else entirely — a different problem, a different person, a different time.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">Recovery Scripts:</h3>
        <ul className="space-y-3 text-[#e2e8f0]">
          <li>• "That's a separate issue, and I'm happy to talk about it. But right now, I need us to stay on this."</li>
          <li>• "I hear you. Let's put that on a list of things to discuss, but for the next ten minutes, I need to resolve [the original issue]."</li>
          <li>• "I think we're getting off track. The specific thing I need to address right now is..."</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        Scenario 4: They agree too quickly (and you know they don't mean it)
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        They immediately say "you're right, I'll fix it" without any real discussion. This is often a form of avoidance — a way to end the conversation as quickly as possible.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">Recovery Scripts:</h3>
        <ul className="space-y-3 text-[#e2e8f0]">
          <li>• "I appreciate you saying that. Can you tell me what you're going to do differently?"</li>
          <li>• "Okay. Let's be specific about what 'fixed' looks like, so we're both on the same page."</li>
          <li>• "I want to make sure we're not just ending the conversation. What's your actual take on this?"</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        Scenario 5: You say the wrong thing
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        You lose your temper, you overstate the case, you make it personal. You feel the conversation tipping and you know it's your fault.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">Recovery Scripts:</h3>
        <ul className="space-y-3 text-[#e2e8f0]">
          <li>• "I didn't say that right. Let me try again."</li>
          <li>• "That was unfair. I'm sorry. What I should have said is..."</li>
          <li>• "I'm getting frustrated, and that's not your fault. Let me take a breath and rephrase."</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-[#00e5ff] mt-12 mb-6">
        Scenario 6: You get new information that changes everything
      </h2>

      <p className="text-[#e2e8f0] leading-relaxed mb-6">
        You open the conversation, and their response gives you a piece of context you were completely missing — a medical issue, a family crisis, a problem with another team member.
      </p>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">Recovery Scripts:</h3>
        <ul className="space-y-3 text-[#e2e8f0]">
          <li>• "Okay, that's new information. Thank you for telling me. That changes how I see this."</li>
          <li>• "I was not aware of that. Let's pause this conversation for now and I'll come back to you."</li>
          <li>• "That context is important. Let me think about that and we can talk again tomorrow."</li>
        </ul>
      </div>

      <div className="bg-[#111827] p-6 my-8 rounded-lg border border-[#2d3748]">
        <h3 className="text-lg font-bold text-[#00e5ff] mb-3">💡 Chapter Takeaway</h3>
        <p className="text-[#e2e8f0]">
          A "recovery" doesn't always mean getting back to the exact conversation you planned. Sometimes it means pausing, resetting, and coming back. The goal is not a perfect conversation. The goal is a useful one.
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
