create table public.posts (
  id uuid not null default gen_random_uuid() primary key,
  created_at timestamp with time zone not null default now(),
  title text not null,
  user_id uuid references auth.users(id) default auth.uid()
);

-- Enable Row Level Security
alter table public.posts enable row level security;

-- Policy: Allow anyone to read posts
create policy "Public read access"
  on public.posts
  for select
  using (true);

-- Policy: Allow authenticated users to insert posts
create policy "Authenticated users can insert"
  on public.posts
  for insert
  to authenticated
  with check (true);
