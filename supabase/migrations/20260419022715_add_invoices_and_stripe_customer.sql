-- Stripe invoices + per-client Stripe customer mapping.
-- Stripe is the source of truth for payment state; this table mirrors it
-- for fast admin queries and to attach business metadata (like project_id).

-- ─── clients: add stripe_customer_id ──────────────────────────────────────────

alter table public.clients
  add column stripe_customer_id text unique;

create index idx_clients_stripe_customer_id
  on public.clients(stripe_customer_id)
  where stripe_customer_id is not null;

-- ─── invoices ─────────────────────────────────────────────────────────────────
-- One row per Stripe invoice we've created on behalf of a client.

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete restrict,
  project_id uuid references public.projects(id) on delete set null,

  -- Stripe identifiers & URLs (null while draft hasn't been synced yet)
  stripe_invoice_id text unique,
  stripe_hosted_invoice_url text,
  stripe_invoice_pdf text,

  -- Business fields
  description text,                          -- short label shown on the invoice
  line_items jsonb not null default '[]'::jsonb,
    -- [{ description: string, amount_cents: number, quantity: number }]
  amount_total_cents bigint not null default 0,
  currency text not null default 'usd',

  -- Lifecycle — mirrors Stripe's invoice.status values
  status text not null default 'draft'
    check (status in (
      'draft',
      'open',
      'paid',
      'uncollectible',
      'void'
    )),

  due_date date,
  sent_at timestamptz,
  paid_at timestamptz,

  memo text,                                 -- internal note; not sent to client

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_invoices_client_id on public.invoices(client_id);
create index idx_invoices_project_id on public.invoices(project_id);
create index idx_invoices_status on public.invoices(status);
create index idx_invoices_created_at on public.invoices(created_at desc);

create trigger invoices_set_updated_at
  before update on public.invoices
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table public.invoices enable row level security;

create policy "Authenticated users have full access to invoices"
  on public.invoices for all
  to authenticated
  using (true) with check (true);
