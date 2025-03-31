-- Add new columns to company table
ALTER TABLE company ADD COLUMN IF NOT EXISTS name VARCHAR;
ALTER TABLE company ADD COLUMN IF NOT EXISTS siret VARCHAR(14);

-- Address fields
ALTER TABLE company ADD COLUMN IF NOT EXISTS address VARCHAR;
ALTER TABLE company ADD COLUMN IF NOT EXISTS address_complement VARCHAR;
ALTER TABLE company ADD COLUMN IF NOT EXISTS postal_code VARCHAR(5);
ALTER TABLE company ADD COLUMN IF NOT EXISTS city VARCHAR;

-- Contact fields
ALTER TABLE company ADD COLUMN IF NOT EXISTS phone VARCHAR(10);
ALTER TABLE company ADD COLUMN IF NOT EXISTS mobile VARCHAR(10);
ALTER TABLE company ADD COLUMN IF NOT EXISTS email VARCHAR;

-- Service access fields
ALTER TABLE company ADD COLUMN IF NOT EXISTS certification_body VARCHAR CHECK (certification_body IN ('SOCOTEC', 'CEMAFROID', 'Bureau Veritas', 'Qualiclimafroid', 'Certi Kôntrol', 'AFNOR', 'DEKRA'));
ALTER TABLE company ADD COLUMN IF NOT EXISTS certification_login VARCHAR;
ALTER TABLE company ADD COLUMN IF NOT EXISTS certification_password VARCHAR;
ALTER TABLE company ADD COLUMN IF NOT EXISTS trackdechet_login VARCHAR;
ALTER TABLE company ADD COLUMN IF NOT EXISTS trackdechet_password VARCHAR; 