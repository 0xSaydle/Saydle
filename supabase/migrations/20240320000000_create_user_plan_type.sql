-- Create enum type for user plans
CREATE TYPE user_plan AS ENUM ('weekly', 'monthly');
 
-- Add plan column to users table if it doesn't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS plan user_plan DEFAULT 'monthly'; 