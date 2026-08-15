# 可复用账号、计费与学习平台内核

## 结论

`supabase/` 是一个可迁移到独立 Supabase 项目的平台内核，覆盖账号资料、产品成员关系、隐私同意、计费、权限、学习进度与私有内容交付。各网站通过 `applications` 注册为独立产品，再复用同一组用户与服务端能力。

Quant Platform 不接入这套数据库。它处理金融令牌和高敏感度数据，应保留独立部署、独立密钥、独立数据库和独立审计边界。

## 当前完成度

1. `migrations/202608150001_platform_core.sql`：15 张核心表、完整约束、索引、用户资料触发器、私有存储桶。
2. `migrations/202608150002_platform_security.sql`：强制行级安全（Row Level Security, RLS）、最小权限授权、匿名/用户自有/服务端策略。
3. `migrations/202608150003_platform_billing_rpc.sql`：Stripe Webhook 幂等账本、乱序事件保护、订阅与权限原子同步。
4. `functions/`：创建 Checkout、打开 Customer Portal、接收 Stripe Webhook、生成私有内容短时签名 URL。
5. `tests/`：数据库结构/RLS 的 pgTAP 测试和无需数据库的静态契约检查。

## 本地启动

前提：安装 Docker、Supabase CLI、Deno 2 和项目指定的 pnpm/Node.js。

```bash
cp supabase/.env.example supabase/.env.local
supabase start
supabase db reset
supabase functions serve --env-file supabase/.env.local
supabase test db
deno check --config supabase/functions/deno.json \
  supabase/functions/create-checkout/index.ts \
  supabase/functions/customer-portal/index.ts \
  supabase/functions/stripe-webhook/index.ts \
  supabase/functions/signed-content-url/index.ts
node supabase/tests/static_contract.mjs
```

`seed.sql` 中的付费方案保持停用。`1200 USD cents` 只是供本地测试的数据占位，不代表已经批准的产品价格。

## 复制到未来网站

1. 创建一个新的 Supabase 项目，复制 `supabase/migrations`、`supabase/functions` 与 `supabase/config.toml`。
2. 在 `applications` 新增产品记录；每个产品使用稳定且唯一的 `slug`。
3. 在 Stripe 建立 Product 和 Price，再把 Price ID 写入对应 `plans.provider_price_id`，完成价格复核后设置 `active = true`。
4. 设置服务端环境变量并部署四个 Edge Functions；前端只保存 Supabase 公钥，不接触 Service Role 或 Stripe Secret。
5. 运行数据库、Deno、签名 Webhook 和端到端沙盒购买测试，通过生产门禁后再切换 Live Mode。

## 产品接入原则

- `applications` 划分产品边界，`memberships` 划分用户与产品的关系。
- `plans` 描述商业方案，`entitlements` 表达用户最终获得的功能权限；前端不通过“是否付款”自行推断权限。
- `learning_items` 表达课程、视频、文章和资源，`content_assets` 只保存私有存储对象的元数据。
- 受限文件通过 `signed-content-url` 返回 60 至 900 秒有效的链接；浏览器没有 Service Role 密钥。
- Stripe 是账单事实来源，数据库是产品权限读取来源；Webhook 将两者可靠同步。

详细说明：

- [数据模型与 RLS](./data-model-and-rls.md)
- [Edge Function API](./edge-functions-api.md)
- [部署与生产门禁](./deployment-runbook.md)
- [安全模型](./security-model.md)

## 官方依据

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase 数据安全与 RLS](https://supabase.com/docs/guides/database/secure-data)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Stripe Checkout 订阅](https://docs.stripe.com/payments/checkout/build-subscriptions)
- [Stripe Customer Portal](https://docs.stripe.com/customer-management/integrate-customer-portal)
- [Stripe Webhook 签名](https://docs.stripe.com/webhooks/signature)
