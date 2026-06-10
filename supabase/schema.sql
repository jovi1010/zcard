-- supabase/schema.sql
-- ZCard table for TAP / zcard.ca
-- Run in Supabase SQL editor

create table if not exists zcards (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  title           text,
  company         text,
  tagline         text,
  avatar          text,
  cover           text,
  actions         jsonb not null default '[]',
  socials         jsonb default '[]',
  bio             text,
  tally_form_id   text,
  tier            text not null default 'core' check (tier in ('core', 'pro', 'premium')),
  accent_color    text,
  dark_mode       boolean not null default true,
  active          boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger zcards_updated_at
  before update on zcards
  for each row execute procedure update_updated_at();

-- Index for slug lookups
create index if not exists zcards_slug_idx on zcards (slug);
create index if not exists zcards_active_idx on zcards (active);

-- Row Level Security
alter table zcards enable row level security;

-- Public read for active cards only
create policy "Public read active cards"
  on zcards for select
  using (active = true);

-- Service role has full access (used by getCard server-side)
