create extension if not exists "uuid-ossp";

create table if not exists public.bilan (
  bilan_uid uuid primary key default uuid_generate_v4(),
  session_id uuid not null references public.sessions(id),
  fluid_id uuid not null references public.fluid(id),
  bilan_qty_new_last_year decimal(10,2) not null default 0,
  bilan_qty_old_last_year decimal(10,2) not null default 0,
  manip_new_fluid_loaded_in_maintenance_qty decimal(10,2) not null default 0,
  manip_new_fluid_loaded_in_new_qty decimal(10,2) not null default 0,
  manip_old_fluid_retrieved_in_maintenance_qty decimal(10,2) not null default 0,
  manip_old_fluid_retrieved_in_dismantling_qty decimal(10,2) not null default 0,
  bought_qty_this_year_fr decimal(10,2) not null default 0,
  bought_qty_this_year_eu decimal(10,2) not null default 0,
  bought_qty_this_year_non_eu decimal(10,2) not null default 0,
  returned_qty_this_year_on_td decimal(10,2) not null default 0,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add partial unique constraint for non-deleted records
create unique index bilan_session_fluid_unique_idx on public.bilan (session_id, fluid_id) where (is_deleted = false);

-- Add trigger to update updated_at
create trigger bilan_updated_at
  before update on public.bilan
  for each row
  execute function update_updated_at_column(); 