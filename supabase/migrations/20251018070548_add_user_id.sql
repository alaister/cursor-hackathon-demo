alter table "public"."posts" add column "user_id" uuid default auth.uid();

alter table "public"."posts" add constraint "posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."posts" validate constraint "posts_user_id_fkey";


