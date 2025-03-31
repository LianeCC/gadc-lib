-- Add page completion columns to sessions table
ALTER TABLE public.sessions
ADD COLUMN IF NOT EXISTS bilan_page_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS bilan_page_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS bilan_questions_status JSONB,

ADD COLUMN IF NOT EXISTS manipulations_page_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS manipulations_page_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS manipulations_questions_status JSONB,

ADD COLUMN IF NOT EXISTS retours_page_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS retours_page_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS retours_questions_status JSONB,

ADD COLUMN IF NOT EXISTS outillage_page_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS outillage_page_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS outillage_questions_status JSONB,

ADD COLUMN IF NOT EXISTS intervenants_page_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS intervenants_page_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS intervenants_questions_status JSONB,

ADD COLUMN IF NOT EXISTS coherence_page_completed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS coherence_page_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS coherence_questions_status JSONB; 