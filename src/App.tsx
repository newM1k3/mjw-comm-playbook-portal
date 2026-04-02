import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import AnnouncementBanner from './components/AnnouncementBanner';
import MySituationNotepad from './components/MySituationNotepad';
import OnboardingModal from './components/OnboardingModal';
import Introduction from './components/chapters/Introduction';
import Chapter1 from './components/chapters/Chapter1';
import Chapter2 from './components/chapters/Chapter2';
import Chapter3 from './components/chapters/Chapter3';
import Chapter4 from './components/chapters/Chapter4';
import Chapter5 from './components/chapters/Chapter5';
import Conclusion from './components/chapters/Conclusion';
import CCOPrepSheet from './components/tools/CCOPrepSheet';
import WordflowBuilder from './components/tools/WordflowBuilder';
import CCOBlueprint from './components/tools/CCOBlueprint';
import IStatementTranslator from './components/tools/IStatementTranslator';
import DebriefTool from './components/tools/DebriefTool';
import ConversationLog from './components/tools/ConversationLog';
import { Menu, X } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { pb, ensureAuth } from './lib/pocketbase';
import { useUserProfile } from './hooks/useUserProfile';

export default function App() {
  const [currentView, setCurrentView] = useState('introduction');
  const [chapterProgress, setChapterProgress] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { profile, loading: profileLoading, completeOnboarding } = useUserProfile(user?.id);

  const showOnboarding = !profileLoading && !!user && profile !== null && !profile.onboarding_complete;
  const showOnboardingNew = !profileLoading && !!user && profile === null;

  const loadProgress = useCallback(async (userId: string) => {
    try {
      // Single-quoted filter value — PocketBase filter syntax requires single
      // quotes around string literals.  Double-quoted values risk 400 errors.
      const records = await pb.collection('user_progress').getFullList({
        filter: `user_id = '${userId}'`,
        fields: 'chapter_id,completed',
      });
      const progress: Record<string, boolean> = {};
      records.forEach((row) => {
        progress[row.chapter_id] = row.completed;
      });
      setChapterProgress(progress);
    } catch {
      // Progress load failed silently
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadProgress(user.id);
    } else {
      setChapterProgress({});
    }
  }, [user, loadProgress]);

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const toggleChapterProgress = async (chapterId: string) => {
    const newValue = !chapterProgress[chapterId];
    setChapterProgress((prev) => ({ ...prev, [chapterId]: newValue }));

    if (user) {
      try {
        // Refresh the auth token before any write to prevent stale-token 403s.
        await ensureAuth();

        // Single-quoted filter values throughout.
        const existing = await pb.collection('user_progress').getList(1, 1, {
          filter: `user_id = '${user.id}' && chapter_id = '${chapterId}'`,
        });
        if (existing.items.length > 0) {
          await pb.collection('user_progress').update(existing.items[0].id, {
            completed: newValue,
            completed_at: newValue ? new Date().toISOString() : null,
          });
        } else {
          await pb.collection('user_progress').create({
            user_id: user.id,
            chapter_id: chapterId,
            completed: newValue,
            completed_at: newValue ? new Date().toISOString() : null,
          });
        }
      } catch {
        // Progress save failed silently
      }
    }
  };

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setIsMobileMenuOpen(false);
  };

  const chapterOrder = [
    'introduction',
    'chapter-1',
    'chapter-2',
    'chapter-3',
    'chapter-4',
    'chapter-5',
    'conclusion'
  ];

  const handleNextChapter = () => {
    const currentIndex = chapterOrder.indexOf(currentView);
    if (currentIndex >= 0 && currentIndex < chapterOrder.length - 1) {
      toggleChapterProgress(currentView);
      const nextChapter = chapterOrder[currentIndex + 1];
      setCurrentView(nextChapter);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'introduction':
        return <Introduction onNextChapter={handleNextChapter} />;
      case 'chapter-1':
        return <Chapter1 onNextChapter={handleNextChapter} />;
      case 'chapter-2':
        return <Chapter2 onNextChapter={handleNextChapter} />;
      case 'chapter-3':
        return <Chapter3 onNextChapter={handleNextChapter} />;
      case 'chapter-4':
        return <Chapter4 onNextChapter={handleNextChapter} />;
      case 'chapter-5':
        return <Chapter5 onNextChapter={handleNextChapter} />;
      case 'conclusion':
        return <Conclusion onMarkComplete={() => toggleChapterProgress('conclusion')} isCompleted={!!chapterProgress['conclusion']} />;
      case 'cco-prep-sheet':
        return <CCOPrepSheet />;
      case 'wordflow-builder':
        return <WordflowBuilder />;
      case 'cco-blueprint':
        return <CCOBlueprint />;
      case 'i-statement-translator':
        return <IStatementTranslator />;
      case 'debrief-tool':
        return <DebriefTool />;
      case 'conversation-log':
        return <ConversationLog />;
      default:
        return <Introduction onNextChapter={handleNextChapter} />;
    }
  };

  const isChapterView = () => {
    const chapterViews = [
      'introduction',
      'chapter-1',
      'chapter-2',
      'chapter-3',
      'chapter-4',
      'chapter-5',
      'conclusion'
    ];
    return chapterViews.includes(currentView);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#1a202c]">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#111827] text-[#00e5ff] rounded-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Sidebar */}
      <div
        className={`fixed md:relative w-full md:w-[220px] h-full bg-[#111827] z-40 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Navigation
          currentView={currentView}
          onNavClick={handleNavClick}
          chapterProgress={chapterProgress}
          onToggleProgress={toggleChapterProgress}
          onLogout={handleLogout}
          displayName={profile?.display_name ?? null}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="pt-16 md:pt-0 px-4 pb-6 md:p-8 max-w-5xl mx-auto">
          <AnnouncementBanner />
          {renderContent()}
        </div>
      </div>

      {/* My Situation Notepad - only on chapter pages */}
      {isChapterView() && <MySituationNotepad />}

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Onboarding modal for new or incomplete users */}
      {(showOnboarding || showOnboardingNew) && (
        <OnboardingModal onComplete={completeOnboarding} />
      )}
    </div>
  );
}
