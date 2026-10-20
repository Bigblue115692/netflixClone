-- Netflix clone schema, as applied to Supabase.
-- Based on app_outline/database/erd.png (DrawSQL), with Supabase Auth added:
-- public.users is the profile table for auth.users, and every user-owned row
-- belongs to the signed-in user through auth.uid(). The app never sends a user id.
--
-- Not created here: public.rls_auto_enable() and its ensure_rls event trigger.
-- They come from the project's "auto-enable RLS" setting.

-- Users: one profile per Supabase Auth user, created by the sign-up trigger below.
create table public.users (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       varchar(100),
  email      varchar unique,                -- diagram marks email as unique
  created_at timestamptz not null default now()
);

-- Creates the profile when someone signs up.
-- The front end passes name in signUp({ options: { data: { name } } }).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

-- Only the trigger should run this, never a client through the API.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- movies: shared catalogue with no owner.
create table public.movies (
  id    uuid primary key default gen_random_uuid(),
  title varchar
);

-- Watchlists: users 1 ── * watchlists, movies ── watchlists.
-- user_id is filled from the signed-in user's token, never sent by the app.
create table public.watchlists (
  id       uuid primary key default gen_random_uuid(),
  movie_id uuid not null references public.movies (id) on delete cascade,
  user_id  uuid not null default auth.uid() references public.users (id) on delete cascade,
  unique (user_id, movie_id)
);

-- The unique (user_id, movie_id) index already covers lookups by user_id.
-- Postgres doesn't index foreign keys on its own, so movie_id gets an index.
create index watchlists_movie_id_idx on public.watchlists (movie_id);

-- Row level security. Every policy is for signed-in users only; anon sees nothing.
alter table public.users      enable row level security;
alter table public.movies     enable row level security;
alter table public.watchlists enable row level security;

-- users: each person can see and edit only their own profile.
-- No insert policy: the sign-up trigger creates the row.
-- No delete policy: deleting the auth user removes the profile.
create policy "Users can view their own profile"
  on public.users for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.users for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Email comes from Auth, so users may only change their name.
revoke update on public.users from authenticated;
grant update (name) on public.users to authenticated;

-- movies: read-only catalogue for signed-in users.
-- Add movies from the dashboard or SQL editor, which bypass RLS.
create policy "Signed-in users can view movies"
  on public.movies for select
  to authenticated
  using (true);

-- watchlists: users see, add and remove only their own rows.
-- No update policy: the app only adds and removes.
create policy "Users can view their own watchlist"
  on public.watchlists for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add to their own watchlist"
  on public.watchlists for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can remove from their own watchlist"
  on public.watchlists for delete
  to authenticated
  using ((select auth.uid()) = user_id);
