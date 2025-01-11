/*
  # Update Orders Schema

  1. Changes
    - Add sequence for order numbers
    - Add tracking columns for orders
    - Update RLS policies

  2. Security
    - Maintain existing RLS policies
    - Add policy for order status updates
*/

-- Create sequence first
CREATE SEQUENCE IF NOT EXISTS order_seq START 1;

-- Add tracking columns to orders
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS order_number TEXT UNIQUE NOT NULL DEFAULT 'ORD-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(NEXTVAL('order_seq')::TEXT, 6, '0'),
ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS delivery_status TEXT NOT NULL DEFAULT 'processing',
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT UNIQUE;

-- Update RLS policies
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create own orders" ON orders;
CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own orders" ON orders;
CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());