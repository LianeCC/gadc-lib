-- Create brands table
create table if not exists public.tool_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create models table with relationships to brands and tool types
create table if not exists public.tool_models (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.tool_brands(id),
  name text not null,
  tool_type text not null,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(brand_id, name, tool_type)
);

-- Add triggers for updated_at
create trigger tool_brands_updated_at
  before update on public.tool_brands
  for each row
  execute function update_updated_at_column();

create trigger tool_models_updated_at
  before update on public.tool_models
  for each row
  execute function update_updated_at_column();

-- Modify tools table to use foreign keys
alter table public.tools
  drop column brand,
  drop column model,
  add column brand_id uuid not null references public.tool_brands(id),
  add column model_id uuid not null references public.tool_models(id);

-- Insert some common brands
insert into public.tool_brands (name) values
  ('TESTO'),
  ('MASTERCOOL'),
  ('INFICON'),
  ('ROTHENBERGER'),
  ('CPS'),
  ('FIELDPIECE'),
  ('REFCO'),
  ('WIGAM'),
  ('PROMAX'),
  ('ROBINAIR')
on conflict (name) do nothing;

-- Insert models for each brand and tool type
-- We'll do this in a separate transaction after getting the brand IDs
do $$
declare
  testo_id uuid;
  mastercool_id uuid;
  inficon_id uuid;
  rothenberger_id uuid;
  cps_id uuid;
begin
  -- Get brand IDs
  select id into testo_id from tool_brands where name = 'TESTO';
  select id into mastercool_id from tool_brands where name = 'MASTERCOOL';
  select id into inficon_id from tool_brands where name = 'INFICON';
  select id into rothenberger_id from tool_brands where name = 'ROTHENBERGER';
  select id into cps_id from tool_brands where name = 'CPS';

  -- Insert models
  -- TESTO models
  insert into tool_models (brand_id, name, tool_type) values
    (testo_id, '550', 'manomètre'),
    (testo_id, '557', 'manomètre'),
    (testo_id, '560', 'manomètre'),
    (testo_id, '570', 'manomètre');

  -- MASTERCOOL models
  insert into tool_models (brand_id, name, tool_type) values
    (mastercool_id, '98210-A', 'balance'),
    (mastercool_id, '98210-B', 'balance'),
    (mastercool_id, '98230', 'balance');

  -- INFICON models
  insert into tool_models (brand_id, name, tool_type) values
    (inficon_id, 'D-TEK Stratus', 'détecteur de fuite'),
    (inficon_id, 'D-TEK 3', 'détecteur de fuite'),
    (inficon_id, 'D-TEK Select', 'détecteur de fuite');

  -- ROTHENBERGER models
  insert into tool_models (brand_id, name, tool_type) values
    (rothenberger_id, 'ROKLIMA MULTI 4F', 'station de récupération'),
    (rothenberger_id, 'ROREC Pro Digital', 'station de récupération');

  -- CPS models
  insert into tool_models (brand_id, name, tool_type) values
    (cps_id, 'TR600', 'balance'),
    (cps_id, 'CC800', 'balance');
end $$; 