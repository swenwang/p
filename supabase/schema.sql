-- Run this once in the Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  eyebrow text not null default '',
  summary text not null default '',
  content jsonb not null default '{}'::jsonb,
  cover_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  collection text not null check (collection in ('experience','award','skill','gallery')),
  title text not null,
  data jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.content_items enable row level security;

create policy "Public can read site settings" on public.site_settings for select using (true);
create policy "Public can read published projects" on public.projects for select using (published = true);
create policy "Public can read published content" on public.content_items for select using (published = true);

-- Replace the email below before running these administrator policies.
create policy "Admin manages site settings" on public.site_settings for all
using ((auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com')
with check ((auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com');
create policy "Admin manages projects" on public.projects for all
using ((auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com')
with check ((auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com');
create policy "Admin manages content" on public.content_items for all
using ((auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com')
with check ((auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com');

insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

create policy "Public can view portfolio media" on storage.objects for select
using (bucket_id = 'portfolio-media');
create policy "Admin uploads portfolio media" on storage.objects for all
using (bucket_id = 'portfolio-media' and (auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com')
with check (bucket_id = 'portfolio-media' and (auth.jwt() ->> 'email') = 'YOUR_EMAIL@example.com');
