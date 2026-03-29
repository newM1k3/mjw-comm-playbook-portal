/*
  # Create user_progress table

  1. New Tables
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `chapter_id` (text, the chapter identifier)
      - `completed` (boolean, default false)
      - `completed_at` (timestamptz, when completed)
      - `created_at` (timestamptz, default now())
      - Unique constraint on (user_id, chapter_id)

  2. Security
    - Enable RLS on `user_progress` table
    - Add policy for authenticated users to manage their own progress
*/

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_id text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, chapter_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
