-- Add new columns to the distributor table
ALTER TABLE public.distributor
ADD COLUMN type text NOT NULL DEFAULT 'distributeur',
ADD COLUMN nom_contact text,
ADD COLUMN email_contact text,
ADD COLUMN tel_contact text;

-- Add check constraint for type field
ALTER TABLE public.distributor
ADD CONSTRAINT distributor_type_check CHECK (type IN ('distributeur', 'site_retour'));

-- Update existing records to have type = 'distributeur'
UPDATE public.distributor SET type = 'distributeur' WHERE type IS NULL; 