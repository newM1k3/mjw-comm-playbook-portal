/*
  # Fix RLS policy performance on user_progress

  1. Changes
    - Drops the existing "Users can manage own progress" FOR ALL policy
    - Recreates it as 4 separate policies (SELECT, INSERT, UPDATE, DELETE)
    - Uses `(select auth.uid())` instead of `auth.uid()` to prevent per-row
      re-evaluation and improve query performance at scale
*/

DROP POLICY IF EXISTS "Users can manage own progress" ON public.user_progress;

CREATE POLICY "Users can view own progress"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own progress"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own progress"
  ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own progress"
  ON public.user_progress
  FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));
