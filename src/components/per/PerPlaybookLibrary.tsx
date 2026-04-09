import { useState } from 'react';
import { Search, Filter, Lock, CheckCircle, BookOpen } from 'lucide-react';
import { usePerPlaybooks, usePerPlaybookAccess, PerPlaybook } from '../../hooks/usePerPlaybooks';
import { useAuth } from '../../contexts/AuthContext';

const CATEGORIES = ['All', 'Marketing', 'Operations', 'HR', 'Sales', 'Leadership'];

interface PerPlaybookCardProps {
  playbook: PerPlaybook;
  onOpen: (id: string) => void;
}

function PerPlaybookCard({ playbook, onOpen }: PerPlaybookCardProps) {
  const { user } = useAuth();
  const { hasAccess } = usePerPlaybookAccess(playbook.id, user?.id);
  const isFree = playbook.price === 0;
  const canAccess = isFree || hasAccess;

  return (
    <div className="bg-[#1e2a3a] border border-[#2d3748] rounded-lg overflow-hidden hover:border-[#00e5ff] transition-colors">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3 gap-2">
          <h3 className="text-sm font-semibold text-white leading-tight flex-1">
            {playbook.title}
          </h3>
          <span className="px-2 py-0.5 text-xs font-medium bg-[#2d3748] text-[#a0aec0] rounded flex-shrink-0">
            {playbook.category}
          </span>
        </div>

        <p className="text-[#a0aec0] text-xs mb-4 line-clamp-3 leading-relaxed">
          {playbook.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">
            {isFree ? (
              <span className="text-green-400">Free</span>
            ) : (
              <span className="text-[#00e5ff]">${playbook.price.toFixed(2)}</span>
            )}
          </div>

          {canAccess ? (
            <button
              onClick={() => onOpen(playbook.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00e5ff] bg-opacity-10 text-[#00e5ff] border border-[#00e5ff] border-opacity-30 rounded text-xs font-medium hover:bg-opacity-20 transition-colors"
            >
              {hasAccess && !isFree && <CheckCircle className="w-3.5 h-3.5" />}
              <BookOpen className="w-3.5 h-3.5" />
              Open
            </button>
          ) : (
            <button
              onClick={() => onOpen(playbook.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              Unlock ${playbook.price.toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface PerPlaybookLibraryProps {
  onOpenPlaybook: (id: string) => void;
}

export default function PerPlaybookLibrary({ onOpenPlaybook }: PerPlaybookLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { playbooks, loading, error } = usePerPlaybooks(selectedCategory);

  const filteredPlaybooks = playbooks.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">PER Playbook Library</h1>
        <p className="text-[#a0aec0] text-sm">
          Browse and unlock professional SOPs to streamline your operations.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5568]" />
          <input
            type="text"
            placeholder="Search playbooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#1e2a3a] border border-[#2d3748] text-white placeholder-[#4a5568] rounded text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#a0aec0] flex-shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#1e2a3a] border border-[#2d3748] text-white rounded text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#2d3748] border-t-[#00e5ff]" />
          <p className="mt-4 text-[#a0aec0] text-sm">Loading playbooks...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900 bg-opacity-30 border border-red-700 rounded p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && filteredPlaybooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-[#2d3748] mx-auto mb-3" />
          <p className="text-[#a0aec0] text-sm">No playbooks found matching your criteria.</p>
        </div>
      )}

      {!loading && !error && filteredPlaybooks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlaybooks.map((playbook) => (
            <PerPlaybookCard
              key={playbook.id}
              playbook={playbook}
              onOpen={onOpenPlaybook}
            />
          ))}
        </div>
      )}
    </div>
  );
}
