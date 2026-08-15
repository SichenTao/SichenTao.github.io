# v2.0 运行手册索引

运行手册把异常处置固定为可重复流程。每次事件都需要记录开始时间、影响范围、证据、操作人、变更提交或工作流运行编号，以及恢复验证结果。

| 场景                        | 手册                                                         | 首要目标                         |
| --------------------------- | ------------------------------------------------------------ | -------------------------------- |
| 发布失败、线上回归          | [deployment-and-rollback.md](deployment-and-rollback.md)     | 停止扩大影响并恢复最后已验证产物 |
| 内容过期、来源结构变化      | [content-freshness.md](content-freshness.md)                 | 恢复可信数据或明确降级展示       |
| 密钥、令牌、个人数据暴露    | [security-incident.md](security-incident.md)                 | 撤销访问能力并保存调查证据       |
| Stripe webhook 或权益不同步 | [billing-entitlement.md](billing-entitlement.md)             | 以支付方事实恢复权益投影         |
| 账号访问纠错、退款          | [account-access-and-refund.md](account-access-and-refund.md) | 核验用户、保存授权依据并完成闭环 |
| 门禁失败或需要扩展          | [quality-gates.md](quality-gates.md)                         | 识别真实失败并保持检查器有效     |

严重度定义：`SEV-1` 表示凭据、支付、个人数据或交易能力正在暴露；`SEV-2` 表示核心用户流程大范围不可用；`SEV-3` 表示有替代路径的局部故障。`SEV-1` 立即停止发布并优先隔离，`SEV-2` 优先回滚，`SEV-3` 可在保持监控的条件下修复前滚。
