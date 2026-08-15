# 质量门禁契约

质量门禁使用生成后的 `dist/` 作为发布事实。源码存在不代表文件会进入 GitHub Pages；构建成功也不能证明发布物没有私有文件、断链或安全退化。

| package script       | 输入                             | 阻断条件                                            |
| -------------------- | -------------------------------- | --------------------------------------------------- |
| `lint`               | 全部源码与配置                   | ESLint 或 Prettier 不通过                           |
| `typecheck`          | Astro、TypeScript 与脚本         | 类型或 Astro 模板检查失败                           |
| `typecheck:edge`     | Supabase Edge Functions          | Deno 2.9.5 解析、类型或远程依赖检查失败             |
| `test:design-system` | token、组件契约与图集资产        | 设计系统导出或契约不一致                            |
| `test:unit`          | 组件、schema、工具与函数         | 单元或契约断言失败                                  |
| `test:quality-tools` | 门禁通过和故障 fixtures          | 检查器无法识别已知坏状态                            |
| `build`              | 锁定依赖与公开源                 | 无法生成可重现 `dist/`                              |
| `test:links`         | `dist/`                          | 本地资源、页面或 fragment 缺失                      |
| `test:freshness`     | policy 与真实 refresh status     | 数据集缺失、过期、来源无效或记录数异常              |
| `test:a11y`          | `dist/` 代表路由、桌面与移动视口 | axe 的 WCAG 2.2 AA 相关规则或页面脚本失败           |
| `test:security`      | Git 跟踪源码与 `dist/`           | secret、Quant、源文件、URL 合同或 HTML 安全规则失败 |
| `test:smoke`         | 已部署 HTTPS 地址                | 代表页面、robots、sitemap 或 Quant 404 合同失败     |

## 检查器自证

`quality-tools.selftest.mjs` 为每个基础检查器建立通过 fixture 和故障 fixture，确认检查器能够拒绝坏状态。修改 `scripts/v2/` 后执行：

```bash
node --test tests/baseline/quality-tools.selftest.mjs
```

该自测覆盖 URL 清单、断链、secret、Quant 边界、数据时效、HTML 安全和 dist-only 发布边界。自测通过只证明检查器按契约工作；项目能否发布仍由实际 `dist/` 门禁决定。

## 内容时效状态格式

`content/freshness.json` 的状态由完成实际来源核验的刷新流程写入：

```json
{
  "version": 1,
  "datasets": [
    {
      "id": "academic-frontier",
      "label": "Academic Frontier",
      "lastSuccessfulRefresh": "2026-08-15T08:00:00+08:00",
      "recordCount": 15,
      "sourceUrls": ["https://example.org/authoritative-source"]
    }
  ]
}
```

最大允许年龄与最低记录数只保存在 `tests/baseline/freshness-policy.json`，避免数据刷新任务通过自行扩大预算掩盖陈旧状态。

## 合理例外

门禁例外需要范围明确、到期时间、风险说明和所有者批准。不得使用空 catch、`|| true`、未来时间、无限预算或全局 ignore 消除失败。自动化无障碍扫描也不构成完整 WCAG 声明；发布验收仍需要键盘、焦点、缩放、屏幕阅读器和认知可用性人工检查。
