# 部署与生产门禁

## 1. 建立独立环境

至少建立 `development`、`staging`、`production` 三个 Supabase 项目。Stripe Test Mode 连接前两个项目，Live Mode 只连接生产项目。每个环境使用独立 Webhook Secret 与 Service Role Key。

```bash
supabase link --project-ref <project-ref>
supabase db push
supabase functions deploy create-checkout --no-verify-jwt
supabase functions deploy customer-portal --no-verify-jwt
supabase functions deploy signed-content-url --no-verify-jwt
supabase functions deploy stripe-webhook --no-verify-jwt
```

四个函数关闭网关 JWT 自动验证，原因各自明确：浏览器端点在函数内调用 Supabase Auth 服务器验证令牌；签名 URL 同时支持匿名和登录用户；Webhook 使用 Stripe 原文签名。任何端点都没有把客户端声明当作可信身份。

## 2. 设置服务器密钥

```bash
supabase secrets set \
  STRIPE_SECRET_KEY=<secret> \
  STRIPE_WEBHOOK_SECRET=<secret> \
  PUBLIC_APP_URL=https://example.com \
  ALLOWED_WEB_ORIGINS=https://example.com \
  SIGNED_URL_TTL_SECONDS=300
```

`SUPABASE_URL` 和 `SUPABASE_SERVICE_ROLE_KEY` 由托管运行时提供。用户范围客户端优先使用 `SUPABASE_PUBLISHABLE_KEY`，旧项目可使用 `SUPABASE_ANON_KEY`。CI 日志、浏览器构建变量和仓库文件均不得包含 Stripe Secret、Webhook Secret 或 Service Role Key。

## 3. 配置产品与价格

1. 在 Stripe 创建 Product 与 recurring Price。
2. 在 `plans` 中设置 `currency`、`unit_amount`、`billing_interval`、`provider_price_id` 和 `entitlement_keys`。
3. 由产品负责人核对展示价格、扣费周期、试用、退款条款和税务设置。
4. 完成核对后将方案设为 `active = true`。
5. 用 Stripe Test Clock 或测试卡验证创建、续费、失败、暂停、取消和恢复。

生产启用前必须替换或重新审定 seed 中的金额占位。数据库金额单位为货币最小单位，例如美元的 cent。

## 4. 配置 Webhook

Endpoint：

```text
https://<project-ref>.supabase.co/functions/v1/stripe-webhook
```

订阅事件至少包含 `customer.subscription.*`、`checkout.session.completed`、`invoice.paid` 与 `invoice.payment_failed`。保存 Stripe 返回的 Endpoint Secret 到对应环境，随后用 Stripe CLI 完成签名转发测试。

## 5. 运行门禁

```bash
supabase db reset
supabase test db
deno check --config supabase/functions/deno.json \
  supabase/functions/create-checkout/index.ts \
  supabase/functions/customer-portal/index.ts \
  supabase/functions/stripe-webhook/index.ts \
  supabase/functions/signed-content-url/index.ts
node supabase/tests/static_contract.mjs
```

生产门禁还要求以下人工与沙盒验证：

1. 新用户注册、登录、登出、令牌过期和账号恢复。
2. 同一个 `request_id` 重试 Checkout 时只产生一个购买意图。
3. Webhook 重复、失败重试和乱序投递后，订阅与权限保持正确。
4. 付费内容在购买前拒绝、购买后允许、取消或到期后再次拒绝。
5. Customer Portal 的取消、更新支付方式和账单历史返回路径正确。

## 6. 回滚与恢复

- 数据库迁移只采用向前修复；部署前对生产数据库执行 Supabase 备份与恢复演练。
- Edge Function 可以独立回滚到上一已验证版本，数据库 schema 保持向后兼容一个发布周期。
- Webhook 失败事件保留在 `webhook_events`；修复原因后重新投递同一个 Stripe Event，账本会安全认领失败事件。
- 更换 Webhook Secret 时先建立新 Endpoint、验证流量，再停用旧 Endpoint，缩短事件丢失窗口。

## CI 接入

CI 使用官方 `denoland/setup-deno` 安装 Deno，并在根 `typecheck` 之后执行上述 `deno check`。数据库测试需要 Docker 与 Supabase CLI，可放入独立 `platform-test` job，避免普通内容变更被本地数据库启动时间拖慢。
