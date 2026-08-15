-- Transactional helpers used only by trusted Edge Functions.

create or replace function public.platform_claim_webhook_event(
  p_provider text,
  p_event_id text,
  p_event_type text,
  p_payload_sha256 text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_event public.webhook_events%rowtype;
begin
  if p_provider <> 'stripe'
    or char_length(p_event_id) not between 3 and 255
    or char_length(p_event_type) not between 1 and 160
    or p_payload_sha256 !~ '^[0-9a-f]{64}$'
  then
    raise exception 'Invalid webhook event claim.';
  end if;

  insert into public.webhook_events (
    provider,
    provider_event_id,
    event_type,
    payload_sha256,
    status,
    attempts
  )
  values (p_provider, p_event_id, p_event_type, p_payload_sha256, 'processing', 1)
  on conflict (provider, provider_event_id) do nothing;

  if found then
    return 'claimed';
  end if;

  select * into v_event
  from public.webhook_events
  where provider = p_provider and provider_event_id = p_event_id
  for update;

  if v_event.payload_sha256 <> p_payload_sha256 or v_event.event_type <> p_event_type then
    return 'hash_mismatch';
  end if;

  if v_event.status = 'processed' then
    return 'processed';
  end if;

  if v_event.status = 'processing' and v_event.last_attempt_at > now() - interval '5 minutes' then
    return 'processing';
  end if;

  update public.webhook_events
  set status = 'processing',
      attempts = attempts + 1,
      last_attempt_at = now(),
      last_error = null
  where provider = p_provider and provider_event_id = p_event_id;

  return 'claimed';
end;
$$;

create or replace function public.platform_fail_webhook_event(
  p_provider text,
  p_event_id text,
  p_error text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.webhook_events
  set status = 'failed',
      last_error = left(coalesce(p_error, 'unknown_error'), 2000),
      last_attempt_at = now()
  where provider = p_provider
    and provider_event_id = p_event_id
    and status <> 'processed';
end;
$$;

create or replace function public.platform_complete_webhook_event(
  p_provider text,
  p_event_id text,
  p_action text default 'billing.webhook_accepted'
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_event public.webhook_events%rowtype;
begin
  select * into v_event
  from public.webhook_events
  where provider = p_provider and provider_event_id = p_event_id
  for update;

  if not found then
    raise exception 'Webhook event has not been claimed.';
  end if;

  if v_event.status = 'processed' then
    return;
  end if;

  if v_event.status <> 'processing' then
    raise exception 'Webhook event is not in processing state.';
  end if;

  update public.webhook_events
  set status = 'processed',
      processed_at = now(),
      last_attempt_at = now(),
      last_error = null
  where provider = p_provider and provider_event_id = p_event_id;

  insert into public.audit_events (
    actor_type,
    action,
    subject_type,
    subject_id,
    details
  )
  values (
    'webhook',
    p_action,
    'webhook_event',
    p_event_id,
    jsonb_build_object('provider', p_provider, 'event_type', v_event.event_type)
  );
end;
$$;

create or replace function public.platform_ensure_membership(
  p_application_id uuid,
  p_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.memberships (application_id, user_id, role, status)
  values (p_application_id, p_user_id, 'member', 'active')
  on conflict (application_id, user_id) do update
  set status = 'active',
      ends_at = null,
      updated_at = now();
end;
$$;

create or replace function public.platform_apply_stripe_subscription_event(
  p_event_id text,
  p_user_id uuid,
  p_application_id uuid,
  p_stripe_customer_id text,
  p_stripe_subscription_id text,
  p_stripe_price_id text,
  p_status text,
  p_event_created_at timestamptz,
  p_current_period_start timestamptz,
  p_current_period_end timestamptz,
  p_cancel_at_period_end boolean,
  p_trial_end timestamptz default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_event public.webhook_events%rowtype;
  v_plan public.plans%rowtype;
  v_customer_id uuid;
  v_subscription_id uuid;
begin
  if p_status not in ('trialing', 'active', 'past_due', 'paused', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid') then
    raise exception 'Unsupported subscription status.';
  end if;

  select * into v_event
  from public.webhook_events
  where provider = 'stripe' and provider_event_id = p_event_id
  for update;

  if not found then
    raise exception 'Webhook event has not been claimed.';
  end if;

  if v_event.status = 'processed' then
    return;
  end if;

  if v_event.status <> 'processing' then
    raise exception 'Webhook event is not in processing state.';
  end if;

  select * into v_plan
  from public.plans
  where provider_price_id = p_stripe_price_id
    and application_id = p_application_id;

  if not found then
    raise exception 'Stripe price is not mapped to this application.';
  end if;

  if exists (
    select 1
    from public.subscriptions s
    where s.provider_subscription_id = p_stripe_subscription_id
      and (s.user_id <> p_user_id or s.application_id <> p_application_id)
  ) then
    raise exception 'Stripe subscription identity conflicts with its existing owner.';
  end if;

  insert into public.billing_customers (
    application_id,
    user_id,
    provider,
    provider_customer_id
  )
  values (p_application_id, p_user_id, 'stripe', p_stripe_customer_id)
  on conflict (application_id, user_id, provider) do update
  set provider_customer_id = excluded.provider_customer_id,
      updated_at = now()
  returning id into v_customer_id;

  insert into public.memberships (application_id, user_id, role, status)
  values (p_application_id, p_user_id, 'member', 'active')
  on conflict (application_id, user_id) do update
  set status = 'active',
      starts_at = least(public.memberships.starts_at, now()),
      ends_at = null,
      updated_at = now();

  insert into public.subscriptions (
    application_id,
    user_id,
    billing_customer_id,
    plan_id,
    provider,
    provider_subscription_id,
    status,
    provider_event_created_at,
    current_period_start,
    current_period_end,
    cancel_at_period_end,
    trial_end,
    canceled_at
  )
  values (
    p_application_id,
    p_user_id,
    v_customer_id,
    v_plan.id,
    'stripe',
    p_stripe_subscription_id,
    p_status,
    p_event_created_at,
    p_current_period_start,
    p_current_period_end,
    coalesce(p_cancel_at_period_end, false),
    p_trial_end,
    case when p_status = 'canceled' then now() else null end
  )
  on conflict (provider_subscription_id) do update
  set application_id = excluded.application_id,
      user_id = excluded.user_id,
      billing_customer_id = excluded.billing_customer_id,
      plan_id = excluded.plan_id,
      status = excluded.status,
      provider_event_created_at = excluded.provider_event_created_at,
      current_period_start = excluded.current_period_start,
      current_period_end = excluded.current_period_end,
      cancel_at_period_end = excluded.cancel_at_period_end,
      trial_end = excluded.trial_end,
      canceled_at = case
        when excluded.status = 'canceled' then coalesce(public.subscriptions.canceled_at, now())
        else null
      end,
      updated_at = now()
  where excluded.provider_event_created_at >= public.subscriptions.provider_event_created_at
  returning id into v_subscription_id;

  if v_subscription_id is null then
    insert into public.audit_events (
      application_id,
      actor_user_id,
      actor_type,
      action,
      subject_type,
      subject_id,
      details
    )
    values (
      p_application_id,
      p_user_id,
      'webhook',
      'billing.subscription_event_ignored_stale',
      'subscription',
      p_stripe_subscription_id,
      jsonb_build_object('event_id', p_event_id, 'status', p_status)
    );

    update public.webhook_events
    set status = 'processed',
        processed_at = now(),
        last_attempt_at = now(),
        last_error = null
    where provider = 'stripe' and provider_event_id = p_event_id;
    return;
  end if;

  update public.entitlements
  set revoked_at = now(), updated_at = now()
  where application_id = p_application_id
    and user_id = p_user_id
    and source = 'subscription'
    and source_ref = p_stripe_subscription_id
    and revoked_at is null;

  if p_status in ('trialing', 'active') then
    insert into public.entitlements (
      application_id,
      user_id,
      entitlement_key,
      source,
      source_ref,
      starts_at,
      expires_at,
      revoked_at,
      metadata
    )
    select
      p_application_id,
      p_user_id,
      entitlement_key,
      'subscription',
      p_stripe_subscription_id,
      now(),
      p_current_period_end,
      null,
      jsonb_build_object('plan_key', v_plan.plan_key)
    from unnest(v_plan.entitlement_keys) as entitlement_key
    on conflict (application_id, user_id, entitlement_key, source, source_ref) do update
    set expires_at = excluded.expires_at,
        revoked_at = null,
        metadata = excluded.metadata,
        updated_at = now();
  end if;

  insert into public.audit_events (
    application_id,
    actor_user_id,
    actor_type,
    action,
    subject_type,
    subject_id,
    details
  )
  values (
    p_application_id,
    p_user_id,
    'webhook',
    'billing.subscription_synced',
    'subscription',
    p_stripe_subscription_id,
    jsonb_build_object(
      'event_id', p_event_id,
      'plan_key', v_plan.plan_key,
      'status', p_status,
      'cancel_at_period_end', coalesce(p_cancel_at_period_end, false)
    )
  );

  update public.webhook_events
  set status = 'processed',
      processed_at = now(),
      last_attempt_at = now(),
      last_error = null
  where provider = 'stripe' and provider_event_id = p_event_id;
end;
$$;

revoke all on function public.platform_claim_webhook_event(text, text, text, text) from public, anon, authenticated;
revoke all on function public.platform_fail_webhook_event(text, text, text) from public, anon, authenticated;
revoke all on function public.platform_complete_webhook_event(text, text, text) from public, anon, authenticated;
revoke all on function public.platform_ensure_membership(uuid, uuid) from public, anon, authenticated;
revoke all on function public.platform_apply_stripe_subscription_event(
  text, uuid, uuid, text, text, text, text, timestamptz, timestamptz, timestamptz, boolean, timestamptz
) from public, anon, authenticated;

grant execute on function public.platform_claim_webhook_event(text, text, text, text) to service_role;
grant execute on function public.platform_fail_webhook_event(text, text, text) to service_role;
grant execute on function public.platform_complete_webhook_event(text, text, text) to service_role;
grant execute on function public.platform_ensure_membership(uuid, uuid) to service_role;
grant execute on function public.platform_apply_stripe_subscription_event(
  text, uuid, uuid, text, text, text, text, timestamptz, timestamptz, timestamptz, boolean, timestamptz
) to service_role;
