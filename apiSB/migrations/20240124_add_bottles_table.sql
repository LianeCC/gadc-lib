create table if not exists public.bottles (
  id bigserial primary key,
  session_id uuid not null references public.sessions(id),
  designation text not null,
  fluid_id uuid not null references public.fluid(id),
  type text not null check (type in ('Neuf', 'Récupéré')),
  poids_brut decimal(5,2) not null check (poids_brut <= 50),
  tare decimal(5,2) not null check (tare <= 50),
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add trigger to update updated_at
create trigger bottles_updated_at
  before update on public.bottles
  for each row
  execute function update_updated_at_column(); 