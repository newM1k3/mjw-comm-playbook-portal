import { useState } from 'react';

interface OnboardingModalProps {
  onComplete: (displayName: string) => Promise<void>;
}

export default function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [firstName, setFirstName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) return;
    setSubmitting(true);
    await onComplete(firstName);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div
        className="relative w-full sm:max-w-md sm:mx-4 sm:rounded-2xl rounded-t-2xl border border-[#1a3a3a] shadow-2xl"
        style={{ background: '#0a0a0a' }}
      >
        {/* Top accent line */}
        <div className="h-1 w-full rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #00b4b4, #00e5ff)' }} />

        <div className="p-6 sm:p-8">
          {/* Logo mark */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,180,180,0.1)', border: '1px solid rgba(0,180,180,0.3)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16L5.5 20.5L8 13.5L2 9H9.5L12 2Z"
                  fill="none"
                  stroke="#00b4b4"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2 tracking-tight">
            Welcome to The Communication Playbook
          </h1>

          <p className="text-[#a0aec0] text-sm text-center leading-relaxed mb-8">
            This portal is your personal guide to having the conversations that matter most. Work through each chapter at your own pace — your progress is saved automatically.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#00b4b4' }}
              >
                What's your first name?
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                autoFocus
                className="w-full px-4 py-3 rounded-lg text-white placeholder-[#4a5568] text-sm outline-none transition-all focus:ring-2"
                style={{
                  background: '#111827',
                  border: '1px solid #1a3a3a',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00b4b4';
                  e.target.style.boxShadow = '0 0 0 2px rgba(0,180,180,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#1a3a3a';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!firstName.trim() || submitting}
              className="w-full py-3 rounded-lg font-semibold text-sm tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: firstName.trim() && !submitting
                  ? 'linear-gradient(135deg, #00b4b4, #00e5ff)'
                  : '#1a3a3a',
                color: '#0a0a0a',
              }}
            >
              {submitting ? 'Getting started...' : "Let's Begin \u2192"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
