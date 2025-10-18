create table public.posts (
  id uuid not null default gen_random_uuid() primary key,
  created_at timestamp with time zone not null default now(),
  title text not null,
  user_id uuid references auth.users(id) default auth.uid()
);
