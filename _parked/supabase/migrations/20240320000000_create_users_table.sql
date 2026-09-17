-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    image TEXT,
    phone_number TEXT,
    date_of_birth DATE,
    gender TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    postal_code TEXT,
    -- Professional Information
    job_title TEXT,
    company TEXT,
    experience_years INTEGER,
    -- Arrays for multiple values
    strengths TEXT[],
    weaknesses TEXT[],
    good_habits TEXT[],
    bad_habits TEXT[],
    interests TEXT[],
    -- JSONB for complex education data
    education JSONB,
    verified BOOLEAN DEFAULT false,
    last_sign_in TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users (email);
CREATE INDEX IF NOT EXISTS users_phone_idx ON public.users (phone_number);
CREATE INDEX IF NOT EXISTS users_job_title_idx ON public.users (job_title);
CREATE INDEX IF NOT EXISTS users_company_idx ON public.users (company);
CREATE INDEX IF NOT EXISTS users_education_idx ON public.users USING GIN (education);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Allow inserts for new users
CREATE POLICY "Allow inserts for new users" ON public.users
    FOR INSERT
    WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at(); 