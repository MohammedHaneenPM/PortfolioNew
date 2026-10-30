-- ==============================================================================
-- HUE SOLUTIONS CANDIDATE ASSESSMENT: PHASE 5 MIGRATION
-- Adds Idempotency, Rate Limiting, and Email Tracking to meetings table
-- ==============================================================================

-- 1. Add idempotency_key, ip_address, and admin error logging columns
ALTER TABLE public.meetings 
ADD COLUMN IF NOT EXISTS idempotency_key TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS ip_address TEXT,
ADD COLUMN IF NOT EXISTS admin_email_error TEXT,
ADD COLUMN IF NOT EXISTS visitor_email_error TEXT;

-- 2. Create index on email and preferred_date to prevent rapid duplicate requests
CREATE INDEX IF NOT EXISTS idx_meetings_email_date ON public.meetings (email, preferred_date);
CREATE INDEX IF NOT EXISTS idx_meetings_ip_created ON public.meetings (ip_address, created_at DESC);

-- 3. Rate limiting and spam protection function (checks max 3 requests per hour per IP)
CREATE OR REPLACE FUNCTION public.check_meeting_rate_limit(p_ip_address TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  IF p_ip_address IS NULL OR p_ip_address = '' THEN
    RETURN TRUE;
  END IF;

  SELECT COUNT(*) INTO recent_count
  FROM public.meetings
  WHERE ip_address = p_ip_address
    AND created_at >= (timezone('utc'::text, now()) - INTERVAL '1 hour');

  IF recent_count >= 5 THEN
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
