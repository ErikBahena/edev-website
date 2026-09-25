-- Retail sales tax is owed at the customer's location rate on the taxable amount,
-- whether or not it was collected. Store the rate DOR's lookup returned with the code.
alter table public.books_income add column location_rate numeric(6,4);
