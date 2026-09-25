-- Resale of goods the business already paid WA sales tax on (e.g. a laptop bought for
-- a client and billed at cost): deducted from the retail sales tax line as
-- "tax paid at source". It still counts toward Retailing B&O.
alter table public.books_income add column tax_paid_at_source numeric(12,2) not null default 0;
