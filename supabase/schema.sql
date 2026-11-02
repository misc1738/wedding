create table if not exists public.rsvps (
  id uuid primary key,
  reference text not null unique,
  submitted_at timestamptz not null default now(),
  name text not null,
  contact text not null,
  attending text not null check (attending in ('yes', 'no')),
  guests integer not null default 0 check (guests between 0 and 6),
  guest_names text not null default '',
  meal text not null default '',
  dietary text not null default '',
  song text not null default '',
  note text not null default ''
);

alter table public.rsvps add column if not exists guest_names text not null default '';
alter table public.rsvps add column if not exists dietary text not null default '';

alter table public.rsvps enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.rsvps to public;
grant select, delete on table public.rsvps to authenticated;

drop policy if exists "Anyone can submit an RSVP" on public.rsvps;
create policy "Anyone can submit an RSVP"
  on public.rsvps for insert
  to public
  with check (true);

drop policy if exists "Admins can read RSVPs" on public.rsvps;
create policy "Admins can read RSVPs"
  on public.rsvps for select
  to authenticated
  using (true);

drop policy if exists "Admins can delete RSVPs" on public.rsvps;
create policy "Admins can delete RSVPs"
  on public.rsvps for delete
  to authenticated
  using (true);
