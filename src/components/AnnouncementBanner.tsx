import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#0d3d40] border border-[#00e5ff] rounded-lg px-4 py-3 mb-6 flex items-start md:items-center justify-between gap-3">
      <p className="text-white text-sm leading-relaxed flex-1 min-w-0">
        New: The Post-Conversation Debrief Tool is now live in your Tools section. Use it after your next hard conversation to get a personalised coaching note.
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#00e5ff] hover:text-[#00d4e6] flex-shrink-0 mt-0.5 md:mt-0"
        aria-label="Dismiss announcement"
      >
        <X size={18} />
      </button>
    </div>
  );
}
