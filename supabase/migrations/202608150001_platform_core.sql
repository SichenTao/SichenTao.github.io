-- Reusable identity, billing, and learning platform kernel.
-- This migration is intentionally independent from any single frontend.

create extension if not exists pgcrypto with schema extensions;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(display_name) between 1 and 120),
  avatar_url text check (avatar_url is null or char_length(avatar_url) <= 2048),
  locale text not null default 'en' check (locale ~ '^[a-z]{2,3}(-[A-Z]{2})?$'),
  timezone text not null default 'UTC' check (char_length(timezone) between 1 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 120),
  description text check (description is null or char_length(description) <= 1000),
  status text not null default 'active' check (status in ('draft', 'active', 'archived')),
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  status text not null default 'active' check (status in ('invited', 'active', 'suspended', 'revoked')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, user_id),
  check (ends_at is null or ends_at > starts_at)
);

create table public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  application_id uuid references public.applications(id) on delete cascade,
  consent_type text not null check (consent_type ~ '^[a-z0-9_]{2,80}$'),
  policy_version text not null check (char_length(policy_version) between 1 and 40),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  source text not null default 'web' check (source in ('web', 'mobile', 'api', 'import', 'admin')),
  ip_hash text check (ip_hash is null or char_length(ip_hash) <= 128),
  user_agent_hash text check (user_agent_hash is null or char_length(user_agent_hash) <= 128),
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  check (revoked_at is null or revoked_at >= granted_at)
);

create table public.audit_events (
  id bigint generated always as identity primary key,
  application_id uuid references public.applications(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  actor_type text not null check (actor_type in ('user', 'service', 'system', 'webhook')),
  action text not null check (action ~ '^[a-z0-9_.-]{2,120}$'),
  subject_type text not null check (subject_type ~ '^[a-z0-9_.-]{2,120}$'),
  subject_id text check (subject_id is null or char_length(subject_id) <= 200),
  request_id text check (request_id is null or char_length(request_id) <= 128),
  details jsonb not null default '{}'::jsonb check (jsonb_typeof(details) = 'object'),
  created_at timestamptz not null default now()
);

create table public.billing_customers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_customer_id text not null unique check (char_length(provider_customer_id) between 3 and 255),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, user_id, provider)
);

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  plan_key text not null check (plan_key ~ '^[a-z0-9]+(?:_[a-z0-9]+)*$'),
  name text not null check (char_length(name) between 1 and 120),
  description text check (description is null or char_length(description) <= 1000),
  currency text not null default 'usd' check (currency ~ '^[a-z]{3}$'),
  unit_amount bigint not null default 0 check (unit_amount >= 0),
  billing_interval text check (billing_interval is null or billing_interval in ('day', 'week', 'month', 'year')),
  interval_count integer not null default 1 check (interval_count between 1 and 36),
  provider_price_id text unique check (provider_price_id is null or char_length(provider_price_id) between 3 and 255),
  entitlement_keys text[] not null default '{}'::text[],
  active boolean not null default false,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, plan_key),
  check (
    (unit_amount = 0 and billing_interval is null)
    or (unit_amount > 0 and billing_interval is not null)
  )
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  billing_customer_id uuid not null references public.billing_customers(id) on delete restrict,
  plan_id uuid not null references public.plans(id) on delete restrict,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_subscription_id text not null unique check (char_length(provider_subscription_id) between 3 and 255),
  status text not null check (
    status in ('trialing', 'active', 'past_due', 'paused', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid')
  ),
  provider_event_created_at timestamptz not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  trial_end timestamptz,
  canceled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    current_period_end is null
    or current_period_start is null
    or current_period_end >= current_period_start
  )
);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  entitlement_key text not null check (entitlement_key ~ '^[a-z0-9]+(?:[._-][a-z0-9]+)*$'),
  source text not null check (source in ('subscription', 'purchase', 'grant', 'migration')),
  source_ref text not null check (char_length(source_ref) between 1 and 255),
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, user_id, entitlement_key, source, source_ref),
  check (expires_at is null or expires_at > starts_at),
  check (revoked_at is null or revoked_at >= starts_at)
);

