create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id),
  designation text not null,
  tool_type text not null,
  brand text not null, -- Brand name of the tool
  model text not null, -- Model name of the tool
  serial_number text not null,
  distributor_name text,
  distributor_siret text,
  created_by text not null check (created_by in ('OCR', 'MANUAL')),
  is_verified boolean not null default false,
  last_control_date date,
  next_control_date date,
  is_compliant boolean,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add trigger to update updated_at
create trigger tools_updated_at
  before update on public.tools
  for each row
  execute function update_updated_at_column(); 