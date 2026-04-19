-- Change invoices.client_id FK from ON DELETE RESTRICT to ON DELETE CASCADE.
-- Deleting a client should take their local invoice mirror with it; Stripe
-- retains its own records, so we don't lose accounting history — just the
-- local cache. The client delete confirm dialog is enough friction.

alter table public.invoices
  drop constraint invoices_client_id_fkey;

alter table public.invoices
  add constraint invoices_client_id_fkey
  foreign key (client_id)
  references public.clients(id)
  on delete cascade;
