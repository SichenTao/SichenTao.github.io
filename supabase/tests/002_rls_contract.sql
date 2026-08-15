begin;

create extension if not exists pgtap with schema extensions;
select plan(14);

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '40000000-0000-4000-8000-000000000001',
    'authenticated', 'authenticated', 'rls-owner@example.test', '', now(),
    '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '40000000-0000-4000-8000-000000000002',
    'authenticated', 'authenticated', 'rls-other@example.test', '', now(),
    '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, now(), now()
  );

insert into public.learning_items (
  id, application_id, item_type, slug, title, visibility, published_at
)
values (
  '30000000-0000-4000-8000-000000000002',
  '10000000-0000-4000-8000-000000000001',
  'article',
  'rls-private-item',
  'Private RLS test',
  'private',
  now()
);

set local role anon;
select is((select count(*) from public.applications where slug = 'youtube-learner'), 1::bigint, 'anonymous can read active applications');
select is((select count(*) from public.plans where plan_key = 'free'), 1::bigint, 'anonymous can read active public plans');
select is((select count(*) from public.learning_items where slug = 'platform-welcome'), 1::bigint, 'anonymous can read published public learning items');
select throws_ok(
  $$insert into public.webhook_events (provider_event_id, event_type, payload_sha256) values ('evt_forbidden', 'test', repeat('a', 64))$$,
  '42501',
  null,
  'anonymous cannot write the webhook ledger'
);
reset role;

select set_config('request.jwt.claim.sub', '40000000-0000-4000-8000-000000000001', true);
select set_config('request.jwt.claim.role', 'authenticated', true);
set local role authenticated;

select is((select count(*) from public.profiles), 1::bigint, 'authenticated user sees only own profile');
select lives_ok(
  $$insert into public.learning_progress (user_id, learning_item_id, completion_ratio) values ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', 0.25)$$,
  'user can write own progress for an accessible item'
);
select is((select count(*) from public.learning_progress), 1::bigint, 'user reads own progress');
select throws_ok(
  $$insert into public.learning_progress (user_id, learning_item_id) values ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000002')$$,
  '42501',
  null,
  'user cannot write progress for an inaccessible item'
);
select throws_ok(
  $$insert into public.memberships (application_id, user_id) values ('10000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001')$$,
  '42501',
  null,
  'user cannot grant own membership'
);
select lives_ok(
  $$insert into public.consents (user_id, application_id, consent_type, policy_version) values ('40000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000001', 'terms', '2026-08-15')$$,
  'user can record own consent'
);
select lives_ok(
  $$update public.consents set revoked_at = now() where user_id = '40000000-0000-4000-8000-000000000001' and consent_type = 'terms'$$,
  'user can revoke own consent once'
);
select throws_ok(
  $$delete from public.consents where user_id = '40000000-0000-4000-8000-000000000001'$$,
  '42501',
  null,
  'user cannot delete consent history'
);
select is((select count(*) from public.subscriptions), 0::bigint, 'user sees no subscription owned by another account');
reset role;

select ok(
  not has_table_privilege('anon', 'public.webhook_events', 'INSERT'),
  'anonymous role has no webhook insert grant'
);

select * from finish();
rollback;
