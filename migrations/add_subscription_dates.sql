-- Add subscription date columns
ALTER TABLE users
ADD COLUMN date_of_subscription TIMESTAMP WITH TIME ZONE,
ADD COLUMN next_billing_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN plan_duration INTEGER NOT NULL DEFAULT 30; -- Default to 30 days for BASIC plan
 
-- Add comment to explain the columns
COMMENT ON COLUMN users.date_of_subscription IS 'When the user started their current subscription';
COMMENT ON COLUMN users.next_billing_date IS 'When the user''s subscription will renew';
COMMENT ON COLUMN users.plan_duration IS 'Duration of the subscription plan in days'; 