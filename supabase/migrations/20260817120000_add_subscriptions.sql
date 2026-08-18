-- Recurring subscription billing (monthly maintenance retainers).
--
-- Stripe is the source of truth for subscription state and payment collection;
-- this table mirrors it for fast admin queries and to attach business metadata
-- (which client, which project, internal memo).
--
-- Flow: admin creates a Checkout Session (mode=subscription) -> client enters
-- payment details once -> Stripe creates the subscription and charges it
-- automatically every period. The webhook keeps this table in sync.

-- ─── invoices: link recurring invoices back to their subscription ────────────
-- Stripe generates subscription invoices on its own schedule. Without this we
-- can't tell a one-off invoice from the 7th month of a retainer.

alter table public.invoices
  add column stripe_subscription_id text;

create index idx_invoices_stripe_subscription_id
  on public.invoices(stripe_subscription_id)
  where stripe_subscription_id is not null;

-- ─── subscriptions ───────────────────────────────────────────────────────────

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,

  -- Stripe identifiers. All null until the client completes checkout.
  stripe_subscription_id text unique,
  stripe_price_id text,
  stripe_checkout_session_id text,
  checkout_url text,                          -- hosted link to send the client

  -- Business fields
  description text not null,                  -- e.g. "HerdLife maintenance"
  amount_cents bigint not null check (amount_cents > 0),
  currency text not null default 'usd',
  billing_interval text not null default 'month'
    check (billing_interval in ('day', 'week', 'month', 'year')),
  interval_count integer not null default 1 check (interval_count > 0),

  -- Lifecycle — mirrors Stripe's subscription.status values, plus 'incomplete'
  -- as our local pre-checkout state.
  status text not null default 'incomplete'
    check (status in (
      'incomplete',
      'incomplete_expired',
      'trialing',
      'active',
      'past_due',
      'canceled',
      'unpaid',
      'paused'
    )),

  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  started_at timestamptz,
  canceled_at timestamptz,

  memo text,                                  -- internal note; never sent

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_subscriptions_client_id on public.subscriptions(client_id);
create index idx_subscriptions_project_id on public.subscriptions(project_id);
create index idx_subscriptions_status on public.subscriptions(status);
create index idx_subscriptions_created_at on public.subscriptions(created_at desc);
create index idx_subscriptions_checkout_session
  on public.subscriptions(stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ─── Row Level Security ──────────────────────────────────────────────────────
-- Admin-only app: authenticated (Erik) has full access, anon has none,
-- service-role bypasses RLS for the webhook.

alter table public.subscriptions enable row level security;

create policy "Authenticated users have full access to subscriptions"
  on public.subscriptions for all
  to authenticated
  using (true) with check (true);
