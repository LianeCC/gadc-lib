-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sessions table
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status VARCHAR NOT NULL CHECK (status IN ('IN_PROGRESS', 'SAVED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create company table
CREATE TABLE company (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    siret VARCHAR(14),
    name VARCHAR,
    address VARCHAR,
    address_complement VARCHAR,
    postal_code VARCHAR(5),
    city VARCHAR,
    phone VARCHAR(10),
    mobile VARCHAR(10),
    email VARCHAR,
    certification_body VARCHAR,
    certification_login VARCHAR,
    certification_password VARCHAR,
    trackdechet_login VARCHAR,
    trackdechet_password VARCHAR,
    has_stock BOOLEAN DEFAULT false,
    had_stock_lastyear BOOLEAN DEFAULT false,
    has_manipulated BOOLEAN DEFAULT false,
    has_bought BOOLEAN DEFAULT false,
    is_selling BOOLEAN DEFAULT false,
    has_td BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create responses table
CREATE TABLE responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    step_id VARCHAR NOT NULL,
    question_id VARCHAR NOT NULL,
    response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, step_id, question_id)
);

-- Create uploaded_files table
CREATE TABLE uploaded_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    step_id VARCHAR NOT NULL,
    original_name VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL,
    file_size INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_sessions_updated_at
    BEFORE UPDATE ON sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_updated_at
    BEFORE UPDATE ON company
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create cleanup function for old files
CREATE OR REPLACE FUNCTION cleanup_old_files()
RETURNS void AS $$
BEGIN
    DELETE FROM uploaded_files
    WHERE created_at < NOW() - INTERVAL '2 months';
END;
$$ LANGUAGE plpgsql; 