-- Add new columns for regularization
ALTER TABLE bilan
ADD COLUMN regul_achatHorsUE NUMERIC,
ADD COLUMN regul_charge_maintenance NUMERIC,
ADD COLUMN regul_recup_maintenance NUMERIC,
ADD COLUMN regul_reintroduit_maintenance NUMERIC; 