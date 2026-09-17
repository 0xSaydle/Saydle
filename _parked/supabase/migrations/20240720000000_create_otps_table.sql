-- Create otps table
CREATE TABLE IF NOT EXISTS public.otps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    otp TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS otps_user_id_idx ON public.otps (user_id);
CREATE INDEX IF NOT EXISTS otps_email_idx ON public.otps (email);
CREATE INDEX IF NOT EXISTS otps_otp_idx ON public.otps (otp);

-- Enable Row Level Security (RLS)
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin can manage all OTPs" ON public.otps
    FOR ALL
    USING (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

-- Allow the service role to manage OTPs
CREATE POLICY "Service role can manage all OTPs" ON public.otps
    FOR ALL
    USING (true);
    
-- Create a function to automatically delete expired OTPs
CREATE OR REPLACE FUNCTION public.delete_expired_otps()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM public.otps WHERE expires_at < CURRENT_TIMESTAMP;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically delete expired OTPs every hour
CREATE TRIGGER delete_expired_otps_trigger
    AFTER INSERT ON public.otps
    EXECUTE FUNCTION public.delete_expired_otps(); 