alter table "public"."posts" enable row level security;

create policy "Authenticated users can insert"
on "public"."posts"
as permissive
for insert
to authenticated
with check (true);


create policy "Public read access"
on "public"."posts"
as permissive
for select
to public
using (true);



