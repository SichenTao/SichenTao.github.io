# 内容陈旧与来源结构变化

## 证据模型

`content/freshness.json` 记录每个动态数据集最后一次成功核验时间、记录数和权威来源 URL；`tests/baseline/freshness-policy.json` 保存独立的最大年龄和最低记录数。更新成功时间表示来源已实际读取、schema 已通过且差异已人工或规则确认。

## 告警处置

1. 从失败日志确定数据集、实际年龄、预算和记录数，保存来源响应或截图时间。
2. 访问清单中的权威 HTTPS 来源，判断属于上游暂时不可用、页面结构变化、项目更新或本地解析错误。
3. 对结构变化先保存最小合法来源样本，更新解析器和回归 fixture；对上游不可用保留最后成功数据，并在页面标出“最后核验时间”。
4. 运行内容 schema、差异审查、链接和构建测试。只有真实核验成功后才更新 `lastSuccessfulRefresh`。
5. 发布后确认页面时间、记录数、来源链接与 `content/freshness.json` 一致。

严禁通过扩大 `maximumAgeHours`、写入未来时间或只修改状态文件来消除告警。确需调整服务等级时，应在独立 pull request 中说明来源发布节奏和用户风险，由产品所有者批准 policy 变更。

## 本地诊断

```bash
node scripts/v2/check-freshness.mjs --manifest content/freshness.json
pnpm build
pnpm test:links
```
