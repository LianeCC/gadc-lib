-- Add boolean flags to track data presence
ALTER TABLE public.bilan
ADD COLUMN data_for_bilan boolean NOT NULL DEFAULT false,
ADD COLUMN data_for_manip boolean NOT NULL DEFAULT false,
ADD COLUMN data_for_buy boolean NOT NULL DEFAULT false,
ADD COLUMN data_for_return boolean NOT NULL DEFAULT false; 