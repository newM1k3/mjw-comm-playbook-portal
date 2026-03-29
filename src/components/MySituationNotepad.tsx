import { useState, useEffect, useRef } from 'react';
import { CreditCard as Edit3, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function MySituationNotepad() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const { user } = useAuth();
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user) return;

    supabase
      .from('user_notes')
      .select('content')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setNotes(data.content);
      });
  }, [user]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (!user) return;
      supabase
        .from('user_notes')
        .upsert(
          { user_id: user.id, content: newNotes, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' }
        )
        .then(() => {});
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 bg-[#00e5ff] text-[#1a202c] px-4 py-3 rounded-full shadow-lg hover:bg-[#00d4e6] transition-colors flex items-center gap-2 font-semibold text-sm z-50"
      >
        <Edit3 size={18} />
        My Notes
      </button>

      {isOpen && (
        <>
          {/* Mobile: full-width bottom drawer */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a202c] border-t border-[#00e5ff] shadow-2xl z-50 flex flex-col" style={{ height: '60vh' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d3748]">
              <h3 className="text-[#00e5ff] font-semibold">My Situation Notes</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#00e5ff] hover:text-[#00d4e6] p-1"
                aria-label="Close notes"
              >
                <X size={20} />
              </button>
            </div>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Type notes about your specific situation here as you read. What conversation are you preparing for? What are the facts?"
              className="flex-1 p-4 bg-[#1a202c] text-[#e2e8f0] resize-none focus:outline-none placeholder-[#4a5568] text-sm"
            />
          </div>

          {/* Desktop: floating panel */}
          <div className="hidden md:flex fixed bottom-24 right-6 w-96 bg-[#1a202c] border border-[#00e5ff] rounded-lg shadow-xl z-50 flex-col" style={{ height: '364px' }}>
            <div className="flex items-center justify-between p-4 border-b border-[#2d3748]">
              <h3 className="text-[#00e5ff] font-semibold">My Situation Notes</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#00e5ff] hover:text-[#00d4e6]"
                aria-label="Close notes"
              >
                <X size={18} />
              </button>
            </div>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Type notes about your specific situation here as you read. What conversation are you preparing for? What are the facts?"
              className="flex-1 p-4 bg-[#1a202c] text-[#e2e8f0] resize-none focus:outline-none placeholder-[#4a5568]"
            />
          </div>
        </>
      )}
    </>
  );
}
