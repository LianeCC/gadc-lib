-- Enable moddatetime extension
CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;

-- Create distributor table
CREATE TABLE IF NOT EXISTS public.distributor (
  distributor_uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.sessions(id),
  nom TEXT NOT NULL,
  ville TEXT NOT NULL,
  distrib_siret TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Add trigger to update updated_at
CREATE TRIGGER distributor_updated_at
  BEFORE UPDATE ON public.distributor
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 