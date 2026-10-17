-- Netflix clone schema, transcribed from app_outline/database/erd.png (DrawSQL).
-- Tables, columns, types and relationships match the diagram as drawn.
-- Additions that don't change the design: UUID/timestamp defaults, FK indexes, RLS switched on.

-- Users
create table public.users (
  id         uuid primary key default gen_random_uuid(),
  name       varchar(100),
  email      varchar unique,                -- diagram marks email as unique
  created_at timestamptz default now()
);

-- movies
create table public.movies (
  id    uuid primary key default gen_random_uuid(),
  title varchar
);

-- Watchlists: users 1 ── * watchlists, movies ── watchlists
create table public.watchlists (
  id       uuid primary key default gen_random_uuid(),
  movie_id uuid references public.movies (id),
  user_id  uuid references public.users (id)
);

-- Postgres does not index foreign key columns automatically.
create index watchlists_movie_id_idx on public.watchlists (movie_id);
create index watchlists_user_id_idx  on public.watchlists (user_id);

-- Supabase exposes the public schema through its API, so RLS is on for every table.
-- No policies yet: with RLS on and no policy, the anon/authenticated roles see nothing.
-- Policies are listed as a recommendation, not decided here.
alter table public.users      enable row level security;
alter table public.movies     enable row level security;
alter table public.watchlists enable row level security;
