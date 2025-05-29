
-- Update users table to use user_id as primary key
-- First, ensure user_id is unique and not null
UPDATE users SET user_id = 'AU' || LPAD((ROW_NUMBER() OVER (ORDER BY created_at))::text, 5, '0') 
WHERE user_id IS NULL OR user_id = '';

-- Add unique constraint to user_id
ALTER TABLE users ADD CONSTRAINT users_user_id_unique UNIQUE (user_id);

-- Remove old primary key constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey;

-- Add new primary key
ALTER TABLE users ADD PRIMARY KEY (user_id);

-- Update related tables to reference user_id instead of id
-- Update wallets table
ALTER TABLE wallets DROP CONSTRAINT IF EXISTS wallets_user_id_fkey;
ALTER TABLE wallets ADD CONSTRAINT wallets_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

-- Update stk_wallets table  
ALTER TABLE stk_wallets DROP CONSTRAINT IF EXISTS stk_wallets_user_id_fkey;
ALTER TABLE stk_wallets ADD CONSTRAINT stk_wallets_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

-- Reset all balances to 0
UPDATE wallets SET main_balance = 0, topup_balance = 0;
UPDATE stk_wallets SET total_balance = 0, locked_balance = 0, unlocked_balance = 0;
