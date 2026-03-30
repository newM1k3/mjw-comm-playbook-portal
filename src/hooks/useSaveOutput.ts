import { useState, useCallback } from 'react';
import { pb } from '../lib/pocketbase';
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

    try {
      await pb.collection('saved_outputs').create({
        user_id: user.id,
        tool_name: toolName,
        output_content: outputContent,
        input_summary: inputSummary ?? null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      // Silently fail — saving output is non-critical
    }
  }, [user]);

  return { saveOutput, saved };
}
