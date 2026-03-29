import Logo from './Logo';
import { Circle, LogOut } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavClick: (viewId: string) => void;
  chapterProgress: Record<string, boolean>;
  onToggleProgress: (chapterId: string) => void;
  onLogout: () => void;
  displayName: string | null;
}

const chapters = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'chapter-1', label: 'Chapter 1: Why We Avoid' },
  { id: 'chapter-2', label: 'Chapter 2: The CCO Framework' },
  { id: 'chapter-3', label: 'Chapter 3: The Six Conversations' },
  { id: 'chapter-4', label: 'Chapter 4: Daily Communication Habits' },
  { id: 'chapter-5', label: 'Chapter 5: Recovery Scripts' },
  { id: 'conclusion', label: 'Conclusion' },
];

const tools = [
  { id: 'cco-prep-sheet', label: 'CCO Prep Sheet Generator' },
  { id: 'wordflow-builder', label: 'Wordflow Builder' },
  { id: 'cco-blueprint', label: 'CCO Blueprint Generator' },
  { id: 'i-statement-translator', label: 'I-Statement Translator' },
  { id: 'debrief-tool', label: 'Debrief Tool' },
  { id: 'conversation-log', label: 'Conversation Log' },
];

export default function Navigation({
  currentView,
  onNavClick,
  chapterProgress,
  onToggleProgress,
  onLogout,
  displayName,
}: NavigationProps) {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Logo Section */}
      <div className="p-6 flex flex-col items-center border-b border-[#2d3748]">
        <Logo size={52} />
        <p className="text-[#00e5ff] text-xs font-bold text-center mt-3">
          The Communication Playbook
        </p>
        {displayName && (
          <p className="text-[#a0aec0] text-xs text-center mt-2">
            Welcome back,{' '}
            <span className="text-white font-semibold">{displayName}</span>
          </p>
        )}
      </div>

      <div className="flex-1 p-4 space-y-6">
        {/* Playbook Section */}
        <div>
          <h3 className="text-[#a0aec0] text-xs font-semibold uppercase tracking-wider mb-3 px-2">
            Playbook
          </h3>
          <div className="space-y-1">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex items-center gap-2 group"
              >
                <button
                  onClick={() => onNavClick(chapter.id)}
                  className={`flex-1 text-left px-3 py-2 rounded text-sm transition-colors ${
                    currentView === chapter.id
                      ? 'bg-[#00e5ff] bg-opacity-10 text-[#00e5ff]'
                      : 'text-[#e2e8f0] hover:bg-[#2d3748]'
                  }`}
                >
                  {chapter.label}
                </button>
                <button
                  onClick={() => onToggleProgress(chapter.id)}
                  className="w-5 h-5 flex items-center justify-center transition-colors"
                  aria-label={`Mark ${chapter.label} as complete`}
                >
                  {chapterProgress[chapter.id] ? (
                    <div className="w-3 h-3 rounded-full bg-[#00e5ff]" />
                  ) : (
                    <Circle size={12} className="text-[#4a5568] hover:text-[#00e5ff]" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h3 className="text-[#a0aec0] text-xs font-semibold uppercase tracking-wider mb-3 px-2 pt-4 border-t border-[#2d3748]">
            Tools
          </h3>
          <div className="space-y-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavClick(tool.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  currentView === tool.id
                    ? 'bg-[#00e5ff] bg-opacity-10 text-[#00e5ff]'
                    : 'text-[#e2e8f0] hover:bg-[#2d3748]'
                }`}
              >
                {tool.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sign Out */}
      <div className="p-4 border-t border-[#2d3748]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-[#a0aec0] hover:bg-[#2d3748] hover:text-white transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
