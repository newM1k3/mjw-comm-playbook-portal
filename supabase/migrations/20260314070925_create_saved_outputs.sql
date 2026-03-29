/*
  # Create saved_outputs table

  ## Summary
  Stores AI-generated tool outputs for authenticated users so they can retrieve past content.

  ## New Tables
  - `saved_outputs`
    - `id` (uuid, primary key)
    - `user_id` (uuid, FK to auth.users, cascade delete)
    - `tool_name` (text) — name of the tool that generated the output
    - `input_summary` (text, nullable) — brief summary of the user's input
    - `output_content` (text) — the full generated output
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Policy: authenticated users can SELECT, INSERT, UPDATE, DELETE their own rows only
*/

CREATE TABLE IF NOT EXISTS saved_outputs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_name text NOT NULL,
  input_summary text,
  output_content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_outputs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved outputs"
  ON saved_outputs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved outputs"
  ON saved_outputs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved outputs"
  ON saved_outputs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved outputs"
  ON saved_outputs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
