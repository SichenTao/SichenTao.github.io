# Stripe webhook 与权益不同步

## 权威关系

Stripe 中的订阅和支付对象是计费事实；本地 `subscriptions` 与 `entitlements` 是通过已验证 webhook 建立的访问投影。Checkout 返回页只表示客户端完成跳转，不能直接授予高级权益。

## 诊断与恢复

1. 使用用户标识、Stripe customer ID 或 event ID 定位记录；避免在普通日志中复制完整个人或支付信息。
2. 验证 webhook 签名结果、HTTP 状态、重试次数和 `webhook_events.provider_event_id` 唯一记录。确认是否存在重复、乱序或处理超时。
3. 从 Stripe API 重新读取当前 subscription，而后通过可重放处理器收敛本地投影。禁止手工伪造 webhook 或仅修改前端状态。
4. 比较 plan、status、period end 和 entitlement；每次纠正写入 `audit_events`，包含依据对象与操作人。
5. 用受影响账号验证登录、内容访问和 Customer Portal，并确认重复重放同一事件不会再次授予权益。

## 降级原则

Stripe 或 webhook 不可用时，公共内容保持可读。付费入口显示处理中或暂时不可用，既有权益依照已批准的宽限策略判断；不得因单次网络失败永久撤销或重复收费。
