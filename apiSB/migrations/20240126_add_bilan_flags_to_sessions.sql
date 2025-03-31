-- Add flags for tracking question status and page completion in sessions table
ALTER TABLE public.sessions
  -- Question flags
  ADD COLUMN bilan_questions_status JSONB DEFAULT '{}',
  
  -- Page completion flags with timestamps
  ADD COLUMN bilan_page_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN bilan_page_completed_at TIMESTAMPTZ,
  ADD COLUMN manipulations_page_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN manipulations_page_completed_at TIMESTAMPTZ,
  ADD COLUMN retours_page_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN retours_page_completed_at TIMESTAMPTZ,
  ADD COLUMN outillage_page_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN outillage_page_completed_at TIMESTAMPTZ,
  ADD COLUMN intervenants_page_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN intervenants_page_completed_at TIMESTAMPTZ,
  ADD COLUMN coherence_page_completed BOOLEAN DEFAULT FALSE,
  ADD COLUMN coherence_page_completed_at TIMESTAMPTZ; 