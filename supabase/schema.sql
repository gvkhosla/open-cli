create extension if not exists pgcrypto;

create table if not exists public.builder_launches (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  creator text not null,
  creator_url text,
  tagline text not null,
  install_command text not null,
  href text not null,
  released text not null default 'New',
  package_name text,
  github_repo text,
  stars bigint,
  monthly_downloads bigint,
  published_at timestamptz,
  status text not null default 'approved',
  source text not null default 'manual',
  audit_score integer,
  created_at timestamptz not null default now()
);

alter table public.builder_launches add column if not exists status text not null default 'approved';
alter table public.builder_launches add column if not exists source text not null default 'manual';
alter table public.builder_launches add column if not exists audit_score integer;

create table if not exists public.launch_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  creator text not null,
  creator_url text,
  tagline text not null,
  install_command text not null,
  href text not null,
  released text not null default 'New',
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
