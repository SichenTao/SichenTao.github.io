-- Local-development seed. Paid pricing remains inactive until a real Stripe Price ID is set.

insert into public.applications (id, slug, name, description, status, settings)
values (
  '10000000-0000-4000-8000-000000000001',
  'youtube-learner',
  'YouTube Learner',
  'Video learning, transcripts, bookmarks, notes, and reusable paid access.',
  'active',
  '{"default_locale":"en","seed":true}'::jsonb
)
on conflict (slug) do update
set name = excluded.name,
    description = excluded.description,
    status = excluded.status,
    settings = excluded.settings;

insert into public.plans (
  id,
  application_id,
  plan_key,
  name,
  description,
  currency,
  unit_amount,
  billing_interval,
  provider_price_id,
  entitlement_keys,
  active,
  metadata
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001',
    'free',
    'Free',
    'Public reader and basic learning progress.',
    'usd',
    0,
    null,
    null,
    array['reader.basic'],
    true,
    '{"seed":true}'::jsonb
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000001',
    'premium_monthly',
    'Premium Monthly',
    'Template only. Set price and Stripe Price ID before activation.',
    'usd',
    1200,
    'month',
    null,
    array['learner.premium', 'transcript.full', 'ebook.download'],
    false,
    '{"seed":true,"requires_price_review":true}'::jsonb
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-000000000001',
    'premium_annual',
    'Premium Annual',
    'Template only. Review annual pricing and set a Stripe Price ID before activation.',
    'usd',
    12000,
    'year',
    null,
    array['learner.premium', 'transcript.full', 'ebook.download'],
    false,
    '{"seed":true,"requires_price_review":true}'::jsonb
  )
on conflict (application_id, plan_key) do update
set name = excluded.name,
    description = excluded.description,
    currency = excluded.currency,
    unit_amount = excluded.unit_amount,
    billing_interval = excluded.billing_interval,
    entitlement_keys = excluded.entitlement_keys,
    active = excluded.active,
    metadata = excluded.metadata;

insert into public.learning_items (
  id,
  application_id,
  item_type,
  slug,
  title,
  summary,
  visibility,
  published_at,
  metadata
)
values (
  '30000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000001',
  'article',
  'platform-welcome',
  'Platform welcome',
  'A harmless public record used by local RLS and API tests.',
  'public',
  '2026-08-15T00:00:00Z',
  '{"seed":true}'::jsonb
)
on conflict (application_id, slug) do update
set title = excluded.title,
    summary = excluded.summary,
    visibility = excluded.visibility,
    published_at = excluded.published_at,
    metadata = excluded.metadata;
