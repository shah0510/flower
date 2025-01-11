/*
  # Fix profiles and orders relationship

  1. Changes
    - Add ON DELETE CASCADE to orders foreign key
    - Add missing indexes
    - Update RLS policies
*/

-- Drop existing foreign key
ALTER TABLE orders
  DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- Add new foreign key with CASCADE
ALTER TABLE orders
  ADD CONSTRAINT orders_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES profiles(id)
  ON DELETE CASCADE;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);