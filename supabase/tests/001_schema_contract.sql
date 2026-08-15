begin;

create extension if not exists pgtap with schema extensions;
select plan(40);

select has_table('public', 'profiles');
select has_table('public', 'applications');
select has_table('public', 'memberships');
select has_table('public', 'consents');
select has_table('public', 'audit_events');
select has_table('public', 'billing_customers');
select has_table('public', 'plans');
select has_table('public', 'subscriptions');
select has_table('public', 'entitlements');
select has_table('public', 'webhook_events');
select has_table('public', 'learning_items');
select has_table('public', 'learning_progress');
select has_table('public', 'bookmarks');
select has_table('public', 'notes');
select has_table('public', 'content_assets');

select ok(c.relrowsecurity and c.relforcerowsecurity, c.relname || ' has forced RLS')
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in (
    'profiles', 'applications', 'memberships', 'consents', 'audit_events',
    'billing_customers', 'plans', 'subscriptions', 'entitlements', 'webhook_events',
    'learning_items', 'learning_progress', 'bookmarks', 'notes', 'content_assets'
  )
order by c.relname;

select has_function('public', 'platform_is_application_member');
select has_function('public', 'platform_has_entitlement');
select has_function('public', 'platform_can_access_learning_item');
select has_function('public', 'platform_can_access_content_asset');
select has_function('public', 'platform_claim_webhook_event');
select has_function('public', 'platform_fail_webhook_event');
select has_function('public', 'platform_complete_webhook_event');
select has_function('public', 'platform_ensure_membership');
select has_function('public', 'platform_apply_stripe_subscription_event');

select ok(
  exists (select 1 from storage.buckets where id = 'platform-private' and not public),
  'private content bucket exists and is not public'
);

select * from finish();
rollback;
