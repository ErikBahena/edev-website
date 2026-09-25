-- The IRS standard mileage rate only applies to a vehicle you own or lease.
-- Trips in someone else's truck are kept (job cost, pricing) but not deducted per mile;
-- what was actually paid for it (gas, rental) is an expense instead.
alter table public.books_trips
  add column vehicle text not null default 'own' check (vehicle in ('own', 'borrowed'));
