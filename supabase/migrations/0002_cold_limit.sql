/*
  # Add user insertion policy
  
  1. Changes
    - Add new RLS policy to allow users to insert their own profile data
  
  2. Security
    - Users can only insert rows where their auth.uid matches the row id
*/

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);