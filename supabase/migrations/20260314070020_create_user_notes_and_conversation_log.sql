/*
  # Create user_notes and conversation_log tables

  ## Summary
  Adds two tables to persist user data across devices, replacing localStorage.

  ## New Tables

  ### user_notes
  - `id` (uuid, primary key) - unique identifier
  - `user_id` (uuid, FK to auth.users) - owner of the notes
  - `content` (text) - the note body, defaults to empty string
  - `updated_at` (timestamptz) - last save timestamp

  One row per user (upserted on save).

  ### conversation_log
  - `id` (uuid, primary key) - unique identifier
  - `user_id` (uuid, FK to auth.users) - owner of the entry
  - `entry` (text, NOT NULL) - JSON-serialized log entry object
  - `created_at` (timestamptz) - when the entry was created

  Multiple rows per user (one per log entry).

  ## Security
  - RLS enabled on both tables
  - Policies restrict all operations to the authenticated row owner via auth.uid()
*/

CREATE TABLE IF NOT EXISTS user_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own notes"
  ON user_notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON user_notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON user_notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON user_notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS conversation_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  entry text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE conversation_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own log"
  ON conversation_log FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own log"
  ON conversation_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own log"
  ON conversation_log FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own log"
  ON conversation_log FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
