import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';

export interface PerPlaybook {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  price: number;
  is_published: boolean;
  created: string;
}

/**
 * Fetch all published PER Playbooks, optionally filtered by category.
 * Uses the canonical PocketBase singleton — never instantiates its own client.
 */
export function usePerPlaybooks(category?: string) {
  const [playbooks, setPlaybooks] = useState<PerPlaybook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlaybooks() {
      try {
        setLoading(true);
        setError(null);

        const filter =
          category && category !== 'All'
            ? `is_published = true && category = '${category}'`
            : `is_published = true`;

        const records = await pb.collection('per_playbooks').getFullList<PerPlaybook>({
          filter,
          sort: '-created',
        });

        if (!cancelled) setPlaybooks(records);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Failed to fetch playbooks');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlaybooks();
    return () => {
      cancelled = true;
    };
  }, [category]);

  return { playbooks, loading, error };
}

/**
 * Fetch a single PER Playbook by ID.
 */
export function usePerPlaybook(id: string | null) {
  const [playbook, setPlaybook] = useState<PerPlaybook | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setPlaybook(null);
      return;
    }

    const safeId = id; // narrowed to string — id is non-null here
    let cancelled = false;

    async function fetchPlaybook() {
      try {
        setLoading(true);
        setError(null);
        const record = await pb.collection('per_playbooks').getOne<PerPlaybook>(safeId);
        if (!cancelled) setPlaybook(record);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Failed to fetch playbook');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlaybook();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { playbook, loading, error };
}

/**
 * Check whether the current user has purchased a specific PER Playbook.
 * Free playbooks (price === 0) always return hasAccess = true.
 */
export function usePerPlaybookAccess(playbookId: string | null, userId: string | undefined) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!playbookId || !userId) {
      setHasAccess(false);
      return;
    }

    let cancelled = false;

    async function checkAccess() {
      try {
        setLoading(true);
        const records = await pb.collection('per_playbook_purchases').getList(1, 1, {
          filter: `user_id = '${userId}' && playbook_id = '${playbookId}'`,
        });
        if (!cancelled) setHasAccess(records.items.length > 0);
      } catch {
        if (!cancelled) setHasAccess(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    checkAccess();
    return () => {
      cancelled = true;
    };
  }, [playbookId, userId]);

  return { hasAccess, loading };
}
