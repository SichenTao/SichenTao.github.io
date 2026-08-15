# 数据模型与 RLS

## 模型边界

平台由四个相互连接的领域组成。身份领域确认“用户是谁”；产品领域确认“用户属于哪个产品”；计费领域确认“用户获得哪些权限”；学习领域确认“用户可以读取什么内容并保存哪些个人状态”。

### 身份与产品

| 表             | 作用                             | 浏览器可写范围                           |
| -------------- | -------------------------------- | ---------------------------------------- |
| `profiles`     | `auth.users` 的产品资料扩展      | 用户只更新自己的显示名、头像、语言与时区 |
| `applications` | 共享内核中的产品注册表           | 无                                       |
| `memberships`  | 用户与产品的角色、状态和有效期   | 无，服务端管理                           |
| `consents`     | 条款、隐私和营销同意的版本化历史 | 用户新增自己的记录，并且只能撤销一次     |
| `audit_events` | 关键服务端动作的审计轨迹         | 无，用户只读自己的事件                   |

### 计费与权限

| 表                  | 作用                                    | 关键可靠性约束                                                  |
| ------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `billing_customers` | 平台用户与 Stripe Customer 的一对一映射 | 每个产品、用户、提供方唯一                                      |
| `plans`             | 价格、周期、Stripe Price 与权限列表     | 付费方案必须有金额和周期；激活前配置 Price ID                   |
| `subscriptions`     | Stripe Subscription 的本地投影          | Provider Subscription ID 唯一；保存最新事件时间                 |
| `entitlements`      | 可直接判断的功能权限                    | 来源和来源引用唯一；支持到期与撤销                              |
| `webhook_events`    | Webhook 幂等事件账本                    | Event ID 主键、原文 SHA-256、状态、重试次数；不保存完整支付载荷 |

### 学习平台

| 表                  | 作用                                 | 授权方式                                  |
| ------------------- | ------------------------------------ | ----------------------------------------- |
| `learning_items`    | 课程、课时、视频、文章与资源         | `public`、`members`、`premium`、`private` |
| `learning_progress` | 播放位置、完成率、最近学习时间       | 用户自有                                  |
| `bookmarks`         | 资源或时间点书签                     | 用户自有                                  |
| `notes`             | 学习笔记                             | 用户自有                                  |
| `content_assets`    | 存储桶、对象路径、文件类型与校验信息 | 继承内容权限或单独指定权限                |

## 权限判断链

```text
浏览器身份
  -> applications / memberships
  -> plans / subscriptions
  -> entitlements
  -> learning_items
  -> content_assets
  -> signed-content-url
  -> 私有 Storage 对象
```

`platform_can_access_learning_item` 和 `platform_can_access_content_asset` 是数据库侧的统一判断函数。公开内容允许匿名读取；成员内容要求有效 `memberships`；付费内容要求未撤销且未过期的 `entitlements`；私有内容只允许产品 Owner 或 Admin。

## RLS 矩阵

| 数据类别             | 匿名用户 | 已登录用户                             | Service Role |
| -------------------- | -------- | -------------------------------------- | ------------ |
| 激活的产品与公开方案 | 读取     | 读取                                   | 全部         |
| 用户资料             | 无       | 只读写自己的允许列                     | 全部         |
| 成员关系             | 无       | 读取自己；Owner/Admin 读取所属产品成员 | 全部         |
| 同意记录             | 无       | 新增、读取和撤销自己的记录             | 全部         |
| 计费客户/订阅/权限   | 无       | 只读自己的记录                         | 全部         |
| Webhook 账本         | 无       | 无                                     | 全部         |
| 公开学习内容         | 读取     | 读取                                   | 全部         |
| 成员/付费/私有内容   | 无       | 按成员或权限读取                       | 全部         |
| 进度/书签/笔记       | 无       | 读写自己的记录                         | 全部         |

所有 15 张业务表同时启用 `ENABLE ROW LEVEL SECURITY` 与 `FORCE ROW LEVEL SECURITY`。表级授权和 RLS 同时收紧；缺少策略时访问直接失败，形成默认拒绝。

## 计费同步事务

`platform_apply_stripe_subscription_event` 在一个数据库事务内完成以下动作：

1. 锁定已经签名验证和认领的 Webhook 事件。
2. 校验 Stripe Price 是否属于目标产品。
3. 更新 Customer、Membership 与 Subscription 投影。
4. 撤销旧订阅权限，再根据新方案恢复当前权限。
5. 写入审计事件并把 Webhook 标记为完成。

当新收到的 Stripe 事件时间早于数据库已应用事件时，函数记录 `billing.subscription_event_ignored_stale`，保留较新的订阅状态。
