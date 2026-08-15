# 安全模型

## 保护目标

平台保护五类资产：用户身份、同意历史、账单映射、产品权限、私有学习文件。支付卡数据停留在 Stripe 托管页面，平台不接收或保存卡号。

## 主要威胁与控制

| 威胁                       | 控制                                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------- |
| 浏览器伪造用户 ID          | Checkout/Portal 调用 Supabase Auth 服务器验证 Bearer Token，忽略正文中的身份声明                   |
| 用户为自己授予付费权限     | `memberships`、`subscriptions`、`entitlements` 没有浏览器写权限；只有 Service Role 和事务 RPC 可写 |
| Webhook 伪造               | 使用原始正文、`Stripe-Signature` 和独立 Webhook Secret 验证                                        |
| Webhook 重复或并发         | `webhook_events` 以 Provider + Event ID 为主键，并校验正文 SHA-256                                 |
| Stripe 事件乱序            | `subscriptions.provider_event_created_at` 阻止旧事件覆盖新状态                                     |
| 私有文件路径泄露后直接下载 | Storage bucket 始终私有；短时 URL 只有在 RLS 授权后由 Service Role 签发                            |
| 开放重定向                 | Checkout 和 Portal 只接受站内相对路径，域名固定来自 `PUBLIC_APP_URL`                               |
| 跨站调用                   | 浏览器请求来源必须存在于 `ALLOWED_WEB_ORIGINS`                                                     |
| 密钥泄露                   | 密钥只存在于 Supabase Secrets；错误响应不回传服务端异常或配置值                                    |
| 支付载荷扩大隐私面         | 幂等账本只保存事件类型、哈希和处理状态，不保存完整 Stripe Payload                                  |

## Default-deny

数据库同时使用表级 `GRANT` 与强制行级安全（RLS）。匿名和登录角色只获得实现用户流程所需的最小表权限；没有策略的操作直接失败。Service Role 用于 Edge Functions，绝不进入浏览器、静态页面或公开构建产物。

## 内容文件

`content_assets.object_path` 只标识 Storage 对象，不构成授权。授权由数据库函数根据以下条件计算：

1. 资源记录为 `active`，父级内容已经发布。
2. 公开资源直接允许；成员资源需要有效 Membership。
3. 付费资源需要有效且未过期的 Entitlement。
4. 私有资源需要 Owner 或 Admin 角色。

签名 URL 默认 300 秒，配置范围限制为 60 至 900 秒。高价值 EPUB 或转录文件应设置合理下载频率限制和异常访问告警；该速率限制属于部署网关层，当前仓库未声明已经实现。

## 已知边界

- 当前代码提供平台内核和服务器端契约，尚未连接真实 Supabase/Stripe 项目，因此没有生产支付证据。
- 税务、退款、发票文本、未成年人政策、版权授权和数据保留期限需要产品负责人及适用法域确认。
- 账单客户和订阅使用限制删除外键，防止删除 Auth 用户或产品时意外抹除账单投影；正式账号删除流程需要先完成法定留存判断和受控清理。
- Edge Function 的单实例日志不构成长久审计存储；生产环境应把错误和安全事件发送到集中式监控。
- Quant Platform 必须继续使用独立基础设施，禁止复用本内核的 Service Role、Storage bucket 或用户令牌。
