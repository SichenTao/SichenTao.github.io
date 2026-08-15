# 密钥、令牌与个人数据泄露响应

## SEV-1 判断

以下任一事实按 `SEV-1` 处理：生产 secret 或 service-role key 可读；用户会话、支付或个人数据外泄；Quant 交易能力从公共页面可达；浏览器令牌被发送到未授权来源。

## 处置顺序

1. **隔离**：停止相关部署或函数，撤下公开 artifact；不要先删除日志。若公开站本身仍安全，可回滚到最后已验证 artifact。
2. **撤销**：在对应提供方轮换或吊销密钥、会话和 webhook secret。轮换完成前将相关入口保持关闭。
3. **保存证据**：记录首次发现、可能暴露区间、Git 提交、访问日志、对象范围和操作人。证据副本进入受限存储，禁止贴入公共 issue。
4. **界定影响**：检查 Git 历史、Actions 日志、Pages artifact、Supabase 审计、Stripe 日志和异常来源请求。仅凭当前文件已删除不能推断历史副本已消失。
5. **恢复与通知**：修复根因并运行 secret、Quant、dist 和 HTML 安全门禁；按适用合同和法律确定用户与机构通知。恢复后监控旧凭据使用和异常访问。

## 验证命令

```bash
node scripts/v2/check-secrets.mjs --root . --tracked
pnpm build
node scripts/v2/check-security.mjs --root dist --repo-root .
```

若 secret 曾进入 Git，轮换是第一恢复条件。历史清理属于后续降低可发现性的措施，需要单独审核和协调所有克隆者，不能替代轮换。
