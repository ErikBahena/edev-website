-- Quotes: a job with status 'quote' carries its inputs in books_jobs.quote (jsonb, already
-- there). These columns link it to the Square invoice sent for it, so the payment can be
-- matched back to the job on import.
alter table public.books_jobs add column square_order_id text;
alter table public.books_jobs add column square_invoice_id text;
alter table public.books_jobs add column square_invoice_url text;
alter table public.books_jobs add column sent_at timestamptz;
create index idx_books_jobs_square_order on public.books_jobs(square_order_id);

-- Per-org defaults for the quote builder (labor rate, mileage rate, dump fee per load…).
alter table public.books_orgs add column settings jsonb not null default '{}'::jsonb;
create policy "members update their org" on public.books_orgs
  for update to authenticated using (public.books_is_member(id)) with check (public.books_is_member(id));
