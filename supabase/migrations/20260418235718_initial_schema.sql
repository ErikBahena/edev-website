-- Elma Digital :: Initial Schema
-- Tables: clients, projects, interactions
-- Auth: single-user admin (Erik). RLS locks tables to authenticated users only.

-- ─── Helpers ──────────────────────────────────────────────────────────────────

-- Auto-update `updated_at` on row changes
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── clients ──────────────────────────────────────────────────────────────────

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,                         -- contact person name
  business_name text not null,                -- company / business name
  email text,
  phone text,
  city text,
  state text,
  industry text,
  first_contacted_at timestamptz,
  status text not null default 'lead'
    check (status in ('lead', 'active', 'completed', 'on_hold', 'churned')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_clients_status on public.clients(status);
create index idx_clients_business_name on public.clients(business_name);

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- ─── projects ─────────────────────────────────────────────────────────────────

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  status text not null default 'scoping'
    check (status in ('scoping', 'in_progress', 'completed', 'maintenance', 'paused', 'cancelled')),
  start_date date,
  completion_date date,
  project_fee_cents bigint,                   -- one-time project fee (cents)
  monthly_fee_cents bigint,                   -- recurring monthly fee (cents)
  tech_stack text[],
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_projects_client_id on public.projects(client_id);
create index idx_projects_status on public.projects(status);

create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ─── interactions ─────────────────────────────────────────────────────────────

create table public.interactions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  type text not null
    check (type in ('call', 'email', 'meeting', 'text', 'work', 'note')),
  occurred_at timestamptz not null default now(),
  summary text not null,
  notes text,
  created_at timestamptz not null default now()
);

create index idx_interactions_client_id on public.interactions(client_id);
create index idx_interactions_project_id on public.interactions(project_id);
create index idx_interactions_occurred_at on public.interactions(occurred_at desc);

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Admin-only app: every authenticated user (i.e. Erik) has full access.
-- Anon users have zero access. Service-role bypasses RLS automatically.

alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.interactions enable row level security;

create policy "Authenticated users have full access to clients"
  on public.clients for all
  to authenticated
  using (true) with check (true);

create policy "Authenticated users have full access to projects"
  on public.projects for all
  to authenticated
  using (true) with check (true);

create policy "Authenticated users have full access to interactions"
  on public.interactions for all
  to authenticated
  using (true) with check (true);
