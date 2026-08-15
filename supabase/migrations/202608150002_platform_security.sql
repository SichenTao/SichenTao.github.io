-- Default-deny Row Level Security (RLS) and least-privilege grants.

create or replace function public.platform_is_application_member(
  p_application_id uuid,
  p_roles text[] default null
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.memberships m
    where m.application_id = p_application_id
      and m.user_id = auth.uid()
      and m.status = 'active'
      and m.starts_at <= now()
      and (m.ends_at is null or m.ends_at > now())
      and (p_roles is null or m.role = any (p_roles))
  );
$$;

create or replace function public.platform_has_entitlement(
  p_application_id uuid,
  p_entitlement_key text
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.entitlements e
    where e.application_id = p_application_id
      and e.user_id = auth.uid()
      and e.entitlement_key = p_entitlement_key
      and e.starts_at <= now()
      and (e.expires_at is null or e.expires_at > now())
      and e.revoked_at is null
  );
$$;

create or replace function public.platform_can_access_learning_item(p_learning_item_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((
    select
      li.published_at is not null
      and li.published_at <= now()
      and case li.visibility
        when 'public' then true
        when 'members' then public.platform_is_application_member(li.application_id)
        when 'premium' then public.platform_has_entitlement(li.application_id, li.required_entitlement)
        when 'private' then public.platform_is_application_member(li.application_id, array['owner', 'admin'])
        else false
      end
    from public.learning_items li
    where li.id = p_learning_item_id
  ), false);
$$;

create or replace function public.platform_can_access_content_asset(p_content_asset_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((
    select
      ca.active
      and li.published_at is not null
      and li.published_at <= now()
      and case ca.access_level
        when 'inherit' then public.platform_can_access_learning_item(li.id)
        when 'public' then true
        when 'members' then public.platform_is_application_member(li.application_id)
        when 'premium' then public.platform_has_entitlement(li.application_id, ca.required_entitlement)
        when 'private' then public.platform_is_application_member(li.application_id, array['owner', 'admin'])
        else false
      end
    from public.content_assets ca
    join public.learning_items li on li.id = ca.learning_item_id
    where ca.id = p_content_asset_id
  ), false);
$$;

revoke all on function public.platform_is_application_member(uuid, text[]) from public;
revoke all on function public.platform_has_entitlement(uuid, text) from public;
revoke all on function public.platform_can_access_learning_item(uuid) from public;
revoke all on function public.platform_can_access_content_asset(uuid) from public;
grant execute on function public.platform_is_application_member(uuid, text[]) to anon, authenticated, service_role;
grant execute on function public.platform_has_entitlement(uuid, text) to anon, authenticated, service_role;
grant execute on function public.platform_can_access_learning_item(uuid) to anon, authenticated, service_role;
grant execute on function public.platform_can_access_content_asset(uuid) to anon, authenticated, service_role;

alter table public.profiles enable row level security;
alter table public.applications enable row level security;
alter table public.memberships enable row level security;
alter table public.consents enable row level security;
alter table public.audit_events enable row level security;
alter table public.billing_customers enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.entitlements enable row level security;
alter table public.webhook_events enable row level security;
alter table public.learning_items enable row level security;
alter table public.learning_progress enable row level security;
alter table public.bookmarks enable row level security;
alter table public.notes enable row level security;
alter table public.content_assets enable row level security;

alter table public.profiles force row level security;
alter table public.applications force row level security;
alter table public.memberships force row level security;
alter table public.consents force row level security;
alter table public.audit_events force row level security;
alter table public.billing_customers force row level security;
alter table public.plans force row level security;
alter table public.subscriptions force row level security;
alter table public.entitlements force row level security;
alter table public.webhook_events force row level security;
alter table public.learning_items force row level security;
alter table public.learning_progress force row level security;
alter table public.bookmarks force row level security;
alter table public.notes force row level security;
alter table public.content_assets force row level security;

create policy profiles_select_own on public.profiles
for select to authenticated
using (user_id = auth.uid());
create policy profiles_update_own on public.profiles
for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy applications_read_active_or_member on public.applications
for select to anon, authenticated
using (status = 'active' or public.platform_is_application_member(id));

create policy memberships_select_own_or_admin on public.memberships
for select to authenticated
using (
  user_id = auth.uid()
  or public.platform_is_application_member(application_id, array['owner', 'admin'])
);

create policy consents_select_own on public.consents
for select to authenticated
using (user_id = auth.uid());
create policy consents_insert_own on public.consents
for insert to authenticated
with check (
  user_id = auth.uid()
  and granted_at <= now()
  and revoked_at is null
);
create policy consents_revoke_own on public.consents
for update to authenticated
using (user_id = auth.uid() and revoked_at is null)
with check (user_id = auth.uid() and revoked_at is not null);

create policy audit_events_select_own on public.audit_events
for select to authenticated
using (actor_user_id = auth.uid());

create policy billing_customers_select_own on public.billing_customers
for select to authenticated
using (user_id = auth.uid());

create policy plans_read_public_or_member on public.plans
for select to anon, authenticated
using (
  active
  and exists (
    select 1 from public.applications a
    where a.id = plans.application_id and a.status = 'active'
  )
  or public.platform_is_application_member(application_id, array['owner', 'admin'])
);

create policy subscriptions_select_own on public.subscriptions
for select to authenticated
using (user_id = auth.uid());

create policy entitlements_select_own on public.entitlements
for select to authenticated
using (user_id = auth.uid());

create policy learning_items_read_authorized on public.learning_items
for select to anon, authenticated
using (public.platform_can_access_learning_item(id));

create policy learning_progress_select_own on public.learning_progress
for select to authenticated
using (user_id = auth.uid());
create policy learning_progress_insert_own on public.learning_progress
for insert to authenticated
with check (
  user_id = auth.uid()
  and public.platform_can_access_learning_item(learning_item_id)
);
create policy learning_progress_update_own on public.learning_progress
for update to authenticated
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and public.platform_can_access_learning_item(learning_item_id)
);
create policy learning_progress_delete_own on public.learning_progress
for delete to authenticated
using (user_id = auth.uid());

create policy bookmarks_select_own on public.bookmarks
for select to authenticated
using (user_id = auth.uid());
create policy bookmarks_insert_own on public.bookmarks
for insert to authenticated
with check (
  user_id = auth.uid()
  and public.platform_can_access_learning_item(learning_item_id)
);
create policy bookmarks_update_own on public.bookmarks
for update to authenticated
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and public.platform_can_access_learning_item(learning_item_id)
);
create policy bookmarks_delete_own on public.bookmarks
for delete to authenticated
using (user_id = auth.uid());

