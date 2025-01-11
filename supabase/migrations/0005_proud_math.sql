/*
  # Add profiles table and update schema

  1. New Tables
    - `profiles` table for user profiles
      - `id` (uuid, primary key) - matches auth.users id
      - `email` (text, unique)
      - `full_name` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes
    - Update orders table to reference profiles instead of users
    - Add RLS policies for profiles table
*/

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Update orders foreign key
ALTER TABLE orders
  DROP CONSTRAINT orders_user_id_fkey,
  ADD CONSTRAINT orders_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES profiles(id);

-- Create trigger for updated_at
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();