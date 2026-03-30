import { useState, useEffect, useCallback } from 'react';
import { pb } from '../lib/pocketbase';

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  onboarding_complete: boolean;
  created_at: string;
}

export function useUserProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      const records = await pb.collection('user_profiles').getList(1, 1, {
        filter: `user_id = "${uid}"`,
      });
      setProfile(records.items.length > 0 ? (records.items[0] as unknown as UserProfile) : null);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [userId, fetchProfile]);

  const completeOnboarding = useCallback(
    async (displayName: string) => {
      if (!userId) return;
      try {
        // Check if a profile record already exists
        const existing = await pb.collection('user_profiles').getList(1, 1, {
          filter: `user_id = "${userId}"`,
        });
        let record;
        if (existing.items.length > 0) {
          record = await pb.collection('user_profiles').update(existing.items[0].id, {
            display_name: displayName.trim(),
            onboarding_complete: true,
          });
        } else {
          record = await pb.collection('user_profiles').create({
            user_id: userId,
            display_name: displayName.trim(),
            onboarding_complete: true,
          });
        }
        setProfile(record as unknown as UserProfile);
      } catch {
        // Silently fail
      }
    },
    [userId]
  );

  return { profile, loading, completeOnboarding };
}
