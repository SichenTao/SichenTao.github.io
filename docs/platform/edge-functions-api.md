# Edge Function API

## 共同约定

- 浏览器端点只接受配置在 `ALLOWED_WEB_ORIGINS` 的来源。
- Checkout 和 Customer Portal 要求 `Authorization: Bearer <Supabase access token>`。
- JSON 响应包含稳定的错误 `code` 和 `request_id`，不返回密钥、SQL 错误或 Stripe 原始载荷。
- 所有成功和错误响应使用 `Cache-Control: no-store`。

## `create-checkout`

创建 Stripe 托管订阅结账会话。客户端必须为每次购买意图生成唯一 `request_id`；服务端把它和用户 ID 组成 Stripe 幂等键。

```http
POST /functions/v1/create-checkout
Authorization: Bearer <access-token>
Content-Type: application/json
Idempotency-Key: <optional-transport-key>

{
  "application_slug": "youtube-learner",
  "plan_key": "premium_monthly",
  "request_id": "c5fe6498-5471-4ea8-a216-c93e5544f6d8",
  "success_path": "/account/",
  "cancel_path": "/account/"
}
```

```json
{
  "checkout_url": "https://checkout.stripe.com/...",
  "expires_at": 1786790000,
  "request_id": "..."
}
```

前端只能提交站内相对路径。最终域名来自 `PUBLIC_APP_URL`，从而阻止开放重定向。

## `customer-portal`

为当前用户和指定产品打开 Stripe Customer Portal。

```json
{
  "application_slug": "youtube-learner",
  "return_path": "/account/"
}
```

成功响应返回 `portal_url`。没有账单客户的免费用户收到 `billing_customer_not_found`。

## `stripe-webhook`

Stripe 直接调用该端点。它读取原始请求正文，并使用 `Stripe-Signature` 和 `STRIPE_WEBHOOK_SECRET` 完成签名验证。正文解析发生在签名验证成功之后。

支持同步的事件：

- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `customer.subscription.paused`
- `customer.subscription.resumed`
- `checkout.session.completed`
- `invoice.paid`
- `invoice.payment_failed`

未使用的合法 Stripe 事件进入幂等账本并标记完成。相同 Event ID 的完整重复投递返回成功；正文哈希不一致的重复 ID 返回 `webhook_id_conflict`；仍在处理中的并发投递返回非 2xx，要求 Stripe 稍后重试。

## `signed-content-url`

为当前访问者已经获准读取的 `content_assets` 记录生成短时 Storage 签名 URL。公开资源允许匿名调用，受限资源需要有效 Supabase 访问令牌。

```json
{
  "asset_id": "7b34a45d-9782-4fbb-9adc-1f75c03df57f"
}
```

```json
{
  "signed_url": "https://.../storage/v1/object/sign/...",
  "expires_in": 300,
  "mime_type": "application/epub+zip",
  "byte_size": 1234567,
  "request_id": "..."
}
```

无权限与不存在统一返回 `asset_not_found`，避免泄露私有资源是否存在。

## 稳定错误码

| 状态 | `code`                                                         | 含义                       |
| ---: | -------------------------------------------------------------- | -------------------------- |
|  400 | `invalid_*`                                                    | 请求字段或 Stripe 签名无效 |
|  401 | `authentication_required` / `invalid_access_token`             | 未登录或令牌失效           |
|  403 | `origin_not_allowed`                                           | 浏览器来源未列入白名单     |
|  404 | `application_not_found` / `plan_not_found` / `asset_not_found` | 资源不可用或无权限         |
|  409 | `plan_not_checkout_ready` / `webhook_id_conflict`              | 生产配置未完成或事件冲突   |
|  503 | `service_not_configured`                                       | 服务端缺少必要环境变量     |
