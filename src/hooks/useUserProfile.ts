import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

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
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', uid)
      .maybeSingle();
    setProfile(data ?? null);
    setLoading(false);
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
      const { data } = await supabase
        .from('user_profiles')
        .upsert(
          { user_id: userId, display_name: displayName.trim(), onboarding_complete: true },
          { onConflict: 'user_id' }
        )
        .select()
        .maybeSingle();
      if (data) setProfile(data);
    },
    [userId]
  );

  return { profile, loading, completeOnboarding };
}
