-- Clients: one record per customer, with jobs hanging off it, so repeat customers
-- (e.g. Lisa, two jobs) show once with their history and lifetime value.
create table public.books_clients (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references public.books_orgs(id) on delete cascade,
  business_id uuid references public.books_businesses(id) on delete set null,
  name        text not null,
  company     text,
  phone       text,
  email       text,
  address     text,
  notes       text,
  created_at  timestamptz not null default now()
);
create index idx_books_clients_org on public.books_clients(org_id, name);

alter table public.books_jobs add column client_id uuid references public.books_clients(id) on delete set null;
alter table public.books_jobs add column title text;   -- "Garage cleanout", "HerdLife app"
create index idx_books_jobs_client on public.books_jobs(client_id);

alter table public.books_clients enable row level security;
create policy "members: clients" on public.books_clients for all to authenticated
  using (public.books_is_member(org_id)) with check (public.books_is_member(org_id));
