import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { pb } from '../../lib/pocketbase';
import { useAuth } from '../../contexts/AuthContext';

interface LogEntry {
  id: string;
  date: string;
  who: string;
  situation: string;
  whatHappened: string;
  whatDifferently: string;
}

interface DbRow {
  id: string;
  entry: string;
}

export default function ConversationLog() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    who: '',
    situation: '',
    whatHappened: '',
    whatDifferently: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    pb
      .collection('conversation_log')
      .getFullList<DbRow>({ filter: `user_id="${user.id}"`, sort: '-created' })
      .then((rows) => {
        const parsed: LogEntry[] = rows.map((row) => ({
          id: row.id,
          ...JSON.parse(row.entry)
        }));
        setEntries(parsed);
      })
      .catch(() => {});
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const entryPayload = {
      date: formData.date,
      who: formData.who,
      situation: formData.situation,
      whatHappened: formData.whatHappened,
      whatDifferently: formData.whatDifferently
    };

    try {
      const rec = await pb
        .collection('conversation_log')
        .create<DbRow>({ user_id: user.id, entry: JSON.stringify(entryPayload) });
      const newEntry: LogEntry = { id: rec.id, ...JSON.parse(rec.entry) };
      setEntries([newEntry, ...entries]);
    } catch {
      // save failed — leave entries unchanged
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      who: '',
      situation: '',
      whatHappened: '',
      whatDifferently: ''
    });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    if (!user) return;

    try {
      // The deleteRule (user_id = @request.auth.id) enforces ownership server-side.
      await pb.collection('conversation_log').delete(id);
      setEntries(entries.filter(entry => entry.id !== id));
    } catch {
      // delete failed — leave entries unchanged
    }
  };

  const handleCancel = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      who: '',
      situation: '',
      whatHappened: '',
      whatDifferently: ''
    });
    setShowForm(false);
  };

  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl sm:text-4xl font-bold text-[#e2e8f0] mb-3">
        Conversation Log
      </h1>
      <p className="text-[#a0aec0] mb-6">
        A private record of conversations you've had. Your log is saved to your account.
      </p>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-6 w-full sm:w-auto px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors"
        >
          Add New Entry
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#111827] border border-[#2d3748] rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[#e2e8f0] font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a202c] border border-[#2d3748] rounded text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff]"
                required
              />
            </div>

            <div>
              <label className="block text-[#e2e8f0] font-medium mb-2">
                Who was the conversation with?
              </label>
              <input
                type="text"
                value={formData.who}
                onChange={(e) => setFormData({ ...formData, who: e.target.value })}
                placeholder="e.g. A team member, a client, a supplier"
                className="w-full px-4 py-2 bg-[#1a202c] border border-[#2d3748] rounded text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff] placeholder-[#4a5568]"
                required
              />
            </div>

            <div>
              <label className="block text-[#e2e8f0] font-medium mb-2">
                What was the situation?
              </label>
              <textarea
                value={formData.situation}
                onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                placeholder="Briefly describe the issue or conversation type"
                rows={3}
                className="w-full px-4 py-2 bg-[#1a202c] border border-[#2d3748] rounded text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff] placeholder-[#4a5568] resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#e2e8f0] font-medium mb-2">
                What happened?
              </label>
              <textarea
                value={formData.whatHappened}
                onChange={(e) => setFormData({ ...formData, whatHappened: e.target.value })}
                placeholder="How did it go? What was the outcome?"
                rows={3}
                className="w-full px-4 py-2 bg-[#1a202c] border border-[#2d3748] rounded text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff] placeholder-[#4a5568] resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-[#e2e8f0] font-medium mb-2">
                What would you do differently?
              </label>
              <textarea
                value={formData.whatDifferently}
                onChange={(e) => setFormData({ ...formData, whatDifferently: e.target.value })}
                placeholder="One thing you'd change next time"
                rows={3}
                className="w-full px-4 py-2 bg-[#1a202c] border border-[#2d3748] rounded text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff] placeholder-[#4a5568] resize-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#00e5ff] text-[#1a202c] font-semibold rounded-lg hover:bg-[#00d4e6] transition-colors"
            >
              Save Entry
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-[#4a5568] text-[#e2e8f0] font-semibold rounded-lg hover:border-[#00e5ff] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#111827] border border-[#2d3748] rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="text-[#a0aec0] text-sm mb-1">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-[#e2e8f0] font-bold text-lg">
                  {entry.who}
                </h3>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
                aria-label="Delete entry"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-[#a0aec0]">
              {truncate(entry.situation, 100)}
            </p>
          </div>
        ))}

        {entries.length === 0 && !showForm && (
          <div className="text-center py-12 text-[#a0aec0]">
            No entries yet. Click "Add New Entry" to start your conversation log.
          </div>
        )}
      </div>
    </div>
  );
}
