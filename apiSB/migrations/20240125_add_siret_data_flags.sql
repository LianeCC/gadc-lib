-- Add SIRET data flags to company table
ALTER TABLE public.company
ADD COLUMN siret_data_availableintd boolean,
ADD COLUMN siret_data_confirmed boolean,
ADD COLUMN readonly_fields text[]; 