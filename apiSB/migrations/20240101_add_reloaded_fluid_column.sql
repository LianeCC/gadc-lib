-- Add new column for reloaded fluid in maintenance
ALTER TABLE bilan
ADD COLUMN manip_old_fluid_reloaded_in_maintenance_qty NUMERIC; 