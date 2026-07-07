-- AviLab admin backend schema.
-- Run this once in the Supabase project's SQL editor (or via `supabase db push`).

create extension if not exists pgcrypto;

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('ai', 'web', 'mobile', 'design', 'enterprise')),
  title_uz text not null,
  title_ru text not null,
  title_en text not null,
  description_uz text,
  description_ru text,
  description_en text,
  stack text[] not null default '{}',
  project_url text,
  video_url text,
  video_path text,
  thumbnail_url text,
  thumbnail_path text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolio_items_published_sort_idx
  on public.portfolio_items (published, sort_order);

-- Accessed exclusively through the service-role key from server-side code
-- (see src/backend/), so no anon-facing RLS policies are defined here.
alter table public.portfolio_items enable row level security;

-- Public storage bucket for uploaded thumbnails/videos.
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists "Public read portfolio-media" on storage.objects;
create policy "Public read portfolio-media"
  on storage.objects for select
  using (bucket_id = 'portfolio-media');

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  experience text,
  stack text[] not null default '{}',
  image_url text,
  image_path text,
  linkedin_url text,
  github_url text,
  twitter_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_published_sort_idx
  on public.team_members (published, sort_order);

alter table public.team_members enable row level security;

create table if not exists public.team_moments (
  id uuid primary key default gen_random_uuid(),
  caption text,
  image_url text,
  image_path text,
  video_url text,
  video_path text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_moments_published_sort_idx
  on public.team_moments (published, sort_order);

alter table public.team_moments enable row level security;

-- Shared public storage bucket for team member photos and team moment media.
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "Public read site-media" on storage.objects;
create policy "Public read site-media"
  on storage.objects for select
  using (bucket_id = 'site-media');

-- Singleton row holding the 16:9 "about the company" video shown on the homepage.
create table if not exists public.company_video (
  id uuid primary key default gen_random_uuid(),
  video_url text,
  video_path text,
  updated_at timestamptz not null default now()
);

alter table public.company_video enable row level security;
