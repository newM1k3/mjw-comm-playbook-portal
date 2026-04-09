import { useState } from 'react';
import { ArrowLeft, CheckCircle, Circle, Lock, CreditCard } from 'lucide-react';
import { usePerPlaybook, usePerPlaybookAccess } from '../../hooks/usePerPlaybooks';
import { useAuth } from '../../contexts/AuthContext';

interface PerPlaybookReaderProps {
  playbookId: string;
  onBack: () => void;
}

function LockScreen({ price, title }: { price: number; title: string }) {
  const handlePurchase = () => {
    // TODO: Wire up to Netlify Function create-checkout-session
    // POST { priceId, userId, appSlug: 'per-playbook', playbookTitle: title }
    console.log('Initiate Stripe Checkout for PER Playbook:', title);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#1e2a3a] border-2 border-[#2d3748] rounded-lg overflow-hidden">
        {/* Blurred preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1e2a3a] z-10" />
          <div className="p-8 filter blur-sm select-none pointer-events-none">
            <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
            <div className="space-y-3">
              <p className="text-[#a0aec0] text-sm">
                This playbook contains detailed step-by-step instructions...
              </p>
              <h2 className="text-lg font-semibold text-white">Step 1: Getting Started</h2>
              <p className="text-[#a0aec0] text-sm">Lorem ipsum dolor sit amet...</p>
              <h2 className="text-lg font-semibold text-white">Step 2: Implementation</h2>
              <p className="text-[#a0aec0] text-sm">Sed do eiusmod tempor incididunt...</p>
            </div>
          </div>
        </div>

        {/* Lock CTA */}
        <div className="bg-[#111827] p-8 border-t-2 border-[#2d3748] relative z-20">
          <div className="max-w-sm mx-auto text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#00e5ff] bg-opacity-10 rounded-full mb-4">
              <Lock className="w-7 h-7 text-[#00e5ff]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Unlock This Playbook</h2>
            <p className="text-[#a0aec0] text-sm mb-6">
              This SOP requires a one-time purchase to access the full content.
            </p>
            <div className="bg-[#1e2a3a] rounded-lg border border-[#2d3748] p-5 mb-6">
              <div className="text-3xl font-bold text-[#00e5ff] mb-1">
                ${price.toFixed(2)}
              </div>
              <p className="text-xs text-[#a0aec0]">One-time purchase · Lifetime access</p>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              Buy Now
            </button>
            <p className="text-xs text-[#4a5568] mt-4">Secure payment powered by Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PerPlaybookReader({ playbookId, onBack }: PerPlaybookReaderProps) {
  const { user } = useAuth();
  const { playbook, loading: playbookLoading } = usePerPlaybook(playbookId);
  const { hasAccess, loading: accessLoading } = usePerPlaybookAccess(playbookId, user?.id);
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const loading = playbookLoading || accessLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#2d3748] border-t-[#00e5ff]" />
          <p className="mt-4 text-[#a0aec0] text-sm">Loading playbook...</p>
        </div>
      </div>
    );
  }

  if (!playbook) {
    return (
      <div className="text-center py-20">
        <p className="text-[#a0aec0] text-sm mb-4">Playbook not found.</p>
        <button
          onClick={onBack}
          className="text-[#00e5ff] text-sm hover:underline"
        >
          ← Back to Library
        </button>
      </div>
    );
  }

  const isFree = playbook.price === 0;
  const canAccess = isFree || hasAccess;

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // Parse content: first section is intro, subsequent ## sections are steps
  const contentSections = playbook.content.split('\n## ').filter(Boolean);
  const introSection = contentSections[0] ?? '';
  const steps = contentSections.slice(1);

  // Strip leading h1 from intro
  const introBody = introSection.replace(/^#[^#].*\n\n?/, '');

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[#a0aec0] hover:text-white text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </button>

      {/* Header card */}
      <div className="bg-[#1e2a3a] border border-[#2d3748] rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b border-[#2d3748]">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-2 py-0.5 text-xs font-medium bg-[#2d3748] text-[#a0aec0] rounded">
              {playbook.category}
            </span>
            {isFree ? (
              <span className="px-2 py-0.5 text-xs font-medium bg-green-900 bg-opacity-50 text-green-400 rounded">
                Free
              </span>
            ) : (
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-900 bg-opacity-50 text-blue-300 rounded">
                Premium
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{playbook.title}</h1>
          <p className="text-[#a0aec0] text-sm">{playbook.description}</p>
        </div>

        {canAccess ? (
          <div className="p-6">
            {/* Intro body */}
            {introBody && (
              <div
                className="text-[#e2e8f0] text-sm leading-relaxed mb-8 prose-invert"
                dangerouslySetInnerHTML={{ __html: introBody }}
              />
            )}

            {/* Steps */}
            {steps.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Steps</h2>
                <div className="space-y-4">
                  {steps.map((step, index) => {
                    const lines = step.split('\n');
                    const title = lines[0] ?? '';
                    const body = lines.slice(1).join('\n').trim();
                    const isChecked = checkedSteps.has(index);

                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-5 transition-all ${
                          isChecked
                            ? 'bg-green-900 bg-opacity-20 border-green-700'
                            : 'bg-[#111827] border-[#2d3748]'
                        }`}
                      >
                        <button
                          onClick={() => toggleStep(index)}
                          className="flex items-start gap-3 w-full text-left group"
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {isChecked ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-[#4a5568] group-hover:text-[#00e5ff] transition-colors" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`text-sm font-semibold mb-1.5 ${
                                isChecked ? 'text-green-300' : 'text-white'
                              }`}
                            >
                              {title}
                            </h3>
                            {body && (
                              <p
                                className={`text-xs leading-relaxed ${
                                  isChecked ? 'text-green-400' : 'text-[#a0aec0]'
                                }`}
                              >
                                {body}
                              </p>
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Progress indicator */}
                <div className="mt-6 pt-4 border-t border-[#2d3748]">
                  <div className="flex items-center justify-between text-xs text-[#a0aec0] mb-2">
                    <span>Progress</span>
                    <span>
                      {checkedSteps.size} / {steps.length} steps completed
                    </span>
                  </div>
                  <div className="w-full bg-[#2d3748] rounded-full h-1.5">
                    <div
                      className="bg-[#00e5ff] h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${steps.length > 0 ? (checkedSteps.size / steps.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6">
            <LockScreen price={playbook.price} title={playbook.title} />
          </div>
        )}
      </div>
    </div>
  );
}
