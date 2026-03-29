/*
  # Create user_profiles table

  ## Purpose
  Stores per-user profile data including display name and onboarding status.

  ## New Tables
  - `user_profiles`
    - `id` (uuid, primary key)
    - `user_id` (uuid, foreign key to auth.users, unique)
    - `display_name` (text, nullable — set during onboarding)
    - `onboarding_complete` (boolean, default false)
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Policy: authenticated users can SELECT, INSERT, UPDATE, DELETE their own row only
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  display_name text,
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON user_profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
