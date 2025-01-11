/*
  # Add Order Details Columns

  1. Changes
    - Add payment_method column to orders table
    - Add shipping_address column to orders table (JSONB for flexible address storage)
    - Add order_items column to orders table (JSONB array for item details)

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'cod',
ADD COLUMN IF NOT EXISTS shipping_address JSONB NOT NULL,
ADD COLUMN IF NOT EXISTS order_items JSONB NOT NULL;

-- Update existing RLS policies to include new columns
DROP POLICY IF EXISTS "Users can create own orders" ON orders;
CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Add a policy for updating order status
CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());