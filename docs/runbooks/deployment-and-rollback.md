# 发布失败与回滚

## 触发条件

- `Deploy GitHub Pages` 构建、部署或部署后 smoke 失败。
- 核心页面返回非 200、内部链接破损、关键交互不可用。
- 公开产物出现 Quant、密钥、私有内容或源工程文件。
- 新版本造成可确认的无障碍或内容准确性退化。

## 立即处置

1. 在 GitHub Actions 取消仍在排队的同类发布；保留失败日志和运行编号。
2. 若问题涉及凭据或私有数据，先执行安全事件手册，再处理站点版本。
3. 从最后一次成功的 `Deploy GitHub Pages` 运行记录取得 `run_id` 与完整 `source_sha`。确认该运行的 smoke 成功，下载的 artifact 名称应为 `pages-dist-<source_sha>`。
4. 手动运行 `Roll Back GitHub Pages`，填写两个不可变标识，并输入确认词 `ROLLBACK`。`github-pages` environment 应配置所有者审批。
5. 等待回滚工作流重新执行 URL、链接和安全检查，完成部署后 smoke；随后验证首页、Academic、Frontier、Builders、Learner 和 KAKENHI。

回滚 artifact 保留 90 天。超过保留期时，从已签名的发布 tag 建立修复分支，使用锁文件重新构建并通过完整门禁；不得从本地未记录目录直接上传。

## 验证与关闭

记录恢复时间、回滚来源提交、工作流 URL、受影响的请求时间段和根因。修复 pull request 必须增加能复现本次故障的测试。关闭事件前运行：

```bash
pnpm lint
pnpm typecheck
pnpm typecheck:edge
pnpm test:design-system
pnpm test:unit
pnpm test:quality-tools
pnpm build
pnpm test:links
pnpm test:freshness
pnpm test:security
pnpm test:a11y
```
