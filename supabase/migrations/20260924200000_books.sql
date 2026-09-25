-- ─── J&E Books ───────────────────────────────────────────────────────────────
-- Bookkeeping + WA excise tax prep for J&E Partners LLC (Junk in the Trunk and
-- Elma Digital). Lives in this database to avoid another paid project; every
-- table is prefixed books_ and scoped to an org so it can move out (or serve
-- other businesses) later.
--
-- Access: unlike the CRM tables, being logged in is NOT enough. A user must be
-- listed in books_members for the org. Money data stays members-only.

create extension if not exists pgcrypto;

-- ─── Orgs & membership ──────────────────────────────────────────────────────

create table public.books_orgs (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,                       -- "J&E Partners LLC"
  ubi           text,
  ein           text,
  dor_frequency text not null default 'quarterly' check (dor_frequency in ('monthly', 'quarterly', 'annual')),
  created_at    timestamptz not null default now()
);

create table public.books_members (
  org_id     uuid not null references public.books_orgs(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null default 'owner' check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);

-- security definer so policies can check membership without recursing into
-- books_members' own policy.
create or replace function public.books_is_member(org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.books_members m where m.org_id = org and m.user_id = auth.uid());
$$;

-- The trade names an org operates under (DBAs).
create table public.books_businesses (
  id         uuid primary key default gen_random_uuid(),
  org_id     uuid not null references public.books_orgs(id) on delete cascade,
  name       text not null,                          -- "Junk in the Trunk"
  kind       text not null check (kind in ('junk_removal', 'software', 'other')),
  created_at timestamptz not null default now()
);

-- ─── Jobs (quotes → work → what it actually cost) ───────────────────────────

create table public.books_jobs (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references public.books_orgs(id) on delete cascade,
  business_id   uuid references public.books_businesses(id) on delete set null,
  customer      text not null,
  address       text,
  job_date      date,
  status        text not null default 'quote' check (status in ('quote', 'scheduled', 'done', 'cancelled')),
  quote         jsonb not null default '{}'::jsonb,  -- estimator inputs, so the quote can be reopened
  quoted_total  numeric(12,2),
  notes         text,
  created_at    timestamptz not null default now()
);

-- ─── Income ─────────────────────────────────────────────────────────────────
-- One row per payment. Imported rows (Square, Stripe) are idempotent on
-- (org, source, external_id). Amounts are in dollars, 2 decimals.
--   gross      what the customer paid, including any tax collected
--   sales_tax  WA retail sales tax collected (Elma Digital, since Oct 2025)
--   refuse_tax WA solid waste collection tax collected (junk removal, 3.6%)
--   refunded   amount later refunded
--   fees       processor fees (Square/Stripe) — an expense, not a deduction from gross

create table public.books_income (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references public.books_orgs(id) on delete cascade,
  business_id   uuid references public.books_businesses(id) on delete set null,
  source        text not null check (source in ('square', 'stripe', 'cash', 'check', 'manual')),
  external_id   text,
  occurred_at   timestamptz not null,
  customer      text,
  description   text,
  gross         numeric(12,2) not null,
  sales_tax     numeric(12,2) not null default 0,
  refuse_tax    numeric(12,2) not null default 0,
  refunded      numeric(12,2) not null default 0,
  fees          numeric(12,2) not null default 0,
  tax_class     text check (tax_class in ('refuse_collection', 'service_other', 'retailing', 'not_income')),
  location_code text,                               -- WA sales tax location code (retailing only)
  job_id        uuid references public.books_jobs(id) on delete set null,
  reviewed      boolean not null default false,     -- a person confirmed business + tax class
  raw           jsonb,
  created_at    timestamptz not null default now(),
  unique (org_id, source, external_id)
);
create index idx_books_income_org_date on public.books_income(org_id, occurred_at desc);

-- ─── Expenses ───────────────────────────────────────────────────────────────

create table public.books_expenses (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references public.books_orgs(id) on delete cascade,
  business_id  uuid references public.books_businesses(id) on delete set null,
  occurred_on  date,
  vendor       text,
  amount       numeric(12,2),
  sales_tax    numeric(12,2),
  category     text,                                 -- see lib/categories.ts
  paid_with    text check (paid_with in ('personal_card', 'business_account', 'cash', 'other')),
  job_id       uuid references public.books_jobs(id) on delete set null,
  receipt_path text,                                 -- object path in the books-receipts bucket
  status       text not null default 'needs_review' check (status in ('needs_review', 'confirmed')),
  ai           jsonb,                                -- what the receipt reader returned, kept for audit
  notes        text,
  created_by   uuid references auth.users(id) on delete set null,
  created_at   timestamptz not null default now()
);
create index idx_books_expenses_org_date on public.books_expenses(org_id, occurred_on desc);

-- ─── Mileage ────────────────────────────────────────────────────────────────

create table public.books_trips (
  id          uuid primary key default gen_random_uuid(),
  org_id      uuid not null references public.books_orgs(id) on delete cascade,
  business_id uuid references public.books_businesses(id) on delete set null,
  occurred_on date not null,
  miles       numeric(8,1) not null check (miles > 0),
  purpose     text not null,
  job_id      uuid references public.books_jobs(id) on delete set null,
  odo_start   integer,
  odo_end     integer,
  created_at  timestamptz not null default now()
);
create index idx_books_trips_org_date on public.books_trips(org_id, occurred_on desc);

-- ─── Filings (what was actually filed, frozen) ──────────────────────────────

create table public.books_filings (
  id           uuid primary key default gen_random_uuid(),
  org_id       uuid not null references public.books_orgs(id) on delete cascade,
  kind         text not null default 'wa_excise',
  period       text not null,                        -- "2026-Q3"
  due_on       date not null,
  status       text not null default 'open' check (status in ('open', 'filed')),
  filed_on     date,
  confirmation text,
  amount_paid  numeric(12,2),
  snapshot     jsonb,                                -- the worksheet numbers at filing time
  created_at   timestamptz not null default now(),
  unique (org_id, kind, period)
);

-- ─── Row Level Security: members only ───────────────────────────────────────

alter table public.books_orgs       enable row level security;
alter table public.books_members    enable row level security;
alter table public.books_businesses enable row level security;
alter table public.books_jobs       enable row level security;
alter table public.books_income     enable row level security;
alter table public.books_expenses   enable row level security;
alter table public.books_trips      enable row level security;
alter table public.books_filings    enable row level security;

create policy "members read their org" on public.books_orgs
  for select to authenticated using (public.books_is_member(id));
create policy "members see their memberships" on public.books_members
  for select to authenticated using (user_id = auth.uid());

create policy "members: businesses" on public.books_businesses for all to authenticated
  using (public.books_is_member(org_id)) with check (public.books_is_member(org_id));
create policy "members: jobs" on public.books_jobs for all to authenticated
  using (public.books_is_member(org_id)) with check (public.books_is_member(org_id));
create policy "members: income" on public.books_income for all to authenticated
  using (public.books_is_member(org_id)) with check (public.books_is_member(org_id));
create policy "members: expenses" on public.books_expenses for all to authenticated
  using (public.books_is_member(org_id)) with check (public.books_is_member(org_id));
create policy "members: trips" on public.books_trips for all to authenticated
  using (public.books_is_member(org_id)) with check (public.books_is_member(org_id));
create policy "members: filings" on public.books_filings for all to authenticated
  using (public.books_is_member(org_id)) with check (public.books_is_member(org_id));

-- ─── Receipt photos: private bucket, folder per org ─────────────────────────
-- Object names are "<org_id>/<yyyy>/<uuid>.<ext>".

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('books-receipts', 'books-receipts', false, 20971520,
        array['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp', 'application/pdf'])
on conflict (id) do nothing;

create policy "members read receipts" on storage.objects for select to authenticated
  using (bucket_id = 'books-receipts' and public.books_is_member(((storage.foldername(name))[1])::uuid));
create policy "members upload receipts" on storage.objects for insert to authenticated
  with check (bucket_id = 'books-receipts' and public.books_is_member(((storage.foldername(name))[1])::uuid));
create policy "members delete receipts" on storage.objects for delete to authenticated
  using (bucket_id = 'books-receipts' and public.books_is_member(((storage.foldername(name))[1])::uuid));

-- ─── Seed: J&E Partners LLC ─────────────────────────────────────────────────

with org as (
  insert into public.books_orgs (name, ubi, ein, dor_frequency)
  values ('J&E Partners LLC', '605-972-358', '39-4557816', 'quarterly')
  returning id
)
insert into public.books_businesses (org_id, name, kind)
select id, 'Junk in the Trunk', 'junk_removal' from org
union all
select id, 'Elma Digital', 'software' from org;

-- Erik is the first member (same login as the Elma Digital admin).
insert into public.books_members (org_id, user_id, role)
select o.id, u.id, 'owner'
from public.books_orgs o, auth.users u
where o.name = 'J&E Partners LLC' and u.email = 'erikjbahena@gmail.com';
