import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export function useSaveOutput() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const saveOutput = useCallback(async (
    toolName: string,
    outputContent: string,
    inputSummary?: string
  ) => {
    if (!user) return;

    const { error } = await supabase.from('saved_outputs').insert({
      user_id: user.id,
      tool_name: toolName,
      output_content: outputContent,
      input_summary: inputSummary ?? null,
    });

    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }, [user]);

  return { saveOutput, saved };
}
