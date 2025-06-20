/*
  # Create users table for Unveil authentication

 1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `digest_opt_in` (boolean, default false)
      - `is_campus_user` (boolean, default false)
      - `joined_at` (timestamp, default now())
      - `updated_at` (timestamp, default now())
 - `topics` (text[], nullable)

  2. Security
 - Enable RLS on `users` table
 - Add policy for users to read/write their own data only
    - Add policy for service role to read digest opt-in users

  3. Functions
    - Auto-update `updated_at` timestamp on row changes
    - Auto-detect campus users based on email domain
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  digest_opt_in boolean DEFAULT false,
  is_campus_user boolean DEFAULT false,
  joined_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  topics text[] NULL
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy for service role to read digest opt-in users
CREATE POLICY "Service role can read digest users"
  ON users
  FOR SELECT
  TO service_role
  USING (digest_opt_in = true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-detect campus users
CREATE OR REPLACE FUNCTION set_campus_user_flag()
RETURNS TRIGGER AS $$
BEGIN
  NEW.is_campus_user = (NEW.email LIKE '%@iith.ac.in');
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-set campus user flag
CREATE TRIGGER set_campus_user_flag_trigger
  BEFORE INSERT OR UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION set_campus_user_flag();