create table public.webhook_events (
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_event_id text not null check (char_length(provider_event_id) between 3 and 255),
  event_type text not null check (char_length(event_type) between 1 and 160),
  payload_sha256 text not null check (payload_sha256 ~ '^[0-9a-f]{64}$'),
  status text not null default 'processing' check (status in ('processing', 'processed', 'failed')),
  attempts integer not null default 1 check (attempts >= 1),
  last_error text check (last_error is null or char_length(last_error) <= 2000),
  received_at timestamptz not null default now(),
  last_attempt_at timestamptz not null default now(),
  processed_at timestamptz,
  primary key (provider, provider_event_id)
);

create table public.learning_items (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  parent_id uuid references public.learning_items(id) on delete set null,
  item_type text not null check (item_type in ('course', 'lesson', 'video', 'article', 'resource')),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 300),
  summary text check (summary is null or char_length(summary) <= 4000),
  visibility text not null default 'public' check (visibility in ('public', 'members', 'premium', 'private')),
  required_entitlement text check (
    required_entitlement is null
    or required_entitlement ~ '^[a-z0-9]+(?:[._-][a-z0-9]+)*$'
  ),
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  published_at timestamptz,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, slug),
  check (visibility <> 'premium' or required_entitlement is not null)
);

create table public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  learning_item_id uuid not null references public.learning_items(id) on delete cascade,
  position_seconds integer not null default 0 check (position_seconds >= 0),
  completion_ratio numeric(5,4) not null default 0 check (completion_ratio between 0 and 1),
  completed_at timestamptz,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, learning_item_id)
);

