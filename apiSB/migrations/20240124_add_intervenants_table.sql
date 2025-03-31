-- Create trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create intervenants table
CREATE TABLE IF NOT EXISTS public.intervenants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id TEXT NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  attestation_type TEXT NOT NULL CHECK (attestation_type IN ('I', 'II', 'III', 'IV', 'V')),
  attestation_number TEXT NOT NULL,
  attestation_date DATE NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  created_by TEXT NOT NULL CHECK (created_by IN ('OCR', 'MANUAL')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE
);

-- Add trigger to update updated_at column
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON public.intervenants
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_timestamp(); 