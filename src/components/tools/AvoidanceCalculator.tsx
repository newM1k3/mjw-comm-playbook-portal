/**
 * AvoidanceCalculator
 *
 * Harvested and elevated from mjw-avoidance-calculator (2-commit prototype).
 * Calculates the real financial cost of a single avoided workplace conversation
 * using three slider inputs, then presents a CTA to the Communication Playbook.
 *
 * Styled to match the portal's dark theme (#1a202c / #00e5ff palette).
 */
import { useState } from 'react';
import { TrendingDown, DollarSign, Clock, Users } from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Core calculation logic (harvested from mjw-avoidance-calculator/src/App.tsx).
 *
 * Model:
 *   totalCost = hourlyRate × hoursLost × peopleInvolved × weeks
 *
 * This captures the compounding cost of a single unresolved issue:
 * the wasted time of everyone affected, multiplied by how long it has dragged on.
 */
function calculateAvoidanceCost(
  hourlyRate: number,
  hoursLost: number,
  peopleInvolved: number,
  weeks: number
): number {
  return hourlyRate * hoursLost * peopleInvolved * weeks;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

interface SliderControlProps {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

function SliderControl({
  label,
  sublabel,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  icon,
}: SliderControlProps) {
  return (
    <div className="bg-[#1e2a3a] border border-[#2d3748] rounded-lg p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-[#2d3748] flex items-center justify-center text-[#a0aec0]">
              {icon}
            </div>
          )}
          <div>
            <p className="text-[#e2e8f0] font-medium text-sm">{label}</p>
            {sublabel && <p className="text-[#a0aec0] text-xs mt-0.5">{sublabel}</p>}
          </div>
        </div>
        <span className="text-[#00e5ff] font-bold text-xl tabular-nums">
          {prefix}{value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#111827] rounded-lg appearance-none cursor-pointer accent-[#00e5ff]"
      />
      <div className="flex justify-between text-xs text-[#4a5568] mt-1.5">
        <span>{prefix}{min}{suffix}</span>
        <span>{prefix}{max}{suffix}</span>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AvoidanceCalculator() {
  const [hourlyRate, setHourlyRate] = useState(50);
  const [hoursLost, setHoursLost] = useState(2);
  const [peopleInvolved, setPeopleInvolved] = useState(3);
  const [weeks, setWeeks] = useState(4);

  const totalCost = calculateAvoidanceCost(hourlyRate, hoursLost, peopleInvolved, weeks);

  const costLevel =
    totalCost < 1000 ? 'low' : totalCost < 5000 ? 'medium' : 'high';

  const costColor =
    costLevel === 'low'
      ? 'text-[#00e5ff]'
      : costLevel === 'medium'
      ? 'text-amber-400'
      : 'text-red-400';

  const costBorderColor =
    costLevel === 'low'
      ? 'border-[#00e5ff]/30'
      : costLevel === 'medium'
      ? 'border-amber-500/30'
      : 'border-red-500/30';

  const costBgColor =
    costLevel === 'low'
      ? 'bg-[#00e5ff]/5'
      : costLevel === 'medium'
      ? 'bg-amber-500/5'
      : 'bg-red-500/5';

  const costMessage =
    costLevel === 'low'
      ? 'This is the cost of a single ignored issue.'
      : costLevel === 'medium'
      ? 'This is a significant and entirely preventable loss.'
      : 'This is a serious financial leak. It needs to stop today.';

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#e2e8f0] mb-2">
          Avoidance Cost Calculator
        </h1>
        <p className="text-[#a0aec0]">
          Quantify the real financial cost of a single avoided workplace conversation.
          Adjust the sliders to reflect your situation and see what silence is actually costing you.
        </p>
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-8">
        <SliderControl
          label="Average hourly rate"
          sublabel="The blended hourly cost of the people involved"
          value={hourlyRate}
          onChange={setHourlyRate}
          min={20}
          max={250}
          step={5}
          prefix="$"
          icon={<DollarSign size={15} />}
        />
        <SliderControl
          label="Hours lost per week"
          sublabel="Time wasted on workarounds, venting, or reduced productivity"
          value={hoursLost}
          onChange={setHoursLost}
          min={1}
          max={20}
          suffix=" hrs"
          icon={<Clock size={15} />}
        />
        <SliderControl
          label="People affected"
          sublabel="Everyone whose work is impacted by this unresolved issue"
          value={peopleInvolved}
          onChange={setPeopleInvolved}
          min={1}
          max={20}
          icon={<Users size={15} />}
        />
        <SliderControl
          label="Weeks the issue has persisted"
          sublabel="How long has this conversation been avoided?"
          value={weeks}
          onChange={setWeeks}
          min={1}
          max={52}
          suffix=" wks"
          icon={<TrendingDown size={15} />}
        />
      </div>

      {/* Result */}
      <div
        className={`rounded-xl border-2 p-8 text-center mb-8 ${costBorderColor} ${costBgColor}`}
      >
        <p className={`text-sm font-semibold mb-3 ${costColor}`}>{costMessage}</p>
        <div className={`text-6xl md:text-7xl font-bold mb-3 ${costColor}`}>
          {formatCurrency(totalCost)}
        </div>
        <p className="text-lg text-[#a0aec0]">
          Estimated cost of this single avoided conversation.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-[#111827] rounded-lg p-3">
            <p className="text-xs text-[#a0aec0] mb-1">Per week</p>
            <p className="text-sm font-bold text-[#e2e8f0]">
              {formatCurrency(hourlyRate * hoursLost * peopleInvolved)}
            </p>
          </div>
          <div className="bg-[#111827] rounded-lg p-3">
            <p className="text-xs text-[#a0aec0] mb-1">Per month</p>
            <p className="text-sm font-bold text-[#e2e8f0]">
              {formatCurrency(hourlyRate * hoursLost * peopleInvolved * 4.33)}
            </p>
          </div>
          <div className="bg-[#111827] rounded-lg p-3">
            <p className="text-xs text-[#a0aec0] mb-1">Per year</p>
            <p className="text-sm font-bold text-[#e2e8f0]">
              {formatCurrency(hourlyRate * hoursLost * peopleInvolved * 52)}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1e2a3a] border border-[#2d3748] rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-[#e2e8f0] mb-3">
          This is a solvable problem.
        </h2>
        <p className="text-[#a0aec0] mb-6 leading-relaxed max-w-xl mx-auto">
          The Communication Playbook gives you the exact frameworks and AI-powered tools
          to stop this leakage and reclaim your profits — for good. Start with Chapter 2:
          The CCO Framework.
        </p>
        <button
          onClick={() => {
            // Navigate to Chapter 2 via the parent nav — dispatches a custom event
            // that App.tsx can listen to, or the user can use the sidebar.
            window.dispatchEvent(new CustomEvent('mjw:navigate', { detail: 'chapter-2' }));
          }}
          className="inline-block bg-[#00e5ff] text-[#1a202c] font-bold text-base px-8 py-4 rounded-lg hover:bg-[#00d4e6] transition-colors duration-200 shadow-lg shadow-[#00e5ff]/20"
        >
          Go to Chapter 2: The CCO Framework →
        </button>
      </div>
    </div>
  );
}
