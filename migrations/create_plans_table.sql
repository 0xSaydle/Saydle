-- Create plans table
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    duration INTEGER NOT NULL,
    features JSONB NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert monthly plan
INSERT INTO plans (name, duration, features, price) VALUES (
    'Monthly',
    30,
    '[
        "Unlimited access to all features",
        "Personalized daily affirmations",
        "Progress tracking",
        "Community support",
        "Basic meditation guides"
    ]'::jsonb,
    9.99
);

-- Insert yearly plan
INSERT INTO plans (name, duration, features, price) VALUES (
    'Yearly',
    365,
    '[
        "Everything in Monthly plan",
        "Advanced meditation guides",
        "Priority support",
        "Exclusive workshops",
        "Early access to new features"
    ]'::jsonb,
    99.99
);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_plans_updated_at
    BEFORE UPDATE ON plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 