create policy notes_select_own on public.notes
for select to authenticated
using (user_id = auth.uid());
create policy notes_insert_own on public.notes
for insert to authenticated
with check (
  user_id = auth.uid()
  and public.platform_can_access_learning_item(learning_item_id)
);
create policy notes_update_own on public.notes
for update to authenticated
using (user_id = auth.uid())
with check (
  user_id = auth.uid()
  and public.platform_can_access_learning_item(learning_item_id)
);
create policy notes_delete_own on public.notes
for delete to authenticated
using (user_id = auth.uid());

create policy content_assets_read_authorized on public.content_assets
for select to anon, authenticated
using (public.platform_can_access_content_asset(id));

-- The service role normally bypasses RLS. Explicit policies document the server-only boundary
-- and keep local role simulations deterministic.
create policy profiles_service_all on public.profiles for all to service_role using (true) with check (true);
create policy applications_service_all on public.applications for all to service_role using (true) with check (true);
create policy memberships_service_all on public.memberships for all to service_role using (true) with check (true);
create policy consents_service_all on public.consents for all to service_role using (true) with check (true);
create policy audit_events_service_all on public.audit_events for all to service_role using (true) with check (true);
create policy billing_customers_service_all on public.billing_customers for all to service_role using (true) with check (true);
create policy plans_service_all on public.plans for all to service_role using (true) with check (true);
create policy subscriptions_service_all on public.subscriptions for all to service_role using (true) with check (true);
create policy entitlements_service_all on public.entitlements for all to service_role using (true) with check (true);
create policy webhook_events_service_all on public.webhook_events for all to service_role using (true) with check (true);
create policy learning_items_service_all on public.learning_items for all to service_role using (true) with check (true);
create policy learning_progress_service_all on public.learning_progress for all to service_role using (true) with check (true);
create policy bookmarks_service_all on public.bookmarks for all to service_role using (true) with check (true);
create policy notes_service_all on public.notes for all to service_role using (true) with check (true);
create policy content_assets_service_all on public.content_assets for all to service_role using (true) with check (true);

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.applications from anon, authenticated;
revoke all on table public.memberships from anon, authenticated;
revoke all on table public.consents from anon, authenticated;
revoke all on table public.audit_events from anon, authenticated;
revoke all on table public.billing_customers from anon, authenticated;
revoke all on table public.plans from anon, authenticated;
revoke all on table public.subscriptions from anon, authenticated;
revoke all on table public.entitlements from anon, authenticated;
revoke all on table public.webhook_events from anon, authenticated;
revoke all on table public.learning_items from anon, authenticated;
revoke all on table public.learning_progress from anon, authenticated;
revoke all on table public.bookmarks from anon, authenticated;
revoke all on table public.notes from anon, authenticated;
revoke all on table public.content_assets from anon, authenticated;

grant usage on schema public to anon, authenticated, service_role;
grant select on public.applications, public.plans, public.learning_items, public.content_assets to anon;
grant select on public.profiles, public.applications, public.memberships, public.consents,
  public.audit_events, public.billing_customers, public.plans, public.subscriptions,
  public.entitlements, public.learning_items, public.learning_progress, public.bookmarks,
  public.notes, public.content_assets to authenticated;
grant update (display_name, avatar_url, locale, timezone) on public.profiles to authenticated;
grant insert (user_id, application_id, consent_type, policy_version, source, metadata)
  on public.consents to authenticated;
grant update (revoked_at) on public.consents to authenticated;
grant insert (user_id, learning_item_id, position_seconds, completion_ratio, completed_at, last_seen_at)
  on public.learning_progress to authenticated;
grant update (position_seconds, completion_ratio, completed_at, last_seen_at)
  on public.learning_progress to authenticated;
grant delete on public.learning_progress to authenticated;
grant insert (user_id, learning_item_id, position_seconds, label)
  on public.bookmarks to authenticated;
grant update (position_seconds, label) on public.bookmarks to authenticated;
grant delete on public.bookmarks to authenticated;
grant insert (user_id, learning_item_id, position_seconds, body)
  on public.notes to authenticated;
grant update (position_seconds, body) on public.notes to authenticated;
grant delete on public.notes to authenticated;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

revoke all on function public.platform_set_updated_at() from public, anon, authenticated;
revoke all on function public.platform_handle_new_user() from public, anon, authenticated;
revoke all on function public.platform_guard_consent_update() from public, anon, authenticated;

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