create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  learning_item_id uuid not null references public.learning_items(id) on delete cascade,
  position_seconds integer check (position_seconds is null or position_seconds >= 0),
  label text check (label is null or char_length(label) <= 240),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique nulls not distinct (user_id, learning_item_id, position_seconds)
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  learning_item_id uuid not null references public.learning_items(id) on delete cascade,
  position_seconds integer check (position_seconds is null or position_seconds >= 0),
  body text not null check (char_length(body) between 1 and 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_assets (
  id uuid primary key default gen_random_uuid(),
  learning_item_id uuid not null references public.learning_items(id) on delete cascade,
  asset_key text not null check (asset_key ~ '^[a-z0-9]+(?:[._-][a-z0-9]+)*$'),
  bucket_id text not null default 'platform-private' check (char_length(bucket_id) between 1 and 100),
  object_path text not null check (
    char_length(object_path) between 1 and 1024
    and object_path !~ '(^|/)\.\.(/|$)'
    and object_path !~ '^/'
  ),
  mime_type text not null check (char_length(mime_type) between 3 and 120),
  byte_size bigint check (byte_size is null or byte_size >= 0),
  sha256 text check (sha256 is null or sha256 ~ '^[0-9a-f]{64}$'),
  access_level text not null default 'inherit' check (access_level in ('inherit', 'public', 'members', 'premium', 'private')),
  required_entitlement text check (
    required_entitlement is null
    or required_entitlement ~ '^[a-z0-9]+(?:[._-][a-z0-9]+)*$'
  ),
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (learning_item_id, asset_key),
  unique (bucket_id, object_path),
  check (access_level <> 'premium' or required_entitlement is not null)
);

create index memberships_user_status_idx on public.memberships (user_id, status);
create index consents_user_type_idx on public.consents (user_id, consent_type, granted_at desc);
create index audit_events_actor_created_idx on public.audit_events (actor_user_id, created_at desc);
create index audit_events_application_created_idx on public.audit_events (application_id, created_at desc);
create index subscriptions_user_status_idx on public.subscriptions (user_id, status);
create index subscriptions_customer_idx on public.subscriptions (billing_customer_id);
create index entitlements_user_active_idx on public.entitlements (user_id, application_id, entitlement_key, expires_at)
  where revoked_at is null;
create index webhook_events_status_attempt_idx on public.webhook_events (status, last_attempt_at);
create index learning_items_application_published_idx on public.learning_items (application_id, published_at desc)
  where published_at is not null;
create index learning_progress_user_seen_idx on public.learning_progress (user_id, last_seen_at desc);
create index bookmarks_user_created_idx on public.bookmarks (user_id, created_at desc);
create index notes_user_created_idx on public.notes (user_id, created_at desc);
create index content_assets_learning_item_idx on public.content_assets (learning_item_id, active);

create or replace function public.platform_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.platform_set_updated_at();
create trigger applications_set_updated_at before update on public.applications
for each row execute function public.platform_set_updated_at();
create trigger memberships_set_updated_at before update on public.memberships
for each row execute function public.platform_set_updated_at();
create trigger billing_customers_set_updated_at before update on public.billing_customers
for each row execute function public.platform_set_updated_at();
create trigger plans_set_updated_at before update on public.plans
for each row execute function public.platform_set_updated_at();
create trigger subscriptions_set_updated_at before update on public.subscriptions
for each row execute function public.platform_set_updated_at();
create trigger entitlements_set_updated_at before update on public.entitlements
for each row execute function public.platform_set_updated_at();
create trigger learning_items_set_updated_at before update on public.learning_items
for each row execute function public.platform_set_updated_at();
create trigger learning_progress_set_updated_at before update on public.learning_progress
for each row execute function public.platform_set_updated_at();
create trigger bookmarks_set_updated_at before update on public.bookmarks
for each row execute function public.platform_set_updated_at();
create trigger notes_set_updated_at before update on public.notes
for each row execute function public.platform_set_updated_at();
create trigger content_assets_set_updated_at before update on public.content_assets
for each row execute function public.platform_set_updated_at();

create or replace function public.platform_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (user_id, display_name, avatar_url, locale)
  values (
    new.id,
    nullif(left(coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''), 120), ''),
    nullif(left(coalesce(new.raw_user_meta_data ->> 'avatar_url', ''), 2048), ''),
    case
      when coalesce(new.raw_user_meta_data ->> 'locale', '') ~ '^[a-z]{2,3}(-[A-Z]{2})?$'
        then new.raw_user_meta_data ->> 'locale'
      else 'en'
    end
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger platform_on_auth_user_created
after insert on auth.users
for each row execute function public.platform_handle_new_user();

insert into public.profiles (user_id, display_name, avatar_url, locale)
select
  u.id,
  nullif(left(coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', ''), 120), ''),
  nullif(left(coalesce(u.raw_user_meta_data ->> 'avatar_url', ''), 2048), ''),
  case
    when coalesce(u.raw_user_meta_data ->> 'locale', '') ~ '^[a-z]{2,3}(-[A-Z]{2})?$'
      then u.raw_user_meta_data ->> 'locale'
    else 'en'
  end
from auth.users u
on conflict (user_id) do nothing;

create or replace function public.platform_guard_consent_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.user_id is distinct from new.user_id
    or old.application_id is distinct from new.application_id
    or old.consent_type is distinct from new.consent_type
    or old.policy_version is distinct from new.policy_version
    or old.granted_at is distinct from new.granted_at
    or old.source is distinct from new.source
    or old.ip_hash is distinct from new.ip_hash
    or old.user_agent_hash is distinct from new.user_agent_hash
    or old.metadata is distinct from new.metadata
    or old.created_at is distinct from new.created_at
  then
    raise exception 'Consent records are append-only; only revoked_at may change.';
  end if;

  if old.revoked_at is not null or new.revoked_at is null or new.revoked_at < old.granted_at or new.revoked_at > now() then
    raise exception 'Invalid consent revocation.';
  end if;

  return new;
end;
$$;

create trigger consents_guard_update before update on public.consents
for each row execute function public.platform_guard_consent_update();

-- The bucket remains private. Files are delivered only through the signed URL Edge Function.
insert into storage.buckets (id, name, public, file_size_limit)
values ('platform-private', 'platform-private', false, 104857600)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit;

comment on table public.applications is 'Reusable registry of products that share this platform kernel.';
comment on table public.webhook_events is 'Payload-free Stripe idempotency ledger; stores hashes and processing state.';
comment on table public.content_assets is 'Metadata for private learning files. Storage paths never imply authorization.';
